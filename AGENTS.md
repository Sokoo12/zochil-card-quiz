# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

## Durable design decisions

- This is a supervised, single-screen touchscreen kiosk for a marketing event.
- Use the supplied ZOCHIL logo small at the top left and preserve it exactly.
- Visual direction: youthful 2026 sticker-pop/zine marketing graphics, not a classroom quiz or 2010 UI.
- Typography: Rubik Variable for Mongolian display text and Inter for functional text.
- Quiz rounds contain four random questions from the original 40 plus exactly one guaranteed hard question from a ten-question hard bank. Hard questions and answers must stay concise and approachable but require some thought.
- Return an abandoned quiz to the home screen after two minutes of inactivity and persist completed results locally for reporting.
- Keep the background restrained and minimalist, with the top-left logo area completely free of decorative imagery.
- Randomize answer positions with balanced A/B/C/D placement in every five-question round.
- Do not reuse a selected question during the next five quiz rounds; persist this cooldown locally.
- For non-perfect results, make “Мундаг байлаа!” the main headline and show the numeric score as supporting information.
- Use ZOCHIL CONTENT QUIZ branding and ZOCHIL QUIZ / ZOCHIL CHALLENGE labels instead of generic round labels.
- In the report, provide a discreet “reset all scores” control protected by the four-digit admin PIN 1208.
- Maintain a generated single-file `ZOCHIL-QUIZ.html` deliverable that runs offline by double-click without Node.js or internet; embed all fonts, images, styles, and scripts.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.
