import * as React from 'react';
import { Button, Card, Flex, Heading, Text, Badge, Grid } from '@radix-ui/themes';
import { useLazyLoadQuery, useMutation } from 'react-relay';
import { Link, useNavigate } from 'react-router-dom';
import GamesQuery from '~/autogen/relay/GamesQuery.graphql';
import HomeQuery from '~/autogen/relay/HomeQueriesQuery.graphql';
import HomeSeekMutation from '~/autogen/relay/HomeQueriesSeekMutation.graphql';
import HomeChallengeAcceptMutation from '~/autogen/relay/HomeQueriesChallengeAcceptMutation.graphql';
import HomeChallengeCancelMutation from '~/autogen/relay/HomeQueriesChallengeCancelMutation.graphql';
import Game from '~/layout/GameSummary';
import styles from './index.module.css';
import { subscribe } from '~/network/stream';

const Home = (): React.ReactNode => {
  const [lobbyRefreshKey, setLobbyRefreshKey] = React.useState(0);
  const [gamesRefreshKey, setGamesRefreshKey] = React.useState(0);
  const navigate = useNavigate();
  const data = useLazyLoadQuery<any>(HomeQuery, {}, { fetchPolicy: 'network-only', fetchKey: lobbyRefreshKey });
  const user = data.self;
  const games = useLazyLoadQuery<any>(GamesQuery, { q: { userId: user.id } }, { fetchPolicy: 'network-only', fetchKey: gamesRefreshKey }).games;
  const [seek, isSeeking] = useMutation<any>(HomeSeekMutation);
  const [accept, isAccepting] = useMutation<any>(HomeChallengeAcceptMutation);
  const [cancel, isCancelling] = useMutation<any>(HomeChallengeCancelMutation);
  const challenges = data.lobby.challenges;

  React.useEffect(() => subscribe((message) => {
    if (message.name === 'Matchmaking') setLobbyRefreshKey((key) => key + 1);
    if (message.name === 'GameCreate' && typeof message.data === 'object' && message.data !== null && 'gameId' in message.data) {
      setGamesRefreshKey((key) => key + 1);
      navigate(`/game/${(message.data as { gameId: string }).gameId}`);
    }
  }), [navigate]);

  return <main className={styles.root}>
    <section className={styles.hero}>
      <div>
        <Heading size='8' mb='1'>Welcome back, {user.username}</Heading>
      </div>
      <Card className={styles.rating}><Heading size='6'>{user.rating}</Heading></Card>
    </section>

    <Grid columns={{ initial: '1', md: '2' }} gap='4'>
      <Card className={styles.panel}>
        <Flex justify='between' align='start' mb='4' gap='3'>
          <Heading size='5'>Challenges</Heading>
          <Button onClick={() => seek({ variables: {} })} disabled={isSeeking}>Seek a challenge</Button>
        </Flex>
        {challenges.length === 0 ? <Text color='gray'>No open challenges yet. Seek one to get started.</Text> :
          <Flex direction='column' gap='2'>{challenges.map((challenge: any) => <Flex key={challenge.host.id} justify='between' align='center' className={styles.row}><Text>{challenge.host.username}</Text><Badge>{challenge.host.rating}</Badge>{challenge.host.id === user.id ? <Button size='1' variant='soft' onClick={() => cancel({ variables: {} })} disabled={isCancelling}>Cancel</Button> : <Button size='1' variant='soft' onClick={() => accept({ variables: { q: { opponentId: challenge.host.id } }, onCompleted: (result: any) => navigate(`/game/${result.challengeAccept.id}`) })} disabled={isAccepting}>Accept</Button>}</Flex>)}</Flex>}
      </Card>

      <Card className={styles.panel}>
        <Flex justify='between' align='center' mb='4'><Heading size='5'>Games</Heading><Button asChild variant='ghost'><Link to='/matches'>View all</Link></Button></Flex>
        {games.length === 0 ? <Text color='gray'>No games yet. Seek a challenge to start one.</Text> : <RecentGames games={games.slice(0, 6)} selfId={user.id} />}
      </Card>
    </Grid>

  </main>;
};

const RecentGames = ({ games, selfId }: { games: any[], selfId: string }): React.ReactNode =>
  <Flex direction='column' gap='3' className={styles.recentGames}>
    {games.map((game) => <Game key={game.id} game={game} selfId={selfId} />)}
  </Flex>;

export default Home;
