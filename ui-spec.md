# BuyHive Search Page — UI Spec

Reference values pulled from `https://thebuyhive.com/buy/search` on 2026-07-31.

**How this was captured:** the page was rendered with JavaScript (it is a Vue SPA and
serves an empty shell otherwise), then the site's own stylesheets were downloaded and
the relevant rules extracted. Every value below is copied from their CSS or DOM — none
of it is estimated. See "Limits" at the bottom for what is *not* covered.

Their stack: **Vue 2 + Tailwind (custom config)**, scoped styles via `data-v-*`.
App name `ecom-store-v2`. CSS served from `/buy/css/app.bcda4d4c.css` (~3 MB).

---

## 1. Design tokens

### Colors

| Token | Hex | Used for |
| --- | --- | --- |
| `blue` | `#00b2c9` | brand / primary, links, active states |
| `green` | `#29b574` | secondary accent |
| `dark` | `#231f20` | body text, borders |
| `smoke-100` | `#f2f2f2` | input + filter pill backgrounds |
| `black` | `#000000` | |
| `white` | `#ffffff` | |
| `gray-400` | `#cbd5e0` | Tailwind default |
| `gray-900` | `#1a202c` | Tailwind default |

Checkbox colors are **not** the brand teal — they are their own values:

| Part | Value |
| --- | --- |
| unchecked border | `1px solid #414a4c` |
| checked fill + border | `#005cc8` |
| box size | `18px × 18px`, `border-radius: 4px` |
| tick | `6px × 13px`, `border: solid #fff`, `border-width: 0 3px 3px 0`, `rotate(45deg)`, offset `left:5px; top:0` |

### Typography

Font family: **`Avenir LT Pro`**, falling back to `sans-serif`.
(Commercial licensed font — see Limits.)

| Class | Size |
| --- | --- |
| `text-xs` | `0.75rem` |
| `text-sm` | `0.875rem` |
| `text-base` | `1rem` |
| `text-lg` | `1.125rem` |
| `text-17px` | `17px` |
| `text-xl` | `1.25rem` |
| `text-2xl` | `1.5rem` |
| `text-2.5xl` | `1.75rem` |

### Breakpoints

`340px`, `640px` (`sm`), `768px` (`md`), `1024px` (`lg`), `1200px` (`lg2`),
`1460px` (`xl`), `1600px`.

Note the custom `lg2` at 1200px and the unusual `340px` — both are non-default Tailwind.

### Custom sizing

| Class | Value |
| --- | --- |
| `w-54` | `13.5rem` |
| `w-95` | `90%` |
| `w-content` | `max-content` |
| `w-primary-section` | `100%`, and `calc(100% - 22.5rem)` at `lg` |

`22.5rem` = 360px is the filter sidebar width the results column subtracts.

---

## 2. Page layout

```
app-header  (py-6, py-8 at md)
─────────────────────────────────────────────
search bar   [Categories ▾] [input | category ▾] [Search]
─────────────────────────────────────────────
"Products (524 Products)"
─────────────────────────────────────────────
┌── filters ──┐ ┌──── w-primary-section ─────┐
│ w-80 / 22.5 │ │  "Buy" label                │
│ rem sidebar │ │  promo banner (467px wide)  │
│             │ │  toolbar: view | sort | 1 of 22 │
│  hidden     │ │  product grid               │
│  below lg,  │ │  grid-cols-2                │
│  drawer on  │ │  lg:grid-cols-3             │
│  mobile     │ │  gap-4, xl:gap-10           │
└─────────────┘ └─────────────────────────────┘
footer
```

Results grid is **2 columns**, going to **3 at `lg` (1024px)**. Gap `1rem`, `2.5rem` at `xl`.
The sidebar is `lg:block` / hidden below, replaced by a "Show Filters" drawer on mobile.

Promo banner (`search-buy-banner`): `width:100%` → `467px` at breakpoint,
`padding:.5rem`, `border-radius:.5rem`, background image cover/no-repeat.

---

## 3. Components

### Product card

Markup (Vue scope attrs stripped):

```html
<a href="/buy/{slug}/id/{id}" class="product-preview hover-shadow">
  <div class="md:p-2 h-full">
    <div class="img-box">
      <img src="..." class="product-img">
    </div>
    <div class="detail-box">
      <p   class="detail-box-name whitespace-nowrap">Teakwood Outdoor Patio Sofa Furniture</p>
      <p   class="detail-box-moq  whitespace-nowrap"> MOQ: 5 Sets </p>
      <div class="detail-box-price whitespace-nowrap">$ 125.00 - $ 6,900.00 / Set</div>
      <div class="hidden md:block pt-4 h-12"></div>
    </div>
  </div>
</a>
```

The whole card is a single `<a>`. Styles:

| Selector | Rules |
| --- | --- |
| `.product-preview` | `display:block; border:1px solid transparent; border-radius:.25rem` |
| `.hover-shadow:hover` | `box-shadow: 0 2px 12px -5px #231f20` |
| `.img-box` | `position:relative; height:10rem; padding-top:.5rem; padding-bottom:1.5rem` → `height:14rem` at breakpoint |
| `.product-img` | `margin-inline:auto; height:auto; width:auto; max-height:100%` |
| `.detail-box` | `padding-top:.5rem` |
| `.detail-box-name` | `text-transform:capitalize; padding-bottom:.25rem; overflow:hidden; text-overflow:ellipsis; width:100%` |
| `.detail-box-moq` | `font-size:.875rem; opacity:.5; overflow:hidden; text-overflow:ellipsis` |
| `.detail-box-price` | `padding-top:.25rem; font-size:1.125rem; font-weight:600; letter-spacing:-.05em; ellipsis` |
| `.flag` (stock badge) | `width:2rem` |

