// Line-up catalogue, organised agent x map.
//
// The unit a player thinks in is "I am Sova on Ascent" - not "Sova", and not
// "Ascent" - so that pair is what the pages are built around.
//
// Only `id`, `agent` and `map` are required. Everything else renders when it
// is filled in and is simply absent when it is not, so an entry is useful the
// moment you know its video id and improves as you document it.
// `npm run lineups:gaps` prints what is still blank.
//
// The teaching fields are the point of the site - they are what the big
// line-up databases leave out:
//
//   denies    what this takes from the enemy, or gives your team
//   when      the moment in the round it is worth spending
//   beatenBy  how a good opponent answers it
//   priority  1, 2, 3 - the order a new player should learn them in
//   images    stand / aim / result screenshots, which beat video for studying
//   from/to   where you stand and where it lands. Either a callout name on
//             that map ("A Main") - the same vocabulary the titles use - or
//             { x, y } as a fraction of the minimap. In development, "Place"
//             on an agent x map page turns a click into those coordinates.
//
// To fill titles in automatically from YouTube, run:
//   node scripts/fetch-lineup-titles.mjs

import { asset } from "../utils/asset.js";

export const LINEUP_AGENTS = [
  {
    slug: "sova",
    name: "Sova",
    role: "Initiator",
    banner: asset("images/sovapic.jpeg"),
    blurb:
      "Recon Bolts and Shock Darts that clear a site before your team steps onto it.",
  },
  {
    slug: "cypher",
    name: "Cypher",
    role: "Sentinel",
    banner: asset("images/cypher.jpeg"),
    blurb:
      "Cages and trapwires that lock down flanks and buy your team information.",
  },
];

// "How am I useful on this map?" - the question the line ups are evidence for.
// One entry per agent x map; blank strings render as "not written yet".
export const MAP_ROLES = [
  { agent: "sova", map: "Ascent", attack: "", defence: "" },
  { agent: "sova", map: "Haven", attack: "", defence: "" },
  { agent: "cypher", map: "Split", attack: "", defence: "" },
  { agent: "cypher", map: "Bind", attack: "", defence: "" },
  { agent: "cypher", map: "Fracture", attack: "", defence: "" },
];

// A worked example of a filled-in entry. Nothing here is live - it shows the
// shape, and what the teaching fields are for. The tactical claims are yours to
// write; the site is only worth more than a video list if they are right.
//
//   {
//     id: "youtubeId",
//     agent: "sova",
//     map: "Ascent",
//     title: "A Main to A Site",
//     ability: "Recon Bolt",
//     side: "Attack",          // or "Defence"
//     from: "A Main",               // a callout name, or { x: 0.42, y: 0.78 }
//     to:   "A Site",               // where it lands (optional)
//     difficulty: "Easy",      // Easy | Medium | Hard
//     priority: 1,             // 1 = teach this one first
//
//     denies:   "Clears the two most common A Site hiding spots before your
//                team walks in, so the entry fragger knows where to look.",
//     when:     "Right after the round starts, before anyone commits to A.",
//     beatenBy: "It can be shot down - a defender watching the bolt will
//                destroy it before the second scan.",
//
//     images: {
//       stand:  asset("images/lineups/sova-ascent-a-stand.jpg"),
//       aim:    asset("images/lineups/sova-ascent-a-aim.jpg"),
//       result: asset("images/lineups/sova-ascent-a-result.jpg"),
//     },
//   }
//
export const LINEUPS = [
  // --- Sova · Ascent --------------------------------------------------------
  // The positions below are read off the titles ("CT to Boat" -> defender
  // spawn to Boat House) and land on the callout's centre, which is close but
  // not the exact spot you stand. Correct them with "Place" in development.
  { id: "Dm_AnZbeamE", agent: "sova", map: "Ascent", title: "B Stairs To Mid" },
  { id: "7lR2_FfKqUk", agent: "sova", map: "Ascent", title: "Hell to Heaven" },
  {
    id: "RCdzMhXYvn8",
    agent: "sova",
    map: "Ascent",
    title: "CT to Boat",
    side: "Defence",
    from: "Defender Side Spawn",
    to: "B Boat House",
  },
  {
    id: "Csqb_JKoOwo",
    agent: "sova",
    map: "Ascent",
    title: "CT Spawn to A",
    side: "Defence",
    from: "Defender Side Spawn",
    to: "A Site",
  },

  // --- Sova · Haven ---------------------------------------------------------
  {
    id: "TR_OlrD8e_4",
    agent: "sova",
    map: "Haven",
    title: "Garage Recon",
    ability: "Recon Bolt",
  },
  {
    id: "K9p7Hu9zSWU",
    agent: "sova",
    map: "Haven",
    title: "T Spawn To Garage",
    side: "Attack",
    from: "Attacker Side Spawn",
    to: "Garage",
  },
  { id: "bY5wwODz3S4", agent: "sova", map: "Haven", title: "C Main to C Site" },
  { id: "ENo5rg6PLmg", agent: "sova", map: "Haven", title: "B Link to A" },

  // --- Cypher · Split -------------------------------------------------------
  { id: "_kgwebcpdxw", agent: "cypher", map: "Split", title: "B Setup" },
  { id: "FCCmm8oKYWg", agent: "cypher", map: "Split", title: "A Setup" },

  // --- Cypher · Bind --------------------------------------------------------
  { id: "k4vnsdNBEu8", agent: "cypher", map: "Bind", title: "B Setup" },
  { id: "jHMsLL9HgOY", agent: "cypher", map: "Bind", title: "A Setup" },

  // --- Cypher · Fracture ----------------------------------------------------
  { id: "TFteb9A_63c", agent: "cypher", map: "Fracture", title: "B Setup" },
  { id: "4xppZMixd0s", agent: "cypher", map: "Fracture", title: "A Setup" },
];

