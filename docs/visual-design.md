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
