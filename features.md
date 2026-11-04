# Logged-in experience feature list

This document collects the features for the main logged-in experience. It is
intended to turn the current dashboard sketch into a small, coherent home page
and to keep later lobby and social features visible without prematurely
building them.

## Current implementation

- The logged-in landing page is `DashboardView`.
- It loads recent games for the authenticated user through the GraphQL
  `games` query and renders active games when at least one exists.
- It loads the lobby through the GraphQL `lobby` query and renders open
  challenges with actions to seek, accept, or cancel.
- The lobby query already returns `usersOnline`, but the web client currently
  ignores that field.
- `MutationSchema.scala` exposes game actions (`select`, `deselect`, `move`,
  `attack`, `direct`, and `endTurn`) plus `challengeSeek`.
- Accepting a challenge and cancelling a seek are streaming actions
  (`ChallengeAccept` and `ChallengeSeekCancel`), rather than GraphQL
  mutations. A challenge accept creates the game through the streaming
  processor.
- The current dashboard has no useful content when the user has no games or
  challenges: both sections disappear, leaving only the welcome message and a
  seek button.

## Product goals

The logged-in home page should answer three questions quickly:

1. Is there anything I need to respond to?
2. Can I resume a game or see what I just finished?
3. What can I do next if nothing is waiting for me?

The initial implementation should be useful for a new or inactive player,
work with empty data, and make the next action obvious. It should remain a
dashboard, not become a full social or game-history application.

## Phase 1 — useful dashboard now

### Dashboard shell and empty states

- Replace the blank/vanishing sections with explicit dashboard cards or panels:
  - **Challenges** — invitations and the user's current seek.
  - **Continue playing** — games that are still started.
  - **Recently finished** — the user's latest completed games.
  - **Find a match** — the primary call to action when nothing is pending.
- Show a friendly empty state for every panel. For example, a new player should
  see how to seek a match rather than a page with unexplained whitespace.
- Keep the welcome message compact and include the user's rating where useful.
- Preserve direct links to the full matches view and individual game views.

### Challenges and matchmaking

- Make the current open-challenge table a first-class dashboard panel.
- Distinguish the user's own seek from challenges offered by other players.
- Show the available actions clearly: seek, cancel, and accept.
- Refresh or reconcile the challenge list after seek, accept, or cancel so stale
  rows do not remain on screen.
- Handle expired or already-accepted challenges as recoverable UI errors.
- Add loading, failure, and retry states for the lobby request.
- Decide whether a user may have only one active seek; reflect the backend's
  actual behavior in the UI rather than allowing duplicate seek buttons.

### Games

- Split the current game list into **Continue playing** and **Recently
  finished** using game status and player status.
- For active games, show opponent, whose turn it is when available, and a
  prominent Resume/View action.
- For completed games, show opponent, result (win/loss/draw), rating change,
  and completion ordering.
- Show a useful empty state such as “No games yet — seek a challenge to start
  one.”
- Add loading, failure, and retry states; avoid silently rendering nothing
  while the query is in flight.
- Make the list ordering and history limit explicit in the query or API
  contract. The current `games` query orders by creation time but does not yet
  express separate active/history limits.

## Phase 2 — lobby visibility

### Online players

- Render the existing `lobby.usersOnline` result in a compact “Online now”
  panel or player strip.
- Show username and rating; use the existing profile/avatar data when it adds
  useful identity without making the panel noisy.
- Do not imply that every online player is available for a challenge unless the
  backend exposes that state.
- Define the meaning of online consistently with the current Redis presence
  TTL (currently three minutes in `LobbyResolver`).
- Add refresh or live updates so the panel does not present a stale snapshot.

### Live dashboard updates

- Update challenges and games after streaming events rather than relying only
  on a one-time mount fetch.
- Surface connection state and reconnect behavior unobtrusively.
- Consider a lightweight polling fallback if a reliable event subscription is
  not yet available.

## Phase 3 — broader activity and social features

These are deliberately deferred until the Phase 1 data model and layout are
stable.

- Show ongoing and recently completed games for all players, with privacy and
  volume limits.
- Let a player open a public game summary without exposing private or
  in-progress state that should remain hidden.
- Add player search and a player profile/activity view.
- Allow direct challenges from an online-player list.
- Add notifications for received challenges, accepted challenges, completed
  games, and whose turn it is.
- Add pagination or a time window for activity feeds; never load unbounded
  game history into the dashboard.
- Add presence states beyond online/offline only if the product needs them
  (for example, in-game or seeking).

## API and data work to track

- Decide whether dashboard-specific data should remain composed from `games`
  and `lobby`, or whether a dedicated authenticated dashboard query is simpler.
- Add the fields needed to distinguish active games from completed games and to
  display turn ownership without fetching full game state for every row.
- Confirm authorization rules before exposing all-player activity or public
  game state.
- Document the streaming action contract alongside GraphQL mutations so
  challenge acceptance/cancellation are discoverable to client developers.
- Define how Redis presence, challenge keys, and game state are expired and
  how the UI should react when the backing data disappears between fetch and
  action.

## Suggested execution order

1. Add dashboard loading/error/empty states and the four-panel information
   hierarchy.
2. Split active and completed games and improve each row's useful metadata.
3. Make challenge actions update the local view and handle stale actions.
4. Render the already-available online-player data.
5. Add live updates or a polling fallback.
6. Revisit all-player activity, profiles, notifications, and direct challenges.

## Non-goals for the first pass

- A full social feed.
- Chat or messaging.
- Ranking/leaderboard redesign.
- Replacing the streaming action protocol with GraphQL solely for consistency.
- Loading or rendering full board state for every dashboard game.
