import * as React from 'react';
import { Button, Card, Flex, Heading, Text, Grid } from '@radix-ui/themes';
import { useFragment, useLazyLoadQuery, useMutation } from 'react-relay';
import { Link, useNavigate } from 'react-router-dom';
import GamesQuery from '~/autogen/relay/GamesQuery.graphql';
import HomeQuery from '~/autogen/relay/HomeQueriesQuery.graphql';
import HomeSeekMutation from '~/autogen/relay/HomeQueriesSeekMutation.graphql';
import HomeChallengeAcceptMutation from '~/autogen/relay/HomeQueriesChallengeAcceptMutation.graphql';
import HomeChallengeCancelMutation from '~/autogen/relay/HomeQueriesChallengeCancelMutation.graphql';
import Game from '~/layout/GameSummary';
import styles from './index.module.css';
import { subscribe } from '~/network/stream';
import UserRating from '~/layout/GameSummary/UserRating';
import Cancel from '~/components/icons/Cancel';
import UserFragment from '~/autogen/relay/UserFragment.graphql';
import Attack from '~/components/icons/Attack';
import useRemainingSeconds from '~/util/useRemainingSeconds';
import { formatDuration } from '~/util/duration';

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
          <Button onClick={() => seek({ variables: {} })} disabled={isSeeking}>Seek</Button>
        </Flex>
        {challenges.length === 0 ? <Text color='gray'>No open challenges yet. Seek one to get started.</Text> :
          <Flex direction='column' gap='3'>{challenges.map((challenge: any) => <ChallengeTile key={challenge.host.id} challenge={challenge} user={user} isCancelling={isCancelling} isAccepting={isAccepting} onCancel={() => cancel({ variables: {} })} onAccept={() => accept({ variables: { q: { opponentId: challenge.host.id } }, onCompleted: (result: any) => { void navigate(`/game/${result.challengeAccept.id}`); } })} />)}</Flex>}
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

const ChallengeTile = ({ challenge, user, isCancelling, isAccepting, onCancel, onAccept }: any): React.ReactNode => {
  const host = useFragment<any>(UserFragment, challenge.host);
  const isOwn = host.id === user.id;
  const remaining = useRemainingSeconds(challenge.expireAt);
  const expired = remaining === 0;
  return <Card size='1' className={styles.challengeTile}>
    <Flex justify='between' align='center' gap='3'>
      <Flex direction='column' gap='1'>
        <UserRating user={host} rating={host.rating} />
        <Text size='1' color='gray' role='timer' aria-live='off'>
          {remaining === null ? 'Evergreen' : expired ? 'Expired' : `${formatDuration(remaining)} remaining`}
        </Text>
      </Flex>
      {isOwn ? <Button size='1' variant='soft' color='gray' onClick={onCancel} disabled={isCancelling || expired}><Cancel />Cancel</Button> : <Button size='1' variant='soft' color='blue' onClick={onAccept} disabled={isAccepting || expired}><Attack size={18} />Accept</Button>}
    </Flex>
  </Card>;
};

export default Home;