All three text lines use `whitespace-nowrap` + ellipsis — they truncate, never wrap.
Price weight 600 with **negative letter-spacing** (`-.05em`) is the distinctive bit.

There is a second card variant (`data-v-1c94096f`) for **list view**: image `width:40%`
(→`20%`), detail box `width:60%` (→`80%`), `padding-left:1.5rem`.

### Filter inputs (the pill style)

Every filter input uses the same wrapper:

```html
<div class="rounded-full bg-smoke-100 flex items-center py-2 border border-dark-b">
  <input type="number" placeholder="Less than" class="app-input bg-smoke-100 flex-grow text-center">
</div>
```

`.app-input` = `border-radius:9999px; padding-left:.75rem; padding-right:.75rem; padding-top:2px`

- Price min/max: two of these side by side, each with a trailing `<span>$</span>`, input `w-4/5`
- MOQ: one, `flex-grow`, `placeholder="Less than"`, `type="number"`
- Certification search: adds `px-3` and a trailing `<i class="icon-search opacity-50">`

Section headings are `<h3 class="text-lg">`, sections separated by `pt-8`, inner content `pt-3` / `pt-5`.
Checkbox lists are capped with `max-h-44 overflow-auto` (11rem, scrolls).

### Filter sections (exact order and labels)

1. **Price** — two pill inputs + slider
2. **MOQ** — single pill input, placeholder "Less than"
3. **Product Certification** — searchable, 15 options, "Show All (15)"
4. **Supplier Certification** — 6 options, no search, no Show All
5. **Manufacturer Location** — 9 options, "Show All (9)"
6. **Stock Availability** — single checkbox, label **"In USA"**

Options, verbatim:

```
Product Certification (15):
  FDA · Certificate of Conformity · CE · ASTM · GB · Certificate of Compliance ·
  Intertek · ROHS · FCC · EN · EPA · ISO 11439:2000 · SGS ·
  Green Clean Certificate · ISO 11439:2013

Supplier Certification (6):
  DUNS · DRS · ISO 13485 · ISO 9001 · ISO 9001:2015 · GMP

Manufacturer Location (9):
  Hong Kong S.A.R · India · China · Vietnam · United States ·
  Canada · Australia · United Kingdom · Korea, Republic of
```

### Header / search bar

Nav: `Expert Sourcing · Contract Manufacturing · Buy · Financing · About Us · Register · Sign In`
plus a cart showing `0`.

`.app-header` = `padding-top/bottom: 1.5rem` → `2rem` at breakpoint.
`.account-area` = `flex; align-items:center; border-radius:9999px; px-4; py-1; min-width:165px; position:relative`

Category dropdown options:
`All Categories · PPE · Health & Medical · Garden & Outdoor · Sports & Fitness · Other · Baby · Beauty & Personal Care · Home, Kitchen & Office`

### Toolbar

Left: grid/list view toggle (`icon-boxView` / `icon-listView`).
Right: `Sort by:` with current value **`relevance`** (lowercase), then pagination `1 of 22`.

Header count reads `Products (524 Products)`.
**524 products across 22 pages ≈ 24 per page.**

---

## 4. Where your build differs

Your [theme.ts](buy-hive/src/theme.ts) already has `#00b2c9` and `#29b574` correct.
Remaining mismatches:

| Thing | Real site | Yours |
| --- | --- | --- |
| dark / body text | `#231f20` | `#080b12` |
| smoke background | `#f2f2f2` | `#f1f1f1`, `#f4f4f4` |
| Location section label | "Manufacturer Location" | "Supplier Location" |
| Stock checkbox label | "In USA" | "Stock in USA" |
| Checkbox checked color | `#005cc8` | MUI primary (teal) |
| Page size | ~24 | 12 (backend `DEFAULT_LIMIT`) |
| Grid columns | 2, `lg:`3 | check `ProductGrid` |
| Card price | `font-weight:600`, `letter-spacing:-.05em` | verify |

Your `borderRadius: 4` matches the card (`.25rem`), but note that **inputs are fully
rounded** (`9999px`), not 4px — that's a per-component override, not a theme value.

---

## 5. Limits — read before trusting this

- **I could not see the page.** No screenshot or rendered view was available to me, so
  this is derived from DOM + CSS, not from looking at it. Verify against the live page
  before calling anything pixel perfect.
- **`app.css` is ~3 MB.** I extracted the rules for the classes actually present on this
  page. Hover/focus/transition states and anything applied by JS at runtime may be missing.
- **`product.css` is for the product *detail* page**, not search — it contains nothing
  useful here despite the name.
- **`Avenir LT Pro` is a commercial licensed font.** You cannot self-host it without a
  license. Close free substitutes: Nunito Sans, Montserrat, or system `ui-sans-serif`.
  Metrics will differ, so spacing will need adjusting.
- **You are on MUI, they are on Tailwind.** Values transfer; class names do not.
- The 524-product count and the specific products listed are live data and will drift.
