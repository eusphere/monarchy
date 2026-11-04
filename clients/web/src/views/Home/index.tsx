import * as React from 'react';
import { Button, Card, Flex, Heading, Text, Badge, Grid } from '@radix-ui/themes';
import { useLazyLoadQuery, useMutation } from 'react-relay';
import { Link } from 'react-router-dom';
import GamesQuery from '~/autogen/relay/GamesQuery.graphql';
import HomeQuery from '~/autogen/relay/HomeQueriesQuery.graphql';
import HomeSeekMutation from '~/autogen/relay/HomeQueriesSeekMutation.graphql';
import Game from '~/layout/GameSummary';
import styles from './index.module.css';

const Home = (): React.ReactNode => {
  const data = useLazyLoadQuery<any>(HomeQuery, {});
  const user = data.self;
  const games = useLazyLoadQuery<any>(GamesQuery, { q: { userId: user.id } }).games;
  const [seek, isSeeking] = useMutation<any>(HomeSeekMutation);
  const challenges = data.lobby.challenges;

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
          <Flex direction='column' gap='2'>{challenges.map((challenge: any) => <Flex key={challenge.host.id} justify='between' align='center' className={styles.row}><Text>{challenge.host.username}</Text><Badge>{challenge.host.rating}</Badge><Button size='1' variant='soft'>Accept</Button></Flex>)}</Flex>}
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
