---
name: create-pr
description: Create a reviewable GitHub pull request with repository-standard titles, validation, and CI debugging. Use when opening a pull request, preparing a branch for review, or fixing failed PR checks.
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
6. Monitor CI for the latest pushed commit and follow the debugging workflow
   below until checks pass or a concrete blocker requires user input.
7. Report the PR URL, verified check status, and any remaining blocker. Do not
   claim the build passes until remote checks confirm it for the current commit.

## Debug CI failures

Inspect every failed job with `gh pr checks`, `gh run view`, and failed-job
logs. Identify the underlying cause before editing or rerunning. When CI
dispatches work to another system, inspect that system's command status and
logs too; a successful dispatch does not establish successful execution.
Avoid exposing credentials or decrypted configuration in diagnostic output.

Fix failures within the task's scope, run relevant local validation, push the
fix, and monitor the new run. Repeat until the applicable checks pass. Rerun
without a code change only when evidence supports a transient failure.
Do not disable checks or weaken assertions to obtain a green build.

Distinguish PR checks from deployment workflows that run only after merge.
Passing PR tests does not prove production deployment works. Do not merge or
trigger a deployment solely to test it without existing user authorization.
For an external outage, missing authority, or required user decision, report
the failing job, supporting evidence, and the specific unblock needed.
