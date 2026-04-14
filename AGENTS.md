# QWERTY 4 - Agent instructions

This file gives AI coding agents the project-specific rules for working in this repository.

## Start Here

- Read local agent guidance from `.agents/*` before making changes.
- The repository currently stores local guidance in `.agents/skills/*`.
- If both this file and a file in `.agents/*` apply, follow the more specific instruction.

## Local Skills In This Repo

- `.agents/skills/*` Read the skills and use them if applicable.

## Project Snapshot

- Monorepo with `backend/` and `frontend/`.
- Frontend: Next.js 15, React 19, TypeScript, Zustand, `@sk-web-gui`.
- Backend: Express, `routing-controllers`, TypeScript, `class-validator`.
- API contracts are generated and already checked into the repo.

## Core Rules

- Prefer readability over smartness.
- Keep code boring, explicit, and easy to scan.
- Follow existing patterns in nearby files before introducing new abstractions.
- Make the smallest change that solves the task cleanly.
- Do not add fallback transformation layers unless there is a real mismatch at a boundary.
- Don't make files too long. Split in to several files, utils, components, services, etc, if needed.

## UI And Design System

- Use components from `@sk-web-gui` before building custom UI.
- Reuse existing project components before adding new ones.
- Preserve the established visual language unless the task explicitly asks for a redesign.
- Always honor WCAG 2.2 level AA.
- Treat accessibility as a default requirement, not a polish step.

## Accessibility Expectations

- Ensure keyboard access, visible focus states, semantic structure, and correct labels.
- Keep color contrast at WCAG 2.2 AA levels.
- Do not rely on color alone to communicate state.
- Use accessible names for icons, buttons, inputs, loaders, and status messages.
- Prefer built-in accessibility behavior from `@sk-web-gui` components over custom implementations.

## Contracts, Types, And Data Flow

- Do not write your own interfaces or types when a generated data contract already exists.
- Trust the data contracts.
- Do not write unnecessary normalizers, mappers, or reshaping helpers when the contract already defines the shape.
- Import request and response types from the generated contract files whenever possible.
- Only introduce local types for UI-only state, component props, or internal helpers when no contract fits.
- Do not hand-edit generated contract files.

## Contract Locations

- Backend upstream contracts: `backend/src/data-contracts/**`
- Frontend contracts generated from backend: `frontend/src/data-contracts/backend/data-contracts.ts`
- Contract generation commands:
  - `cd backend && yarn generate:contracts`
  - `cd frontend && yarn generate:contracts`

## Frontend Guidance

- Prefer `@sk-web-gui/react`, `@sk-web-gui/ai`, and related package components over custom primitives.
- Keep components focused and readable.
- Prefer existing hooks and stores over introducing parallel state solutions.
- Avoid duplicating backend contract types in frontend feature code.
- When loading or error states are needed, implement them accessibly.
- This project uses local copies of parts of `@sk-web-gui/ai` in a experimental phase. These will later be added / updated in the real package. Create a copy and edit it if necessary, but prompt the question first.

## Backend Guidance

- Follow existing `routing-controllers` controller, DTO, response, and service patterns.
- Reuse generated contracts for request and response typing.
- Validate inputs at the boundary, then trust typed data inside the flow.
- Avoid defensive reshaping of already-typed contract data unless an external integration is actually inconsistent.

## Testing And Verification

- Run the smallest relevant checks for the area you changed.
- Prefer targeted verification first, then broader checks when needed.
- For frontend changes, consider `yarn type-check`, `yarn lint`, Jest, or Cypress as appropriate.
- For backend changes, consider `yarn type-check`, `yarn lint`, and Jest as appropriate.

## Change Hygiene

- Do not edit generated files unless the task is explicitly to regenerate contracts.
- Keep commits and branches focused on one concern.
- Match existing naming and file organization conventions.
- Add comments only when they help a future reader understand intent faster.

## Don'ts

- Do not write Jest tests
