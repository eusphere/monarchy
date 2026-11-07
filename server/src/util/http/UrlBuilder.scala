package monarchy.util.http

import java.net.URLEncoder

case class UrlBuilder(
    baseUrl: String,
    query: Map[String, String] = Map.empty,
    fragment: Option[String] = None,
) {
  import UrlBuilder._

  def query(key: String, value: String): UrlBuilder =
    query(key -> value)

  def query(params: (String, String)*): UrlBuilder =
    copy(query = query ++ params)

  def build: String = {
    val queryString = query.map(encodeParam).mkString("&")
    val separator = if (baseUrl.endsWith("?") || baseUrl.endsWith("&")) ""
    else if (baseUrl.contains("?")) "&"
    else "?"
    val url = if (queryString.isEmpty) baseUrl else s"$baseUrl$separator$queryString"
    s"$url${fragment.fold("")(value => s"#$value")}"
  }
}

object UrlBuilder {
  def from(url: String): UrlBuilder = {
    val fragmentIndex = url.indexOf('#')
    if (fragmentIndex < 0) UrlBuilder(url)
    else UrlBuilder(url.take(fragmentIndex), fragment = Some(url.drop(fragmentIndex + 1)))
  }

  private def encodeParam(param: (String, String)): String =
    s"${encode(param._1)}=${encode(param._2)}"

  private def encode(component: String): String =
    URLEncoder.encode(component, "UTF-8")
}
