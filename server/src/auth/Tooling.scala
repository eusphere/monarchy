package monarchy.auth

import java.nio.charset.StandardCharsets
import java.security.{KeyFactory, KeyPair, KeyPairGenerator, PrivateKey, PublicKey, SecureRandom}
import java.security.spec.{PKCS8EncodedKeySpec, X509EncodedKeySpec}
import java.time.Instant
import java.util.{Base64, Date, UUID}
import io.jsonwebtoken.impl.crypto.MacProvider
import io.jsonwebtoken.{Jwts, SignatureAlgorithm}
import monarchy.util.Env
import scala.concurrent.duration._
import scala.util.Try

object Tooling {
  val Issuer = "monarchy"
  val Audience = "monarchy-api"
  val TokenTtl: FiniteDuration = 365.days

  // Temporary local-development seed. Never use this key material outside local development.
  private val LocalSeed = "monarchy-local-dev-only"

  private lazy val SigningKeys: KeyPair = {
    if (Env.isLocal) {
      val random = SecureRandom.getInstance("SHA1PRNG")
      random.setSeed(LocalSeed.getBytes(StandardCharsets.UTF_8))
      val generator = KeyPairGenerator.getInstance("RSA")
      generator.initialize(2048, random)
      generator.generateKeyPair
    } else {
      new KeyPair(
        parsePublicKey(sys.env("AUTH_PUBKEY")),
        parsePrivateKey(sys.env("AUTH_PRIVKEY")),
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
      .setExpiration(Date.from(now.plusSeconds(TokenTtl.toSeconds)))
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
