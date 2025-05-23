import * as React from 'react';
import * as Types from '~/util/types';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Compact from '~/components/user/Compact';
import fetchGames from './fetchGames';
// @ts-ignore
import styles from './index.css';
import Table from 'react-bootstrap/Table';
import { gamesSetRecent } from '~/state/actions';
import { State } from '~/state/state';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

const GameStatus = (props: { status: string, playerStatus: null | string }) => {
  const { status, playerStatus } = props;
  let colors = ['dark', 'light'];
  if (playerStatus === 'WON') colors = ['light', 'success', playerStatus];
  else if (playerStatus === 'LOST') colors = ['light', 'danger', playerStatus];
  else if (playerStatus === 'DRAWN') colors = ['light', 'secondary', playerStatus];
  else if (status === 'STARTED') colors = ['light', 'primary', status];
  else if (status === 'COMPLETED') colors = ['light', 'success', status];

  const [color, bg, text] = colors;
  const textFormatted = text.toLowerCase();
  // @ts-ignore
  return <Badge bg={bg} text={color}>{textFormatted}</Badge>;
};

const GameRow = (props) => {
  const { viewerId, game, onView } = props;
  const { id, status, players } = game;
  const onViewClick = React.useCallback(() => onView(id), [id, onView]);
  // Property formatting
  const self: Types.Player = players.find(_ => _.user.id == viewerId);
  const opponent: Types.Player = players.filter(_ => _.user.id != viewerId)[0];
  return (
    <tr>
      <td className={styles.opponentCell}>
        <div className={styles.opponent}>
          <Compact user={opponent.user} rating={opponent.rating} ratingDelta={opponent.ratingDelta} />
          <Button variant='outline-primary' size='sm' onClick={onViewClick}>View</Button>
        </div>
      </td>
      <td>
        <GameStatus status={status} playerStatus={self?.status} />
      </td>
    </tr>
  );
};

const GamesTable = withRouter((props) => {
  const { viewerId, games, history } = props;
  const onView = React.useCallback((id: string) => history.push('/games/' + id), [history]);
  return (
    <div>
      <h3>Active games</h3>   
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Opponent</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{
          games.map(g =>
            <GameRow
              key={g.id}
              viewerId={viewerId}
              onView={onView}
              game={g}
            />
          )
        }</tbody>
      </Table>
    </div>
  );
});

const GamesView = (props) => {
  const dispatch = useDispatch();
  const userId = useSelector<State, string>(_ => _.auth.userId);
  const recent = useSelector<State, State['games']['recent']>(_ => _.games.recent);
  // onComponentDidMount, load data
  React.useEffect(() => {
    const query = { userId };
    fetchGames(query).then(_ => dispatch(gamesSetRecent(_.data.games)))
  }, []);
  // Conditionally render games, if any.
  return recent.length > 0 ? <GamesTable viewerId={userId} games={recent} /> : null;
};

export default GamesView;
