# E-commerce site — marketplace cart

A static **HTML / CSS / JavaScript** cart page with an Alibaba-style marketplace look: header, line items with thumbnails, order summary, saved-for-later grid, coupon field, and footer.

## Files

| Part | Path | Role |
|------|------|------|
| **HTML** | `index.html` | Page structure: cart, summary, saved items, promo, coupon, features, footer |
| **CSS** | `css/style.css` | Layout (grid, responsive breakpoints), Inter font, buttons, cards, footer |
| **JavaScript** | `js/main.js` | Subtotal/tax/total, quantity +/-, remove, save for later, move to cart, coupon, checkout state |

## Assets

Product and UI images are in `assets/images/` (referenced by the page).

## Run locally

Open `index.html` in your browser, or serve this folder with any static file server.

## Publish to GitHub

This project is a normal Git repo on branch `main` (HTML, CSS, JS, images, and this README are all tracked). To create the remote repository and upload everything, sign in once, then run:

```bash
gh auth login -h github.com -p https -w
gh repo create e-commerce-site --public --source=. --remote=origin --push --description "Static e-commerce cart: HTML, CSS, JS — marketplace-style UI, cart totals, quantities, save for later, coupon, checkout demo."
```

If the name `e-commerce-site` is already taken, pick another name (for example `e-commerce-site-warda`) and use that in the command instead.

**Cursor:** Connect GitHub in Cursor settings so the GitHub MCP can create or push repos without the CLI.
