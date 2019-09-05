package monarchy.streaming

import akka.actor._
import akka.http.scaladsl.model.ws.{BinaryMessage, TextMessage, Message}
import akka.NotUsed
import akka.stream.ActorMaterializer
import akka.stream.OverflowStrategy
import akka.stream.scaladsl._
import java.net.InetSocketAddress
import monarchy.auth.Auth
import redis.RedisClient
import scala.concurrent.duration._
import scala.concurrent.{ExecutionContext, Future}

case class MessageTopologyBuilder(
  redisAddr: InetSocketAddress,
  auth: Auth
)(implicit
  ec: ExecutionContext,
  actorSys: ActorSystem,
  actionRenderer: StreamActionRenderer,
  materializer: ActorMaterializer,
  redisClient: RedisClient
) {
  def build: Flow[Message, Message, _] = {
    val clientRef = actorSys.actorOf(Props(new ClientActor))
    val redisProxyRef = actorSys.actorOf(Props(new RedisProxyActor))
    val redisRef = actorSys.actorOf(Props(RedisActor(redisAddr, redisProxyRef)))

    val incomingSink: Sink[Message, NotUsed] = {
      Flow[Message]
        .mapConcat(drainNonText)
        .mapAsync(1)(resolveText)
        .mapConcat(ActionExtractor(auth, _))
        .to(Sink.actorRef[StreamAction](clientRef, PoisonPill))
    }

    val outgoingSource: Source[Message, NotUsed] = {
      Source.actorRef[StreamAction](10, OverflowStrategy.fail)
        .mapMaterializedValue { ref =>
          clientRef ! Connect(ref)
          redisProxyRef ! Connect(ref)
          NotUsed
        }
        .mapAsync(1)(actionRenderer.apply)
        .collect(liftAsMessage)
    }

    // then combine both to a flow
    Flow.fromSinkAndSource(incomingSink, outgoingSource)
  }

  def drainNonText(m: Message): List[TextMessage] = m match {
    case tm: TextMessage => List(tm)
    case bm: BinaryMessage =>
      // Ignore binary messages but drain content to avoid the stream being clogged.
      bm.dataStream.runWith(Sink.ignore)
      Nil
  }

  def resolveText(tm: TextMessage): Future[String] = {
    tm.toStrict(5.seconds).map(_.text)
  }

  def liftAsMessage: PartialFunction[Option[String], TextMessage] = {
    case Some(s) => TextMessage(s)
  }
}
