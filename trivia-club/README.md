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

The Lessons page can read public Google Slides directly from the club's Lessons
folder. It refreshes on opening the page, every five minutes while visible, and
when returning to the tab. Existing slides keep their curated titles,
descriptions, tags, and ordering; new slides use their Drive titles and descriptions.
Only slides directly inside the folder are included. Removed slides disappear
after a successful refresh. Failed requests preserve the last working list;
without a configured key the original bundled lessons still work.

Enable Google Drive API in a Google Cloud project and create a browser API key.
Restrict it to Google Drive API and HTTP referrers for
`https://reachtrivia-ehss.vercel.app/*`. Local previews use the saved lesson list
because the key is intentionally restricted to the production website.
Vite embeds this public key in the browser bundle; restrictions limit its use.
No Google account sign-in is required for site visitors.

For local development, copy `.env.example` to `.env.local`, fill in the key,
and restart Vite. For Vercel, set `VITE_GOOGLE_DRIVE_API_KEY` in the project
environment and rebuild. GitHub Pages builds read the repository Actions
secret `GOOGLE_DRIVE_API_KEY`. Never commit `.env.local`.

GitHub Actions validates and builds pushes to main, then deploys `dist/` to
GitHub Pages. The custom `public/404.html` restores direct page URLs for React
Router, including query strings and fragments. Unknown routes show a not-found
page. Vercel uses the existing `vercel.json` rewrite.

The header logo and favicon are web-sized copies of the original club artwork.