// Standalone gameplay clips - same card treatment, no agent grouping.
export const GAMEPLAY = [
  { id: "M7D_XBjGw3E", title: "Justin's 1v5 ACE" },
  { id: "WakR802RZcI", title: "Gameplay #1" },
  { id: "HQjIVPSG4Nw", title: "Gameplay #2" },
  { id: "yRKr-0ZWobY", title: "Gameplay #3" },
];

export const getAgent = (slug) =>
  LINEUP_AGENTS.find((agent) => agent.slug === slug);

export const lineupsFor = (slug) =>
  LINEUPS.filter((lineup) => lineup.agent === slug);

// Maps an agent has line ups for, each with its count, in alphabetical order.
export function mapsFor(slug) {
  const counts = new Map();

  lineupsFor(slug).forEach((lineup) => {
    counts.set(lineup.map, (counts.get(lineup.map) || 0) + 1);
  });

  return [...counts.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([map, count]) => ({ map, count }));
}

export const SIDES = ["Attack", "Defence"];

// The agent x map page: line ups in the order a new player should learn them,
// with anything unprioritised after the ordered ones. `side` narrows to attack
// or defence; entries with no side recorded are kept, since hiding them would
// make an undocumented line up look like it does not exist.
export function lineupsOn(slug, map, side = null) {
  return lineupsFor(slug)
    .filter((lineup) => lineup.map?.toLowerCase() === String(map).toLowerCase())
    .filter((lineup) => !side || !lineup.side || lineup.side === side)
    .sort((a, b) => {
      const order = (l) => (typeof l.priority === "number" ? l.priority : Infinity);
      return order(a) - order(b) || (a.title || "").localeCompare(b.title || "");
    });
}

// Agents that have line ups on a given map, for the picker.
export function agentsOn(map) {
  const slugs = new Set(
    LINEUPS.filter(
      (l) => l.map?.toLowerCase() === String(map).toLowerCase()
    ).map((l) => l.agent)
  );

  return LINEUP_AGENTS.filter((agent) => slugs.has(agent.slug));
}

// Every map any agent has line ups on.
export const allLineupMaps = () =>
  [...new Set(LINEUPS.map((l) => l.map).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b)
  );

export const hasPosition = (lineup) =>
  Boolean(lineup.from && typeof lineup.from.x === "number");

export const roleOn = (slug, map) =>
  MAP_ROLES.find(
    (entry) =>
      entry.agent === slug &&
      entry.map.toLowerCase() === String(map).toLowerCase()
  ) || null;

// Which teaching fields an entry is still missing - drives the gaps script and
// the "help finish this" note on the page.
export const TEACHING_FIELDS = ["ability", "side", "difficulty", "from", "denies", "when", "beatenBy"];

export const missingFields = (lineup) =>
  TEACHING_FIELDS.filter((field) => {
    const value = lineup[field];
    return value === undefined || value === null || value === "";
  });

// hqdefault exists for every public video; maxres does not.
export const thumbnailFor = (id) =>
  `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

export const watchUrl = (id) => `https://www.youtube.com/watch?v=${id}`;

// Maps present in a set of line ups, for the filter chips.
export const mapsIn = (lineups) =>
  [...new Set(lineups.map((l) => l.map).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b)
  );
