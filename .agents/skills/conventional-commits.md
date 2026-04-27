---
name: conventional-commits
description: Write, suggest, or format conventional commit messages from described or staged changes. Use when Codex needs to turn code changes into a Conventional Commits message, choose the right commit type, add an optional scope, or handle BREAKING CHANGE footers.
---

# Conventional Commits

Write commit messages in standard Conventional Commits format:

```text
type(scope): subject
```

Use these rules:

- Choose the type that best matches the main user-facing intent of the change.
- Add a scope only when the changed area is clear from the request or diff.
- Keep the subject short, imperative, and focused on what changed.
- Use lowercase for the type and subject unless a proper noun requires capitalization.
- Omit the body when the subject is enough.
- Add a body when the change needs extra context, rationale, or migration notes.
- Add a footer for breaking changes with `BREAKING CHANGE:`.
- Split the changes in to multiple commits if needed, for a better change history.
- Avoid adding bugfixes and features in the same commit.
- Docs and tests should be included in the same commit as the fix or feature they belong to.
- Ask if you should commit the changes when a thread is done.
- Never commit on main branches (main, develop, release, etc)

## Common Types

- `feat`: add or expand user-facing functionality
- `fix`: correct a bug or regression
- `docs`: change documentation only
- `refactor`: restructure code without changing behavior
- `test`: add or update tests
- `chore`: maintenance work that does not fit the other main types
- `ci`: change CI or automation workflow behavior

## Scope Guidance

Use a scope when it helps identify the changed area and the scope is obvious from the context.

Good scopes:

- `frontend`
- `backend`

Leave the scope out when:

- the change spans multiple unrelated areas
- the request does not identify a clear subsystem
- adding a scope would force a guess

## Breaking Changes

If the change is backward-incompatible:

- keep the main line in normal Conventional Commits format
- add a footer starting with `BREAKING CHANGE:`
- describe what changed and what callers need to do

Example:

```text
feat(api): rename login response fields

BREAKING CHANGE: `token` was renamed to `accessToken` in the login response.
```

## Writing Process

1. Identify the primary change.
2. Pick the narrowest accurate type.
3. Add a scope only if it is clearly supported by the change.
4. Write a short imperative subject.
5. Add a body or footer only when it adds useful information.

Prefer one strong commit line over an over-explained message.
Do not push if not asked to.

## Examples

Turn these change descriptions into commit messages:

- Add remember-me support to the login flow:

```text
feat(login): add remember me support
```

- Fix a backend bug where expired sessions still pass auth:

```text
fix(auth): reject expired sessions
```

- Update generated API contracts after backend response changes:

```text
chore(contracts): regenerate API contracts
```

- Rewrite a service for clarity without changing behavior:

```text
refactor(backend): simplify report aggregation flow
```

- Add Cypress coverage for login errors:

```text
test(login): cover invalid login error states
```

- Update CI to run frontend and backend tests separately:

```text
ci: split frontend and backend test jobs
```

## Output Style

When asked to write a conventional commit:

- return the final commit message first
- include a body only if it materially helps
- if the type is ambiguous, choose the most likely one from the change intent
- do not explain the convention unless the user asks
- do not include yourself (the assistant, agent, model or company) as author.
