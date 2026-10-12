# Capylulu 约会邀请 💕

A tiny Mandarin date-invite page. The "不要" (no) button runs away, so the only option is "好呀" (yes).

## Run locally
Just open `index.html` in a browser.

## Customize
Edit the `CONFIG` block at the top of `script.js`: her nickname, your name, and the date plan.
The Saturday date is calculated automatically.

## Use real Capylulu images
Drop your own images into `images/` with these names (GIF or rename the paths in `CONFIG.images`):
- `capylulu-ask.gif` – shown while asking
- `capylulu-sad.gif` – shown when she tries to press "不要"
- `capylulu-happy.gif` – shown after she says yes

If a file is missing, the built-in drawn capybara is used instead.

## Send it to her
Easiest: drag the whole `capylulu-date` folder onto https://app.netlify.com/drop and send her the link.
Or push to GitHub and enable GitHub Pages.
