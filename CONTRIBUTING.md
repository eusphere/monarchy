# Contributing

Build small, coherent changes around the user's intended outcome. Treat concrete
product feedback as a request to act when the intent is clear: implement it and
open a focused PR instead of only agreeing or offering a plan. Merge when
review, checks, and the user's authorization support doing so.

## Product and interaction design

### Keep the default view calm

Show the current property and a concise edit action first. Reveal editing
controls only when requested. Prefer an inline expansion when the user benefits
from keeping the surrounding page in view; reserve overlays for interactions
that need them.

Use a short field label with a smaller, muted caption beneath it when the
caption adds useful context. Align the edit action to the top of the field.
Prefer lightweight, link-like actions with a small icon and clear text over
filled buttons for secondary editing controls. Factor repeated field layouts,
labels, captions, actions, and focus behavior into shared components.

### Remove redundant UI

Do not repeat information already communicated by selection styling or a live
preview. Avoid explanatory sentences that merely restate a field label,
duplicate swatches, selected-value summaries, ornamental names, and unnecessary
dividers. Add visible names only when users need them to make a choice;
accessible labels can remain descriptive or numbered without adding visible
text or tooltips.

Keep action labels brief, but preserve enough text to make their meaning clear.
A small icon can reinforce the label. Do not assume an icon alone is sufficient.

### Make direct manipulation immediate

Persist simple, reversible choices as the user makes them. Keep the interaction
responsive while persistence happens in the background, serialize writes, and
ensure the latest choice wins. Show actionable failures rather than progress
messages for routine background work. Static choices should be available
locally rather than fetched on each interaction.

Use **Close** for dismissing an editor whose changes have already taken effect.
Use **Cancel** only when dismissal actually discards changes. Do not imply that
closing an automatically saved editor will undo earlier selections.

### Make selection visually coherent

Use one clear selection treatment instead of stacking several competing rings,
markers, borders, or duplicate indicators. Match the curvature of selection
rings to the swatches or controls they surround, accounting for offsets and
border thickness. Keep keyboard focus visible and distinguishable with a
restrained treatment that fits the component rather than adding a heavy,
unrelated outline.

For hierarchical choices, keep the visible set compact and show the relationship
between the parent and selected child. A representative parent choice should
also exist among its children, and the final stored choice should be a leaf.
Use short, softly curved connectors rather than tall, angular diagrams.

Prefer soft, cohesive surfaces: subtle highlights, restrained shadows, and
rounded geometry that feels consistent across the component. Avoid decoration
that competes with the actual choice.

### Use motion to explain state changes

Transitions should feel smooth and continuous across selection, color, and
hierarchy changes. Keep elements stable while their appearance changes rather
than replacing whole sections or flashing loading states. Preserve keyboard
focus through updates and restore it to the trigger when an editor closes.
Respect reduced-motion preferences.

### Show the actual result in context

Use the real rendering or shared visual component when a flat swatch cannot
communicate the outcome. Place a preview where it belongs in the page's visual
hierarchy; do not automatically put every preview inside an editor. Preserve
existing identity and title treatments unless the requested change calls for
replacing them.

Keep previews focused: use the selected theme, a transparent background when
appropriate, and omit unrelated tiles, scenery, or framing. Static 3D previews
should render on demand rather than run a continuous animation loop.

### Constrain choices thoughtfully and share their source

Prefer curated, usable choices over an unrestricted control when arbitrary
values can undermine legibility. Organize colors into perceptual families with
useful variation in warmth, intensity, and lightness rather than treating hue
alone as the grouping rule. Check colors in their actual rendered context.

When the same choices drive initial assignment, editing, and validation, keep
one shared source of truth. Static shared data can be bundled into both client
and server; sharing a palette does not require a runtime palette API. Avoid
maintaining independently edited parallel lists or inventing names that do not
help the user. For cross-language constants, keep one authored source and use a
small, reproducible generator for checked-in outputs. Document the manual
generation command and regenerate those outputs whenever the source changes.

## Verification and pull requests

Run the relevant checks and inspect UI changes in the running app before
calling them complete. Follow the [web client's browser verification guidance](clients/web/README.md#browser-verification).
Check the relevant open, closed, selected, keyboard-focus, and persistence
states at desktop and narrow widths. Inspect focus styling as well as pointer
styling so automation or keyboard use does not conceal visual problems. Verify
that previews reflect the selected value and that rapid interactions persist
the final choice.

Describe the final behavior and relevant validation in the PR. Keep guidance
and abstractions reusable; do not turn one screenshot or a temporary workaround
into a permanent design rule. Report any verification that could not be
completed, and keep unrelated failures out of the change.
