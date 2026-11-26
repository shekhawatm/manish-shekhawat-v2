# Manish Shekhawat · v2

The colourful version of my personal site. Plain HTML, CSS and a little JavaScript, no framework and no build step on the server. It deploys on Vercel as a static site.

## Pages
- `/`: landing page with avatar, chat-style intro, numbers, what I do, tools and kind words
- `/journey`: career timeline and awards
- `/built`: ten tools with category filters
- `/approach`: how I work, kind words and life outside work

Every page also has the **Mini Manish** chat button (quick answers taken from the site's own words), light/dark mode, a phone tab bar and a copy-email button with confetti.

## Editing
All the words live in `scripts/build.mjs`. Change them there, then run:

```bash
node scripts/build.mjs
```

Styles are in `assets/styles.css` and interactions in `assets/app.js`.

🤖 Built with [Claude Code](https://claude.com/claude-code)
