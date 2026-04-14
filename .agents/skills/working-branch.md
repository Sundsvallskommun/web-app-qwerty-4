---
name: working-branch
description: Create or switch to a working branch before starting development work in a new thread. Use when Codex is about to make repo-tracked changes for a fix, feature, enhancement, or other implementation task and needs to ensure work does not start on main branches such as main, develop, or release.
---

# Working Branch

Before making any change in a thread, check the current git branch.

Use this workflow:

1. Decide whether the thread includes development work.
2. If the thread is only planning, investigation, review, or other non-editing work, do not create a branch.
3. If the thread will include repo-tracked edits, inspect the current branch before editing files.
4. If the current branch is a main branch such as `main`, `develop`, or `release`, create and switch to a new working branch before editing.
5. If the current branch is already another non-main branch, stop and ask the user if you should continue there or create a new branch.

## Branch Type

Choose the branch type from the task intent:

- Use `fix` for bugs, regressions, broken behavior, and repairs.
- Use `feature` for new functionality and enhancements.
- Default to `feature` when implementation work is requested and it is not clearly a bug fix.

## Branch Naming

Use a short, descriptive, lowercase kebab-case summary based on the actual task.

If a Jira ticket is known from the thread, branch name, commit context, or repo state, use:

```text
<type>/<ticket>-<short-summary>
```

If no Jira ticket is known, use:

```text
<type>/<short-summary>
```

Do not invent or guess a Jira ticket. Only use a ticket that is explicitly known from context.

## Branch Creation

When a new working branch is needed:

1. Determine the branch type.
2. Determine whether a Jira ticket is known.
3. Build the branch name from the rules above.
4. Create and switch to the branch before making repo-tracked edits.

Keep the summary short and specific to the task. Avoid generic names like `fix/misc-updates`.

## Examples

- `fix/ABC-123-login-timeout`
- `feature/ABC-456-add-report-filters`
- `fix/session-expiry-check`
- `feature/add-report-filters`

## Scenario Guidance

- New bug-fix thread started from `develop`: create and switch to a `fix/...` branch before editing.
- New feature thread started from `main`: create and switch to a `feature/...` branch before editing.
- Development request with known Jira ticket: include the ticket in the branch name.
- Development request without Jira ticket: omit the ticket and use only type plus summary.
- Planning-only thread with no code changes: do not create a branch.
- Thread started while already on `fix/...` or `feature/...`: ask the user before continuing.
