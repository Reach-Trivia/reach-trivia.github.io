# Reach Trivia

React + Vite website for the Earl Haig trivia club. Includes daily trivia,
a competition countdown, score history, editable match scores, MultiBuzz,
searchable lessons, club contacts, and a practice timer.

## Local development

Use Node.js 22.13 or newer.

```sh
npm ci
npm run dev
```

## Checks

```sh
npm run check
npm run build
```

`check` runs ESLint, formatting checks, and the Node test suite. Use
`npm run format` after editing files. `npm run preview` serves the production build.

## Code map

- `src/pages/`: Home, Scores, Resources, Contact, and the not-found page.
- `src/components/`: navigation, quizzes, timers, the graph, scores, and buzzer.
- `src/data/`: questions, lesson links, contacts, categories, and score history.
- `src/utils/`: date selection, timer math, score parsing, chart geometry, and routing.
- `src/index.css`: design tokens and element defaults.
- `src/App.css`: shared layout, cards, buttons, and navigation.
- `src/styles/`: page-specific CSS. No utility CSS framework is required.

The score layout uses CSS to move mounted panels, preserving scores and the
MultiBuzz iframe. Reset Match clears scores and keeps team names. The external
buzzer requires access to multibuzz.app; it also has an open-in-new-tab control.

The daily question changes at each visitor's local midnight. The competition
countdown uses the event's Toronto offset. Edit the event in `src/pages/Home.jsx`
and historical scores in `src/data/scoreHistory.js`.

## Deployment

### Automatic Drive lessons

Vercel's server endpoint `/api/lessons` lists public slides from the club folder.
The browser receives only slide metadata. Set `GOOGLE_DRIVE_API_KEY` as a
Production **Secret** in Vercel and redeploy. This variable must never use the
`VITE_` prefix. The key stays on the server and is excluded from client builds.

The key is restricted to Google Drive API and the Vercel website address.
The server supplies that application's Referer on its outbound Drive request.
The endpoint caches successful responses for five minutes and accepts no
user-supplied folder, URL, or credential. Existing cards keep their curated
metadata; new slides use their Drive titles and descriptions. Failed requests
preserve the last working lesson list. GitHub Pages and plain Vite previews
retain bundled lessons because they do not run Vercel functions.

The page refreshes on opening, every five minutes while visible, and when
returning to the tab. Only slides directly inside the folder are included.
For server development, use Vercel's local development environment with an
ignored `.env.local` holding `GOOGLE_DRIVE_API_KEY`. Never commit that file.

GitHub Actions validates and builds pushes to main, then deploys `dist/` to
GitHub Pages. The custom `public/404.html` restores direct page URLs for React
Router, including query strings and fragments. Unknown routes show a not-found
page. Vercel uses the existing `vercel.json` rewrite.

The header logo and favicon are web-sized copies of the original club artwork.
