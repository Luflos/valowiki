#!/usr/bin/env node
// Prints what is still undocumented in the line-up catalogue, grouped the way
// the site is: agent x map.
//
//   node scripts/lineup-gaps.mjs
//
// The teaching fields - why it works, when to use it, how it's beaten - are
// what separate this from a list of videos, so they are what this counts.

import {
  LINEUP_AGENTS,
  MAP_ROLES,
  mapsFor,
  lineupsOn,
  roleOn,
  missingFields,
  TEACHING_FIELDS,
} from "../src/data/lineups.js";

const bar = (done, total, width = 18) => {
  const filled = total === 0 ? 0 : Math.round((done / total) * width);
  return `[${"#".repeat(filled)}${".".repeat(width - filled)}]`;
};

let lineupTotal = 0;
let lineupDone = 0;
let roleTotal = 0;
let roleDone = 0;

for (const agent of LINEUP_AGENTS) {
  const maps = mapsFor(agent.slug);
  if (maps.length === 0) continue;

  console.log(`\n${agent.name}  (${agent.role})`);

  for (const { map } of maps) {
    const role = roleOn(agent.slug, map);
    const roleFields = ["attack", "defence"].filter((f) => !role?.[f]);
    roleTotal += 2;
    roleDone += 2 - roleFields.length;

    console.log(`\n  ${map}`);
    console.log(
      `    role brief: ${
        roleFields.length === 0 ? "done" : `missing ${roleFields.join(", ")}`
      }`
    );

    for (const lineup of lineupsOn(agent.slug, map)) {
      const gaps = missingFields(lineup);
      lineupTotal += TEACHING_FIELDS.length;
      lineupDone += TEACHING_FIELDS.length - gaps.length;

      const name = (lineup.title || lineup.id).padEnd(22);
      console.log(
        `    ${name} ${bar(TEACHING_FIELDS.length - gaps.length, TEACHING_FIELDS.length)}` +
          (gaps.length ? `  missing: ${gaps.join(", ")}` : "  complete")
      );
    }
  }
}

const pct = (done, total) => (total === 0 ? 100 : Math.round((done / total) * 100));

console.log(`\n${"-".repeat(60)}`);
console.log(`role briefs   ${bar(roleDone, roleTotal)}  ${pct(roleDone, roleTotal)}%  (${roleDone}/${roleTotal} fields)`);
console.log(`line up notes ${bar(lineupDone, lineupTotal)}  ${pct(lineupDone, lineupTotal)}%  (${lineupDone}/${lineupTotal} fields)`);

const missingRoles = MAP_ROLES.length - new Set(
  LINEUP_AGENTS.flatMap((a) => mapsFor(a.slug).map((m) => `${a.slug}|${m.map}`))
).size;
if (missingRoles < 0) {
  console.log(`\n${-missingRoles} agent x map pair(s) have line ups but no MAP_ROLES entry.`);
}
console.log("\nFill these in at src/data/lineups.js\n");
