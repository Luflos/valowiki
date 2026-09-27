# ValoREF

A Valorant companion app for players who want to learn their agents and improve their game. Agents, maps and weapons are pulled live from the [Valorant API](https://dash.valorant-api.com/), so the roster never goes stale — new agents and maps appear automatically as Riot ships them.

Built with React and React Router. No backend.

> **Not affiliated with Riot Games.** All characters, art and assets belong to Riot Games.

---

## Screenshots

### Search
One box over everything - agents, maps, weapons, skins, bundles and line ups -
with a preview as you type and a full results page.

| As you type | Full results |
|---|---|
| ![Search dropdown grouped into bundles and skins](./docs/screenshots/search-dropdown.jpg) | ![Search results page grouped by type](./docs/screenshots/search-results.jpg) |

### Home
![Home page with a video hero and cards linking to agents, maps and weapons](./docs/screenshots/home.jpg)

### Agents
Live search and role filters over the full roster. Counts update as Riot adds agents.

![Agents listing with a search box, role filter chips and a grid of agent cards](./docs/screenshots/agents.jpg)

| Filtered to duelists | Agent detail |
|---|---|
| ![Agents grid filtered to the eight duelists](./docs/screenshots/agents-filtered.jpg) | ![Jett's page with role badge, portrait and ability cards](./docs/screenshots/agent-detail.jpg) |

### Maps
![Maps page with a card per map in the standard rotation](./docs/screenshots/maps.jpg)

Every callout plotted on the minimap, from the coordinate transform the API ships per map:

![Ascent minimap with all 22 callouts plotted and an index grouped by side](./docs/screenshots/map-callouts.jpg)

### Weapons
| Listing | Detail |
|---|---|
| ![Weapons grouped by shop category with prices in creds](./docs/screenshots/weapons.jpg) | ![Vandal page with a uniform art box and a stat strip](./docs/screenshots/weapon-detail.jpg) |

![The Classic's skin grid, 24 at a time with a Load more button](./docs/screenshots/weapon-skins.jpg)

### Weapon comparison
Shots and time to kill computed from the game's damage tables, for any two weapons.

![Comparison table showing damage, shots and time to kill by range](./docs/screenshots/compare.jpg)

The falloff chart makes the Vandal/Phantom tradeoff visible - the Phantom steps down at 20 m, the Vandal holds flat:

![Damage falloff chart with a flat Vandal line and a stepped Phantom line](./docs/screenshots/compare-chart.jpg)

### Skin bundles
Skins grouped into the collections they shipped in. Filter by weapon or rarity
tier, sort, and page through 24 at a time.

| Collections | Inside one |
|---|---|
| ![Grid of skin bundles with promo art and skin counts](./docs/screenshots/bundles.jpg) | ![The Glitchpop bundle with its five skins and Exclusive Edition tiers](./docs/screenshots/bundle-detail.jpg) |

### Line ups
Organised agent x map - "I am Sova on Ascent" - with a side filter, an agent
picker and the map schematic, leading with what your job is there.

| Pick a map | Agent x map |
|---|---|
| ![Sova's page listing the maps he has line ups for](./docs/screenshots/lineups.jpg) | ![Sova on Ascent with the map schematic, a selected pin and its throw line](./docs/screenshots/lineup-agent-map.jpg) |

### Loading and failure
The listing pages show skeletons while the API is in flight, and a retryable error if it fails - never an empty grid claiming there are no results.

| Loading | API unavailable |
|---|---|
| ![Skeleton placeholder cards while agent data loads](./docs/screenshots/loading-state.jpg) | ![An error panel reading "Couldn't load agents" with a Try again button](./docs/screenshots/error-state.jpg) |

### Mobile
The sidebar collapses to a drawer below 900px.

| Navigation | Agents | Weapon detail |
|---|---|---|
| ![Mobile navigation drawer open](./docs/screenshots/mobile-nav.jpg) | ![Agents page at phone width](./docs/screenshots/mobile-agents.jpg) | ![Weapon detail at phone width with a two-column stat grid](./docs/screenshots/mobile-weapon.jpg) |

<details>
<summary>More screens</summary>

### Team
![Team page with a card per contributor](./docs/screenshots/team.jpg)

### Gameplay
![Gameplay clips in the same thumbnail gallery](./docs/screenshots/gameplay.jpg)

### Not found
![404 page with a Jett animation and a link home](./docs/screenshots/not-found.jpg)

</details>

---

## Running locally

Requires Node 18 or newer (verified on Node 26).

```bash
git clone https://github.com/br1anlee/valowiki.git
cd valowiki   # the repository is still named valowiki
npm install
npm start
```

The app runs at `http://localhost:3000`. No API key or `.env` is needed — the Valorant API is public and unauthenticated.

### Scripts

| Command | What it does |
|---|---|
| `npm start` | Dev server with hot reload |
| `npm run build` | Production build into `build/` |
| `npm test` | Unit tests for the data and ballistics helpers |
| `npm run lineups:titles` | Pull real line-up titles from YouTube (see below) |
| `npm run lineups:gaps` | Report which line ups are still undocumented |

---

## Routes

| URL | Description |
|---|---|
| `/` | Home |
| `/search?q=` | Global search across every source |
| `/agents` | All agents, searchable and filterable by role |
| `/agents/:id` | Agent detail with abilities |
| `/maps` | Maps in the standard rotation |
| `/maps/:id` | Minimap with every callout plotted |
| `/weapons` | Weapons grouped by shop category |
| `/weapons/:id` | Weapon stats and skins |
| `/compare` | Shots and time to kill for any two weapons |
| `/bundles` | Skin collections, searchable by bundle or skin name |
| `/bundles/:id` | Every skin in one collection, with rarity tiers |
| `/lineups` | Line-up overview |
| `/lineups/:agent` | Which maps an agent has line ups for |
| `/lineups/:agent/:map` | Role brief plus that agent's line ups on that map |
| `/gameplay` | Gameplay clips |
| `/team` | About the team |
| `*` | 404 |

---

## Work in progress

The structure is built; the writing is not. Everything below is deliberately
incomplete rather than broken, and the gaps are visible in the app itself -
an undocumented line up says so rather than pretending.

Run `npm run lineups:gaps` for the current state. At the time of writing:

| | Done |
|---|---|
| Line-up explanations (`denies`, `when`, `beatenBy`) | 7 of 98 fields |
| Role briefs - "your job on attack / defence" | 0 of 10 |
| Line ups placed on the map | 3 of 14 |
| Stand / aim / result stills | 0 of 14 |
| Agents | 2 - Sova, Cypher |
| Maps | 5 - Ascent, Bind, Fracture, Haven, Split |

### What's planned

**Explain every line up, not just list it.** The reason a throw is worth
learning is the whole point of the site, and it is the thing the established
line-up databases leave out. This is the bulk of the remaining work.

**Write the role briefs.** "How am I useful on this map" is the question behind
"what are my line ups", and it is currently blank on every agent x map page.

**Stand / aim / result stills.** Easier to study than video - you can hold a
screenshot next to the game - and they do not break when a video goes private,
which has already happened once here.

**Rename the Cypher setups.** Six entries are called "A Setup" or "B Setup".
They are also camera and trapwire placements rather than thrown line ups, so
they may want their own template - what it watches, what it catches - instead of
one written for a projectile.

**More agents and maps, depth before breadth.** Four well-explained line ups
beat sixty listed ones for someone learning the game.

**A buy note per agent.** Newer players do not know when an Odin or an Ares is
the right save-round pick. That is round economy rather than line-up advice, so
it likely belongs beside the [weapon comparison](#weapon-comparison) rather than
inside a line up.

**Re-encode the hero clip.** It is 5.84 MB. It no longer blocks first paint -
a poster frame carries the render and the video loads on idle - but the bytes
are still there. Needs `ffmpeg`, which the repo does not assume:

```bash
ffmpeg -i src/components/video/home-bg.mp4 -vf scale=1280:-2 \
  -c:v libx264 -crf 30 -preset slow -an home-bg.mp4
```

### Who it is for

Newer players. The established tools assume you already know what a line up is,
which site you are hitting, and why you would spend the ability there. This one
should answer those before it shows you where to stand.

---

## How it works

### Everything is driven by the API

There are no hardcoded agent or weapon lists. [`src/utils/valorant.js`](./src/utils/valorant.js) turns raw API payloads into the shapes the UI renders, and both the sidebar and the listing pages read from it — so they can't drift out of sync.

Three things that endpoint needs handling for:

- **`/maps` returns more than the maps you play.** Deathmatch arenas, the tutorial and *two* "The Range" entries all come back. Only standard maps carry a `tacticalDescription`, which is what `playableMaps()` filters on.
- **Melee has no `shopData`.** It's the one weapon without a shop entry, so category grouping falls back to the equippable category and sorts it last.
- **`shopOrderPriority` is `0` for every weapon**, so it can't order the shop. Weapons sort by cost instead, which matches the in-game buy menu.

### Weapon comparison
Shots and time to kill computed from the game's damage tables, with a falloff chart.

![Weapon comparison showing shots and time to kill for two weapons side by side](./docs/screenshots/compare.jpg)

### Map callouts
Every callout plotted on the minimap from the coordinate transform the API ships per map.

![Ascent minimap with all callouts plotted and an index grouped by side](./docs/screenshots/map-callouts.jpg)

### Search ranks groups, not just rows

[`src/utils/search.js`](./src/utils/search.js) normalises six very differently
shaped sources into one result list, then ranks twice. Within a group an exact
name beats a prefix beats a substring, and a match on secondary text - an
agent's role, a bundle's weapon list - counts for less than a match on the name.

Groups are then ordered by how well their best row matched. Without that,
searching "vandal" led with the 104 bundles that merely *include* a Vandal
rather than the weapon itself and its 106 skins.

Bundle metadata is only fetched once someone types, so the search box costs
nothing on pages that never use it.

### Bundles are derived, not fetched

No endpoint lists a bundle's skins. Every skin does carry a `themeUuid`, though,
and a theme is the collection it shipped in - so
[`src/utils/bundles.js`](./src/utils/bundles.js) groups by theme and joins
`/v1/bundles` on by name for the promo art. That covers about 290 of 440
collections; the rest fall back to the theme icon or a skin render, so no card
is ever art-less.

Two wrinkles worth knowing:

- **`Standard` and `Random` are not bundles.** They are each weapon's default
  skin and the randomiser entry, and they are excluded.
- **Collections get re-released, and nothing is versioned.** Glitchpop shipped
  twice and Magepunk three times, and the API gives every edition the identical
  name in both endpoints. Same-named themes therefore take same-named bundles in
  order, so each edition gets its own art, and the cards are told apart by the
  weapons they cover rather than by an invented "2.0".

The skins themselves arrive inside the weapons payload the sidebar already
fetches, so only the theme, bundle and tier metadata (~0.4 MB) is requested, and
only when a bundle page is opened.

### Big grids are paged, and images announce themselves

Two grids are far larger than they look: 439 collections, and up to 200 skins on
a single weapon. Rendering either in full built a page tens of thousands of
pixels tall with hundreds of images in the document.

Both now render 24 at a time behind a "Load more", which took the bundle page
from 50,632px to 3,363px and the Classic's skin grid from 11,776px to 2,337px.
Bundles also default to collections of more than one skin - 178 of the 439 hold
a single one-off skin rather than the multi-weapon bundle people mean - and can
be filtered by weapon or tier, or sorted A to Z.

Art still comes from a CDN that averages ~600 ms an image, so
[`LazyImage`](./src/components/layout/LazyImage.jsx) pairs the browser's own
lazy loading with a shimmering frame and a fade-in. Lazy loading alone leaves a
scrolled grid looking like a wall of empty boxes; the placeholder is what makes
it read as loading rather than broken.

### Time to kill is computed, not looked up

[`src/utils/ballistics.js`](./src/utils/ballistics.js) derives shots and time to
kill from the API's own damage tables: per-pellet damage for shotguns, the band
that applies at a given range, and `(shots - 1) / fireRate` for the timing. It
makes the Vandal/Phantom tradeoff concrete - past 20 m the Phantom drops to 140
head damage and needs a second bullet through a full shield, while the Vandal
holds 160 at every range.

### Line ups are organised agent x map

The unit a player thinks in is "I am Sova on Ascent" - not "Sova", and not
"Ascent" - so that pair is the page. It opens with what your job is on that map
before any execution detail, because the question behind "what are my line ups"
is usually "how am I useful here".

Adding one is a single entry in [`src/data/lineups.js`](./src/data/lineups.js);
only `id`, `agent` and `map` are required:

```js
{ id: "TR_OlrD8e_4", agent: "sova", map: "Haven", title: "Garage Recon", ability: "Recon Bolt" }
```

**Positions** put a line up on the map schematic. Either name a callout - the
same vocabulary the titles already use - or give coordinates:

```js
{ from: "Defender Side Spawn", to: "B Boat House" }   // or { x: 0.42, y: 0.78 }
```

Callout names resolve against live map data, so the schematic is the game's own
minimap and callout list rather than hand-placed art. Line ups sharing a callout
are fanned out around it, since a callout resolves to a single point and their
pins would otherwise stack.

**Placing them is a pointing exercise, not a typing one.** `npm start` puts a
position editor on each agent x map page: pick a line up's `from` or `to`, click
the map, and the coordinate is written straight into
[`src/data/lineups.js`](./src/data/lineups.js) by the dev server. Hot reload
brings the pin back onto the map immediately.

The editor and the route it calls exist only under `react-scripts start` -
[`src/setupProxy.js`](./src/setupProxy.js) is never part of a build - so there
is nothing to reach on a deployed site.

**Teaching fields** are the point - a list of videos already exists elsewhere:

| Field | Answers |
|---|---|
| `denies` | what it takes from the enemy, or gives your team |
| `when` | the moment in the round it is worth spending |
| `beatenBy` | how a good opponent answers it |
| `priority` | the order a new player should learn them in |
| `images` | stand / aim / result stills, which beat video for studying |

Each renders only when filled in, so an entry is useful immediately and improves
as it is documented. `denies` is the exception: an entry without it says so,
because that field is the reason the page exists. To see what is still blank:

```bash
npm run lineups:gaps
```

To fill in titles automatically, make sure the videos are public and run:

```bash
npm run lineups:titles          # dry run, prints what it found
npm run lineups:titles -- --write
```

It reads each title from YouTube's public oEmbed endpoint (no API key) and
parses a trailing `[MAP]` tag - `Sova CT to Boat [ASCENT]` becomes
`title: "CT to Boat", map: "Ascent"`. Map names are validated against the live
map list, so a typo cannot create a bogus filter. Private or deleted videos are
reported and left untouched.

### Videos load as thumbnails, not players

No page mounts a YouTube iframe until you ask for one. A line up shows its
thumbnail and mounts a player only when opened; the gameplay gallery does the
same through a lightbox. Before this, eight embedded iframes pulled roughly
0.5 MB of YouTube payload before anyone pressed play.

---

## Project structure

```
src/
├── App.js                      # routes + the three API fetches
├── index.css                   # design tokens, reset, shared primitives
├── data/lineups.js             # line-up catalogue
├── utils/valorant.js           # API grouping, filtering, callout projection
├── utils/ballistics.js         # damage, shots and time to kill
├── utils/bundles.js            # skin-to-collection grouping
├── hooks/useBundleMeta.js      # lazily fetched theme/bundle/tier data
└── components/
    ├── layout/                 # Sidebar, Footer, LineupGallery + CSS
    └── pages/                  # one component per route
scripts/
├── fetch-lineup-titles.mjs     # populates line-up titles from YouTube
└── lineup-gaps.mjs             # reports undocumented line ups
src/setupProxy.js               # dev-only API behind the position editor
.github/workflows/
├── ci.yml                      # tests + build on every push and PR
└── deploy.yml                  # publishes to GitHub Pages
docs/screenshots/               # images used by this README
```

### Loading and failure

The three API requests are made once in [`App.js`](./src/App.js) and shared. While
they are in flight the listing pages render skeletons; if they fail, the page
shows a retryable error rather than an empty grid claiming "no results". Getting
this wrong is the difference between a site that looks broken and one that
explains itself.

The 5.8 MB hero clip is not fetched until the browser is idle - a 40 KB poster
frame carries first paint, and anyone who has asked for reduced motion keeps the
still. Shrinking the file itself is still [on the list](#work-in-progress).

### Styling

Plain CSS with custom properties. Tokens live at the top of [`src/index.css`](./src/index.css) — palette, spacing scale, radii, shadows, easing — alongside shared primitives (`.page`, `.card`, `.btn`, `.chip`, `.filter-bar`). Page-specific styles sit next to their components.

---

## Tech

- **React 18** with **React Router 6**
- **Axios** for API requests
- **react-player** for YouTube embeds
- **react-icons** for the team page
- **Create React App** (`react-scripts` 5)

## Resources

- [Valorant API](https://dash.valorant-api.com/) — agent, map and weapon data
- [Riot Games](https://playvalorant.com/) — all characters and assets
