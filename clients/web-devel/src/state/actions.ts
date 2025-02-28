import * as ActionTypes from './types';
import * as Auth from '~/api/auth';
import * as Types from '~/util/types';
import streamProxy from '~/api/streamProxy';
import fetchEffects from '~/api/fetchEffects';
import fetchGame from '~/api/fetchGame';
import writeAttack from '~/api/writeAttack';
import writeDirection from '~/api/writeDirection';
import writeMove from '~/api/writeMove';
import writeSelect from '~/api/writeSelect';
import writeEndTurn from '~/api/writeEndTurn';

// Utilities
const createAction = <T>(type: string, payload?: T) => ({ type, payload });
const clockAt = () => (new Date).getTime();

// Actions below
export const authSet = (auth: Auth.Auth) => {
  Auth.apply(auth);
  return createAction(ActionTypes.AUTH_SET, auth);
};

export const matchmakingSet = (challenges) =>
  createAction(ActionTypes.MATCHMAKING_SET, challenges);

export const ping = () => {
  streamProxy.send('Ping');
  return createAction(ActionTypes.PING, { at: clockAt() });
};

export const pong = (serverAt: number) =>
  createAction(ActionTypes.PONG, { at: clockAt(), serverAt });

export const gamesSetRecent = (games) =>
  createAction(ActionTypes.GAMES_SET_RECENT, games);

export const gameFetch = (id: string) => (dispatch) => {
  dispatch(createAction(ActionTypes.GAME_FETCH));
  return fetchGame(id).then(r => {
    dispatch(createAction(ActionTypes.GAME_FETCHED, r.data.game));
    return r.data.game;
  });
};

export const gameSelect = (gameId: string, point: Types.Vec) => (dispatch) => {
  dispatch(createAction(ActionTypes.GAME_SELECT));
  return writeSelect({ gameId, point }).then(r => {
    dispatch(gameSetSelections(r.data.select));
    return r.data.select;
  });
};

export const gameMove = (gameId: string, point: Types.Vec) => (dispatch) => {
  dispatch(createAction(ActionTypes.GAME_MOVE));
  return writeMove({ gameId, point }).then(r => {
    dispatch(gameSetSelections(r.data.move));
    return r.data.move;
  });
};

export const gameEffectsFetch = (gameId: string, attack: Types.Attack) => (dispatch) => {
  dispatch(createAction(ActionTypes.GAME_EFFECTS_FETCH));
  return fetchEffects(gameId, attack).then(r => {
    dispatch(createAction(ActionTypes.GAME_EFFECTS_FETCHED, r.data.effects));
    return r.data.effects;
  });
};

export const gameAttack = (gameId: string, attack: Types.Attack) => (dispatch) => {
  dispatch(createAction(ActionTypes.GAME_ATTACK));
  return writeAttack(gameId, attack).then(r => {
    dispatch(gameSetSelections(r.data.attack));
    return r.data.attack;
  });
};

export const gameDir = (gameId: string, direction: Types.Vec) => (dispatch) => {
  dispatch(createAction(ActionTypes.GAME_DIR));
  return writeDirection(gameId, direction).then(r => {
    dispatch(gameSetSelections(r.data.direct));
    return r.data.direct;
  });
};

export const gameEndTurn = (gameId: string) => (dispatch) => {
  dispatch(createAction(ActionTypes.GAME_END_TURN));
  return writeEndTurn(gameId).then(r => {
    dispatch(gameSetSelections(r.data.endTurn));
    return r.data.endTurn;
  });
};

export const gameSetSelections = (selections) =>
  createAction(ActionTypes.GAME_SET_SELECTIONS, selections);

export const gameSetPhase = (phase) =>
  createAction(ActionTypes.GAME_SET_PHASE, phase);
