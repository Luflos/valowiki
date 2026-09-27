#!/usr/bin/env node
// Fills in `title` (and `map`, where the title carries one) for every entry in
// src/data/lineups.js that doesn't have one, using YouTube's public oEmbed
// endpoint (no API key needed).
//
// Titles follow the pattern "Sova CT to Boat [ASCENT]", so the trailing
// [BRACKET] becomes the map - validated against the live map list, so a typo
// never turns into a bogus filter chip.
//
//   node scripts/fetch-lineup-titles.mjs          # dry run, prints findings
//   node scripts/fetch-lineup-titles.mjs --write  # rewrites the data file
//
// Videos that are private or deleted are reported and left untouched.

import { readFile, writeFile } from "node:fs/promises";

const DATA = new URL("../src/data/lineups.js", import.meta.url);
const write = process.argv.includes("--write");
const UA = "Mozilla/5.0 (compatible; valowiki-title-fetcher)";

const source = await readFile(DATA, "utf8");

// Every video id in the file, in order.
const ids = [...source.matchAll(/id:\s*"([^"]+)"/g)].map((m) => m[1]);
if (ids.length === 0) {
  console.error("No video ids found in src/data/lineups.js");
  process.exit(1);
}

// Real map names, so a bracket that isn't a map is left alone.
const knownMaps = await (async () => {
  try {
    const response = await fetch("https://valorant-api.com/v1/maps");
    const { data } = await response.json();
    return new Map(
      data
        .filter((m) => m.tacticalDescription && m.displayName)
        .map((m) => [m.displayName.toLowerCase(), m.displayName])
    );
  } catch {
    console.warn("Could not reach the maps API; skipping map detection.");
    return new Map();
  }
})();

// "Sova CT to Boat [ASCENT]" -> { title: "CT to Boat", map: "Ascent" }
const parse = (raw, agentName) => {
  let title = raw.trim();
  let map = null;

  const bracket = title.match(/\s*\[([^\]]+)\]\s*$/);
  if (bracket) {
    const candidate = knownMaps.get(bracket[1].trim().toLowerCase());
    if (candidate) {
      map = candidate;
      title = title.slice(0, bracket.index).trim();
    }
  }

  // Drop a leading agent name; the page already says whose line ups these are.
  if (agentName) {
    const prefix = new RegExp(`^${agentName}\\s+`, "i");
    title = title.replace(prefix, "").trim();
  }

  return { title: title || raw.trim(), map };
};

const titleFor = async (id) => {
  const url = `https://www.youtube.com/oembed?url=${encodeURIComponent(
    `https://www.youtube.com/watch?v=${id}`
  )}&format=json`;

  const response = await fetch(url, { headers: { "User-Agent": UA } });
  if (!response.ok) return null;

  const { title } = await response.json();
  return title;
};

let updated = source;
const unavailable = [];
let found = 0;

for (const id of ids) {
  // Leave entries that already carry a title alone.
  const entry = new RegExp(`\\{[^{}]*id:\\s*"${id}"[^{}]*\\}`, "s");
  const match = updated.match(entry);
  if (match && /title:/.test(match[0])) continue;

  let raw = null;
  try {
    raw = await titleFor(id);
  } catch {
    raw = null;
  }

  if (!raw) {
    unavailable.push(id);
    continue;
  }

  // The agent slug lives in the same entry; use it to strip the name prefix.
  const agentSlug = match?.[0].match(/agent:\s*"([^"]+)"/)?.[1];
  const agentName = agentSlug
    ? agentSlug[0].toUpperCase() + agentSlug.slice(1)
    : null;

  const { title, map } = parse(raw, agentName);

  found += 1;
  console.log(`  ${id}  ${title}${map ? `  [${map}]` : ""}`);

  if (match) {
    // Insert the fields right after the id, preserving the entry's shape.
    const fields =
      `id: "${id}", title: ${JSON.stringify(title)}` +
      (map ? `, map: ${JSON.stringify(map)}` : "");
    updated = updated.replace(match[0], match[0].replace(`id: "${id}"`, fields));
  }

  // Be polite to the endpoint.
  await new Promise((resolve) => setTimeout(resolve, 400));
}

console.log(`\n${found} title(s) found, ${unavailable.length} unavailable.`);
if (unavailable.length) {
  console.log("Private or deleted (check these on the channel):");
  unavailable.forEach((id) => console.log(`  https://youtu.be/${id}`));
}

if (!write) {
  console.log("\nDry run. Re-run with --write to update src/data/lineups.js.");
} else if (found > 0) {
  await writeFile(DATA, updated, "utf8");
  console.log("\nsrc/data/lineups.js updated.");
} else {
  console.log("\nNothing to write.");
}
