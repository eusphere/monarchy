# Visual design

This is the living visual-design guide for the newer client in [`clients/web`](../clients/web/). Add a rule here when it represents a repeatable product decision rather than a one-off component detail.

## Page gutters

Content should have responsive horizontal gutters. Fixed desktop spacing becomes disproportionately large on narrow screens, while no gutter makes cards and text feel pressed against the viewport edge.

- Use a small but visible gutter on phones.
- Let the gutter grow gradually with the viewport instead of switching abruptly at one breakpoint.
- Keep the page shell responsible for outer spacing; individual cards should not each invent their own viewport padding.
- Use `box-sizing: border-box` when a width and padding are combined.
- Align primary page content to the same horizontal grid gutter as the navigation header; do not introduce a second centered gutter system for a simple page.

The profile page is the first reference implementation in [`clients/web/src/views/Profile/index.module.css`](../clients/web/src/views/Profile/index.module.css).

## Cards on narrow screens

Cards should preserve breathing room without consuming the whole content width. Use responsive internal padding so a narrow card remains useful for text-heavy content. Avoid shrinking typography before reducing excess whitespace.

## Stable information hierarchy and replaceable styling

This document is the design-language contract for `clients/web`. Keep it updated
alongside reusable components. The visual treatment may change substantially
before launch; the information roles and interaction semantics should survive.

- Game summaries identify the participants and their ratings, communicate the
  logged-in player's result/status, and place a quiet timestamp last, below
  the players. The whole
  tile links to the game. Never nest action buttons inside that link.
- Challenge summaries identify the host with the same color/username/rating
  presentation. Their trailing action is Cancel for the owner or Accept for
  another player. These are buttons, not tile navigation.
- Identity color belongs to the user; status color belongs to the outcome.
  Always retain text labels so color is not the only source of meaning.
- User rating and game-player rating have distinct meanings: challenges show
  the current user rating; games show the recorded player rating and delta.
  Share presentation without substituting one data source for the other.

### Composition boundaries

- `layout/SummaryTile` owns the linked surface, content inset, and optional
  leading status cell. It accepts content and status slots and knows nothing
  about GraphQL or game rules. Omitting status leaves a single content column.
- `layout/GameSummary` resolves game data and composes timestamp, players,
  and `PlayerStatus` inside `SummaryTile`. Its CSS only owns content spacing.
- `layout/GameSummary/UserRating` composes `Profile`, rating, and optional
  delta for both games and challenges. Resolve Relay fragments before passing
  data to presentation components so masked fields such as color are available.
- `components/icons` holds reusable SVGs using `currentColor`. The shared
  `AttackIcon` is a tapered sword with a guard and grip.
- Radix supplies surface and semantic color tokens. Component CSS Modules own
  layout. Keep Radix overrides local and explicit (for example,
  `.tile:global(.rt-Card)`) so stylesheet import order cannot undo layout.

### Summary-tile treatment

The current status treatment is a square at the **left edge**, flush with the
tile's top, bottom, and left sides. Content determines the row height; the status
cell matches that height and has equal width. Center its label on both axes.
Keep the outer surface responsible for clipping and corner shape.

Tune these inherited CSS custom properties at the theme or section level:

- `--summary-tile-padding`: content inset, defaults to Radix `--space-3`.
- `--summary-tile-content-gap`: player-to-timestamp spacing, defaults to `--space-2`.
- `--summary-tile-status-min-size`: minimum status square size, defaults to `5rem`.

For a new visual language, change theme tokens and these component styles first.
Do not duplicate tile geometry in page styles or change GraphQL selections to
achieve a visual rearrangement. Add new variants only for concrete product needs.

### Visual verification

TypeScript builds do not verify layout. For tile changes, render the real app
with deterministic GraphQL fixtures in a browser at desktop and phone widths.
Check screenshots and assert that the status is flush left, its height matches
the tile, its width equals its height, and its label is centered on both axes.
Cover playing/won/lost, absent status, long names, and keyboard navigation.
Screenshot baselines may change with the visual language; geometry and
interaction assertions encode the agreed layout and information contract.

The initial browser checks currently run as a local Playwright script; a
repository-owned suite and CI screenshot artifacts remain to be integrated.

## Navigation

The top-right identity control should remain reachable at every width and should lead to the user's profile. Navigation spacing should be independent of the content card gutters.

## Color and identity

Use the user's profile color as an identity accent when available, with a theme accent fallback. Avatar imagery can replace the current monogram later without changing the surrounding layout.

## Turn banner

The game turn indicator is a single, rounded two-player banner rather than a separate status card and player list. Both player sides have equal width. The active side receives the stronger background treatment while the inactive side remains visible but recedes. This change should animate smoothly when control changes.

- Use the player's profile color in the small square accent so ownership is recognizable without relying on text alone.
- Keep both player sides equal in width; turn state should be communicated through color, contrast, and motion rather than layout displacement.
- Keep the username prominent and place the current phase below it as quiet supporting text.
- `Move`, `Attack`, `Select`, and `Waiting` are quiet labels paired with simple line icons, not badges: they should not have a pill background, border, or extra padding.
- Do not imply a clock until game timing exists; the square is an identity accent for now.
- Keep the banner responsive: reduce the square and gutters on narrow screens while preserving the shared page/header alignment.
- Prefer CSS transitions for the active-side change and respect `prefers-reduced-motion`.

The current implementation is [`TurnBanner.tsx`](../clients/web/src/views/Game/Panel/TurnBanner.tsx) with its layout styles in [`Panel/index.module.css`](../clients/web/src/views/Game/Panel/index.module.css). The first icon set is implemented in [`GamePhaseIcon.tsx`](../clients/web/src/views/Game/Panel/GamePhaseIcon.tsx): hourglass for waiting, position arrow for moving, axe for attacking, compass for turning, flag for forfeiting, and crown for victory. Keep these as restrained line icons until the broader SVG icon system is defined.
