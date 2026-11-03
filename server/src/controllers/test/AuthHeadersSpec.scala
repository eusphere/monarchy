package monarchy.controllers

import akka.http.scaladsl.model.headers.{HttpCookiePair, RawHeader}
import java.util.{Base64, UUID}
import java.nio.charset.StandardCharsets
import org.scalatest.wordspec.AnyWordSpec

class AuthHeadersSpec extends AnyWordSpec {
  private val id = UUID.fromString("00000000-0000-0000-0000-000000000001")
  private val payload = Base64.getEncoder.encodeToString(
    s"""{"sub":"$id"}""".getBytes(StandardCharsets.UTF_8)
  )
  private val token = s"e30.$payload.signature"

  "Authentication input parsing" should {
    "ignore malformed encoding in unrelated headers" in {
      assert(AuthRoute.headers(Seq(RawHeader("X-Probe", "%"))).isEmpty)
    }
    "reject malformed authorization without throwing" in {
      assert(AuthRoute.headers(Seq(RawHeader("Authorization", "%"))).isEmpty)
    }
    "recognize case-insensitive authorization headers" in {
      assert(AuthRoute.headers(Seq(RawHeader("authorization", s"Bearer $token"))).contains((id, token)))
    }
    "not URL-decode bearer headers" in {
      val rawToken = token + "%2B"
      assert(AuthRoute.headers(Seq(RawHeader("Authorization", s"Bearer $rawToken"))).contains((id, rawToken)))
    }
    "ignore unrelated cookies with malformed encoding" in {
      assert(AuthRoute.cookies(Seq(HttpCookiePair("other", "%"))).isEmpty)
    }
    "reject malformed authorization cookies without throwing" in {
      assert(AuthRoute.cookies(Seq(HttpCookiePair("Authorization", "%"))).isEmpty)
    }
    "preserve encoded authentication-cookie support" in {
      assert(AuthRoute.cookies(Seq(HttpCookiePair("Authorization", s"Bearer%20$token"))).contains((id, token)))
    }
  }
}
