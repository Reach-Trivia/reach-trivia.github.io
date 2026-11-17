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

The Scores page has a five-second answer timer with an editable duration
(1–300 seconds), pause/resume, and a Restart button that immediately starts
another full countdown. It keeps counting while minimized. Both panels have
labeled position choices; the buzzer switches from beside/below to above/below
on smaller screens. Multibuzz does not expose buzz events to the embedded page,
so the answer timer starts manually.

Keyboard shortcuts on the Scores page: **N** starts/pauses/resumes the answer
timer; **M** restarts it. Team 1 uses **U / I / H / J** for **+10 / +5 / −10 / −5**;
Team 2 uses **O / P / K / L** for the same adjustments. The guide is at the bottom
of the page, below the match controls. The timer shortcuts also work while minimized. Shortcuts
ignore typing, held keys, and modifier combinations. Click outside the embedded
buzzer first; keyboard events inside it belong to Multibuzz. Uncheck
**Enable shortcuts** in the guide to turn them off.

The daily question changes at each visitor's local midnight. The competition
countdown uses the event's Toronto offset. Edit the event in `src/pages/Home.jsx`
and historical scores in `src/data/scoreHistory.js`.

## Deployment

### Lessons and question sets

The Resources page reads its lesson links from `src/data/resources.js` and searches
their titles and tags. Edit that file to add, rename, or remove a lesson. Nested
question-set folder links are maintained in `src/data/questionSets.js`.
The site does not sync with Drive or require a Drive API key.

Vercel deploys the site from `main`. GitHub Actions
runs lint, formatting, tests, and a production build on pushes and pull requests;
it does not publish a site. Vercel uses the `vercel.json` rewrite for React Router
pages, including direct links. Unknown routes show a not-found page.

The header logo and favicon are web-sized copies of the original club artwork.

## Licence

The website source code is licensed under the GNU General Public License,
version 3 only. See [LICENSE](../LICENSE). Linked slides, question sets, and
third-party materials retain their respective licences.
