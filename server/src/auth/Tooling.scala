package monarchy.auth

import java.util.{Base64, UUID}
import java.security.{KeyFactory, KeyPair, KeyPairGenerator, PrivateKey, PublicKey}
import java.security.spec.{PKCS8EncodedKeySpec, X509EncodedKeySpec}
import java.security.interfaces.{RSAPrivateKey, RSAPublicKey}
import java.time.Instant
import io.jsonwebtoken.impl.crypto.MacProvider
import io.jsonwebtoken.{Jwts, SignatureAlgorithm}
import scala.concurrent.duration._
import scala.util.Try

object Tooling {
  private val Issuer = "monarchy"
  private val Audience = "monarchy-api"
  private val PrivateKeyEnv = "MONARCHY_JWT_PRIVATE_KEY"
  private val PublicKeyEnv = "MONARCHY_JWT_PUBLIC_KEY"
  private val TokenTtlEnv = "MONARCHY_JWT_TTL_SECONDS"
  private val DefaultTokenTtl = 30.days

  private val tokenKeys = validateKeyPair(loadKeyPair)

  def generateSecret: String =
    Base64.getEncoder.encodeToString(MacProvider.generateKey.getEncoded)

  /**
    * The database user secret is retained for compatibility with the existing
    * schema, but JWTs are signed by the deployment key instead of per-user
    * HMAC secrets.
    */
  def issueToken(id: UUID): String = {
    val now = Instant.now
    Jwts.builder
      .setSubject(id.toString)
      .setIssuer(Issuer)
      .setAudience(Audience)
      .setIssuedAt(java.util.Date.from(now))
      .setExpiration(java.util.Date.from(now.plusSeconds(tokenTtl.toSeconds)))
      .signWith(tokenKeys.getPrivate, SignatureAlgorithm.RS256)
      .compact
  }

  def parseSubject(raw: String): Try[UUID] = Try {
    val claims = Jwts.parserBuilder
      .setSigningKey(tokenKeys.getPublic)
      .requireIssuer(Issuer)
      .requireAudience(Audience)
      .build
      .parseClaimsJws(raw)
      .getBody
    UUID.fromString(claims.getSubject)
  }

  def tokenTtl: FiniteDuration =
    sys.env.get(TokenTtlEnv) match {
      case None => DefaultTokenTtl
      case Some(raw) =>
        val seconds = raw.toLong
        require(seconds > 0, s"$TokenTtlEnv must be positive")
        seconds.seconds
    }

  private def loadKeyPair: KeyPair = {
    (sys.env.get(PrivateKeyEnv), sys.env.get(PublicKeyEnv)) match {
      case (Some(privateKey), Some(publicKey)) =>
        new KeyPair(
          parsePublicKey(publicKey),
          parsePrivateKey(privateKey),
        )
      case (None, None) if sys.env.get("ENV").contains("local") =>
        val generator = KeyPairGenerator.getInstance("RSA")
        generator.initialize(2048)
        generator.generateKeyPair
      case _ =>
        throw new IllegalStateException(
          s"$PrivateKeyEnv and $PublicKeyEnv must both be configured outside ENV=local"
        )
    }
  }

  private def validateKeyPair(keys: KeyPair): KeyPair = {
    val publicKey = keys.getPublic match {
      case key: RSAPublicKey => key
      case _ => throw new IllegalStateException("JWT public key must be RSA")
    }
    val privateKey = keys.getPrivate match {
      case key: RSAPrivateKey => key
      case _ => throw new IllegalStateException("JWT private key must be RSA")
    }
    require(
      publicKey.getModulus.bitLength >= 2048,
      "JWT RSA keys must be at least 2048 bits"
    )
    require(
      publicKey.getModulus == privateKey.getModulus,
      "JWT public and private keys do not match"
    )
    keys
  }

  private def parsePrivateKey(raw: String): PrivateKey = {
    val spec = new PKCS8EncodedKeySpec(decodeKey(raw))
    KeyFactory.getInstance("RSA").generatePrivate(spec)
  }

  private def parsePublicKey(raw: String): PublicKey = {
    val spec = new X509EncodedKeySpec(decodeKey(raw))
    KeyFactory.getInstance("RSA").generatePublic(spec)
  }

  private def decodeKey(raw: String): Array[Byte] =
    Base64.getDecoder.decode(raw.replaceAll("\\s", ""))
}
