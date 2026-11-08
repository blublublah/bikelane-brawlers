# Bikelane Brawlers (iOS home-screen app)

Play: open the GitHub Pages link in Safari on iPhone, tap Share, then **Add to Home Screen**.

## Shipping an update
1. Change the game in `index.html`.
2. In `sw.js`, bump `VERSION` (v1 → v2 …). This is what tells installed apps there's an update.
3. Push to `main`. Next time someone opens the app online, a "New version ready" button appears; one tap reloads into the new version.
