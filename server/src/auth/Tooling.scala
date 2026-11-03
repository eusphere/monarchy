package monarchy.auth

import java.security.{KeyFactory, KeyPair, PrivateKey, PublicKey}
import java.security.interfaces.{RSAPrivateKey, RSAPublicKey}
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
  private val DefaultTokenTtl = 365.days
  private val FallbackPrivateKey =
    "MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCsiNkJ3/AlGFfl/mH0hZRnD7C/7DUjFj1j6bWDHt5Cxjj+M4eTK0fZ0hlfL50Tnsh3EcvO8hZEzfvOmNKClmHgu9gWDankZ+yKKJkyu+YDrUw3+8LcH0UvAWND6a80phM84QgNUD5wB/dYl/mnyaIp86opyVkUFqXgRXiXRD0v88TvqcCUFhH+/zTy7H7bwmi/EfgtTlehPbuEsR4lHeqq3fq49yCT+HKOGnH5htI62XAEwK9Fvz1DYRobKWcm5R+CNw5jCIA8qGrw9wEroLrdXtpyaRURA1YP9wjWiBl5RuxogegdBhUZYEXL/H7FaFyTXhW0UeG6WHp/MXQ7VfUHAgMBAAECggEAC1IhzTUSOjNIgs3YByxdc9m8T9hW43BJ8B/D1wOtsvuNfjIXx9jqKpyCwuBXHsd0NEpI19GPE03hia/Okd6XzSAzA73Uk1xPHmc4wVlBtKVCJm/XKSX5t/J2XSlplqHJcPaVcBIycDVsATZcakPS54yWclsRnj2e/ehxCwCuQLjsaS9V/PKlRppMQM8/H41KDaAf8q8iQBtLrv81iqdO/ZIobKcfb8JViSy9bCjRaYvHYhrkF3XIsxfXKMHo7wLv+uCZa+lGnE/v4MJFlAGRQIUGkJfqD3Wy5ViF4iYbsG4CQZ/+j5hv4YRA31rCHjuInItB/ufY27NEyWf0tJHB0QKBgQDvufZbsbhbcWIb/x7XrjBTaL5cQiQjzi3lIgkDVtj6YYujU3LoIbz9HCTRVlpSh+3OIkGUG5y6eJDV/btt8U07ZimXt113pbLKf7GXhTL0CjiyPaIEY2hEM77HCE3tV41lkg9xMEYZQPIbNf5s/cSZb8XpC/vNwC1WbJ0tdmOrWQKBgQC4PzSLbqhOMMTZhTv+bamDz2FpAZd4uXpplDezKBaeuQHIZldXAVBA7my6RBk/cSx3kHf/iF6g+3qJZgfk7/jkqAmivdfp3COP8kSwrd+iYs6s8BWxJH5p5MeDbfPQqIwWMGKeMVrYl+Cryz+AuXTAyfJkm6dCGAvMS0HXdet3XwKBgQCcxeWp45ioHIdHvdkCvcSW15oeJZcS32Q+Q7rXNzWg0KgMQKeVzXKVqJEfYbSh4okPVHHElSYzAGPfvhaT+MlEPjSXJnB2raM2MLoIWDCRThnz3sCU1Bm8+IYcDX9A5w/uS83TfPlqzIFIcFAaIP8wRNuN46thy/saWN+VeqYFyQKBgFf71tu+vCCaqWY2ea/GLm0DW0EJwYulBw/j97VWL3ccYf2Q4aRqvChFsyY/3s6s/M8b7jHYrVeyv5FdZ+ersO+ATxmoDrNerJzQ1HyKi4DALnHnNHSjOLrYxW290/CQjFUMRgvFBdzoqiFfrbOK3HYz+cyRiA3H7dphFdAOP6OBAoGBAKDynxq8iLTigIJegDseB/o9zZk13vqv7O9rVs3LMt+93wt1xsOpGD0DAnDU49S2wtP6TMJv+lXNY0egECnW98PJsK0UdtBiI5H889UWN2NeZcbYorQoj6h2mcgoveh5nOAP51Jv+IZuna8JRStII5uYPULzpq/+3+Uw7JmI3Ypz"
  private val FallbackPublicKey =
    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArIjZCd/wJRhX5f5h9IWUZw+wv+w1IxY9Y+m1gx7eQsY4/jOHkytH2dIZXy+dE57IdxHLzvIWRM37zpjSgpZh4LvYFg2p5GfsiiiZMrvmA61MN/vC3B9FLwFjQ+mvNKYTPOEIDVA+cAf3WJf5p8miKfOqKclZFBal4EV4l0Q9L/PE76nAlBYR/v808ux+28JovxH4LU5XoT27hLEeJR3qqt36uPcgk/hyjhpx+YbSOtlwBMCvRb89Q2EaGylnJuUfgjcOYwiAPKhq8PcBK6C63V7acmkVEQNWD/cI1ogZeUbsaIHoHQYVGWBFy/x+xWhck14VtFHhulh6fzF0O1X1BwIDAQAB"

  private lazy val tokenKeys = validateKeyPair(loadKeyPair)

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

  def tokenTtl: FiniteDuration = DefaultTokenTtl

  private def loadKeyPair: KeyPair = {
    (sys.env.get(PrivateKeyEnv), sys.env.get(PublicKeyEnv)) match {
      case (Some(privateKey), Some(publicKey)) =>
        new KeyPair(
          parsePublicKey(publicKey),
          parsePrivateKey(privateKey),
        )
      case (None, None) =>
        new KeyPair(
          parsePublicKey(FallbackPublicKey),
          parsePrivateKey(FallbackPrivateKey),
        )
      case _ =>
        throw new IllegalStateException(
          s"$PrivateKeyEnv and $PublicKeyEnv must be configured together"
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
