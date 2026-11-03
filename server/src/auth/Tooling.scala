package monarchy.auth

import java.security.{KeyFactory, KeyPair, KeyPairGenerator, PrivateKey, PublicKey}
import java.security.spec.{PKCS8EncodedKeySpec, X509EncodedKeySpec}
import java.time.Instant
import java.util.{Base64, Date, UUID}
import io.jsonwebtoken.impl.crypto.MacProvider
import io.jsonwebtoken.{Jwts, SignatureAlgorithm}
import scala.concurrent.duration._
import scala.util.Try

object Tooling {
  private val Issuer = "monarchy"
  private val Audience = "monarchy-api"
  private val PrivateKeyEnv = "MONARCHY_JWT_PRIVATE_KEY"
  private val PublicKeyEnv = "MONARCHY_JWT_PUBLIC_KEY"
  val tokenTtl: FiniteDuration = 365.days
  private val IsLocal = !sys.env.get("ENV").exists(_.contains("prod"))

  private lazy val SigningKeys: KeyPair = {
    if (IsLocal) {
      val generator = KeyPairGenerator.getInstance("RSA")
      generator.initialize(2048)
      generator.generateKeyPair
    } else {
      new KeyPair(
        parsePublicKey(sys.env(PublicKeyEnv)),
        parsePrivateKey(sys.env(PrivateKeyEnv)),
      )
    }
  }

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
      .setIssuedAt(Date.from(now))
      .setExpiration(Date.from(now.plusSeconds(tokenTtl.toSeconds)))
      .signWith(SigningKeys.getPrivate, SignatureAlgorithm.RS256)
      .compact
  }

  def parseSubject(raw: String): Try[UUID] = Try {
    val claims = Jwts.parserBuilder
      .setSigningKey(SigningKeys.getPublic)
      .requireIssuer(Issuer)
      .requireAudience(Audience)
      .build
      .parseClaimsJws(raw)
      .getBody
    UUID.fromString(claims.getSubject)
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
