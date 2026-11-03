---
name: create-pr
description: Create a reviewable GitHub pull request with repository-standard titles, validation, and scope checks. Use when opening a new pull request or preparing a branch for review.
disable-model-invocation: true
---

# Create a pull request

Prepare a focused branch, validate the change, and open a GitHub pull request
with a concise title and an accurate summary. Do not merge the pull request
unless the user explicitly asks for that.

## Title prefixes

Choose the prefix from the files changed:

- Infrastructure, Terraform, AWS, CI deployment, or networking: `[infra]`
- Browser/client applications under `clients/`: `[client]`
- API/server code under `server/`: `[api]`

Place the prefix at the beginning of the title, followed by a short imperative
description. Examples:

```text
[infra] add OIDC deployment role
[client] improve game turn banner
[api] add profile color mutation
```

For a genuinely mixed change, use the dominant scope. If two scopes are
equally central, combine prefixes in changed-system order, for example
`[infra][api] deploy database migrations`.

## Workflow

1. Confirm the branch is based on the intended target branch and inspect the
   working tree.
2. Run the narrowest relevant validation plus `git diff --check`.
3. Review the final diff and confirm no secrets, generated state, or unrelated
   changes are included.
4. Commit with a clear message and push the branch.
5. Create the PR with `gh pr create`, using the required title prefix and a
   body that states what changed, how it was validated, and any follow-up.
6. Report the PR URL and check status. Do not claim the build passes until the
   remote checks confirm it.
