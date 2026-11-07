package monarchy.util.http

import org.scalatest.matchers.should.Matchers
import org.scalatest.wordspec.AnyWordSpec

class UrlBuilderSpec extends AnyWordSpec with Matchers {

  "UrlBuilder" should {
    "build a URL with an encoded query parameter" in {
      UrlBuilder("https://example.com/callback")
        .query("login", "success message")
        .build shouldBe "https://example.com/callback?login=success+message"
    }

    "append parameters to a URL that already has a query" in {
      UrlBuilder.from("https://example.com/callback?state=abc")
        .query("login", "success")
        .build shouldBe "https://example.com/callback?state=abc&login=success"
    }

    "preserve a fragment when appending a parameter" in {
      UrlBuilder.from("https://example.com/callback#lobby")
        .query("login", "success")
        .build shouldBe "https://example.com/callback?login=success#lobby"
    }

    "preserve both an existing query and fragment" in {
      UrlBuilder.from("https://example.com/callback?state=abc#lobby")
        .query("login", "success")
        .build shouldBe "https://example.com/callback?state=abc&login=success#lobby"
    }

    "avoid adding a separator when no query parameters are present" in {
      UrlBuilder.from("https://example.com/callback#lobby").build shouldBe
        "https://example.com/callback#lobby"
    }
  }
}
