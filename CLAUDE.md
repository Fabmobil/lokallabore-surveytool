# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A German-language survey webapp for the Lokallabore (local fablabs). Built with Create React App (JS, not TS), using a small self-hosted PHP + SQLite backend (`server/api/`, copied into `build/api/` at build time). Deployed via GitHub Actions to a self-hosted Apache server (umfrage.lokallabore.de, hosted on Uberspace) on every push to `main` (`.github/workflows/deploy.yml`).

## Commands

- `npm start` — dev server at localhost:3000
- `npm run api` — PHP's built-in server on localhost:8080, serving `server/` as docroot; needed alongside `npm start` for the survey to reach the backend locally (requests to `/api/...` are forwarded there via the `proxy` field in `package.json`)
- `npm run build` — production build to `build/` (gitignored, built fresh in CI)
- `npm test` — Jest via react-scripts, interactive watch mode
- `npm test -- --watchAll=false` — run once, non-interactive (use this in CI-like checks)

No lint script is defined; ESLint runs as part of `react-scripts start`/`build` via the `react-app` config in `package.json`.

## Architecture

### Three independent surveys, data-driven routing

Unlike a single linear survey, this app has three independent flows, each an ordered list of question objects in its own constants file, mapped to routes generically by `App.js` (no per-question routing code):

- **Registrierung** (`src/constants/survey-registrierung.js`, baseUrl `registrierung`) — first-time signup: collects a nickname + birthdate (which together become the `userID`), plus a set of demographic/context questions, submitted once at the end.
- **Login** (`src/constants/survey-login.js`, baseUrl `login`) — a short returning-visitor survey. Its first screen (`01_Anmeldung.js`) re-derives the `userID` from nickname+birthdate and looks it up via the backend.
- **Login Extended** (`src/constants/survey-login-extended.js`, also baseUrl `login`) — a longer set of questions appended after the short Login survey, shown conditionally (see below). Both Login and Login Extended answers accumulate into the same `surveyAnswersLogin` state and are submitted together as one `answers_login` row.
- **Guest** (`src/constants/survey-guest.js`, baseUrl `gast`) — fully anonymous, no login/userID at all.

Each screen is uncontrolled from the router's perspective (`data`/`onSubmit` props, manages its own local state), and self-navigates via `WeiterButton`. Nothing is persisted to the backend until each survey's terminal screen calls `onFinalSubmit`.

### Returning-visitor identity and the extended survey

There's no auth. A "login" is a nickname + birthdate pair, hashed into a `userID` string via `ApiClient.createUserID()` (`src/api/client.js`) — literally string concatenation, not a real hash. `01_Anmeldung.js` calls `apiClient.userDoesExist(userID)`, which returns both whether the user is known and their current `numberOfVisits`; on success it calls `onLogin(userID, numberOfVisits)`, which `App.js` records into `surveyAnswersLogin`. `06_Kritik.js` (the last screen of the short Login survey) uses that visit count to decide whether to route into the Login Extended survey — every 3rd visit, unless the visitor identified as a Betreuer*in (`IS_BETREUERIN` app state flag, set by `03_Betreuende.js`), who never sees it. After the combined Login/Login-Extended answers are submitted (`onFinalSubmitLogin`), the visit counter is incremented server-side (`apiClient.incrementNumberOfVisits`).

Registration (`registerUser`, backed by `server/api/register-user.php`) relies on a SQLite `UNIQUE` constraint on `user_id` rather than a check-then-write, so it's race-free by construction.

### Backend: PHP + SQLite

`server/api/` holds plain PHP scripts (no framework/router) using PDO against a single SQLite file: `bootstrap.php` (shared DB connection + schema setup + shared helpers, run on every request), `register-user.php`, `user-exists.php`, `increment-visits.php`, `answers-registrierung.php`, `answers-login.php`, `answers-guest.php`, and `export-csv.php` (see below). It deliberately does **not** live under `public/` — CRA's dev server serves `public/` as static files, and since these `.php` files would then physically exist at a URL like `/api/register-user.php`, the dev server would serve their raw source directly instead of ever reaching the `proxy` config that's supposed to forward to the local PHP server. Keeping them in `server/` avoids that collision; a `postbuild` npm script (`cp -R server/api build/api`) copies them into `build/api/` after every `npm run build`, so the deployed shape (and the GitHub Actions rsync deploy) is unaffected.

Four SQLite tables: `users` (`user_id UNIQUE`, plus `number_of_visits`), `answers_registrierung`, `answers_login` (both with an indexed `user_id` column), and `answers_guest` (no `user_id` — guest submissions are anonymous). Survey answers are stored as a single JSON blob column (`data`) rather than normalized per-question columns, since the questions themselves are defined in JS constants and can change over time.

The actual `.sqlite` file and a `db-config.php` (returning its absolute path) live in a `data/` directory that is a **sibling of the deployed docroot**, not inside it — the GitHub Actions deploy rsyncs with `--delete`, so anything living inside the docroot that isn't part of the build output gets wiped on every deploy. `bootstrap.php` resolves the DB path by checking for that `data/db-config.php` first (`__DIR__/../../data/db-config.php` — the two-levels-up arithmetic assumes `<docroot>/api/*.php`, true both for the deployed `build/api/` and for local dev via `npm run api`'s `server/` docroot), falling back to a gitignored `.dev-data/dev.sqlite` at the repo root for local development.

`src/api/client.js` (`ApiClient`) is the frontend's only backend client, instantiated once in `App.js`.

### CSV export (`server/api/export-csv.php`)

A direct, server-side CSV download of the survey data, protected by HTTP Basic Auth (`.htaccess` in `server/api/`, `<Files "export-csv.php">` block; the `.htpasswd` file lives inside the deployed `api/` directory itself, and is excluded from the deploy's `--delete` via the workflow's rsync `--exclude`). Unlike a joined export, each survey's answers are independent — call it with `?survey=registrierung`, `?survey=login`, or `?survey=guest` to get that table's data flattened into one row per submission. This replaces the older manual-JSON-upload `/data-export` screen, which has been removed.

### Reusable screen components

`src/components/` has the shared building blocks every survey screen composes: input types (`TextInput`, `Slider`, `SingleChoiceTool`, `MultipleChoiceTool`), navigation (`WeiterButton`, `ButtonNext`, `DoubleButtonRow`), and layout (`VerticalGrid`, `VerticalDoubleGrid`). `RobiGif` renders the mascot animations from `src/assets/robi-gifs/`. New survey screens should compose these rather than writing raw form markup.

### Error/alert handling

`AlertLayer` (`src/AlertLayer.js`) is rendered once at the app root, outside the router, and is driven by `App.js`'s `error` state (`reportError`/`clearError`). Known error codes include `USER_EXISTS` (nickname+birthdate collision at Registrierung), `USER_EXISTS_NOT` (Login with an unrecognized nickname+birthdate), and `ABANDON` (user clicks the logo mid-survey, prompting a confirm-and-reset).
