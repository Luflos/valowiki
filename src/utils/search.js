// Global search across everything the app knows about.
//
// Sources differ in shape and in where they come from - agents, maps and
// weapons are fetched app-wide; skins ride along inside the weapons payload;
// bundles need the lazily-fetched theme metadata; line ups are a local file -
// so each is normalised into the same result shape before ranking.

import { buildBundles } from "./bundles";
import { playableMaps } from "./valorant";
import { LINEUPS, LINEUP_AGENTS } from "../data/lineups";

export const GROUP_ORDER = [
  "Agents",
  "Maps",
  "Weapons",
  "Bundles",
  "Skins",
  "Line ups",
];

// Exact beats prefix beats substring, so typing "vandal" puts the Vandal above
// "Glitchpop Vandal". 0 means no match.
function score(text, query) {
  if (!text) return 0;

  const value = text.toLowerCase();
  if (value === query) return 3;
  if (value.startsWith(query)) return 2;
  if (value.includes(query)) return 1;

  return 0;
}

// Matches the main label, or falls back to secondary text at a lower weight so
// "sentinel" finds Cypher without outranking a name match.
function rank(item, query) {
  const direct = score(item.label, query);
  if (direct) return direct * 10;

  return score(item.keywords, query);
}

export function searchAll(
  { agents = [], gameMaps = [], weapons = [], themes = [], bundles = [] },
  rawQuery,
  { limitPerGroup = Infinity } = {}
) {
  const query = rawQuery.trim().toLowerCase();
  if (query.length < 2) return [];

  const groups = new Map(GROUP_ORDER.map((name) => [name, []]));
  const add = (group, item) => groups.get(group).push(item);

  agents.forEach((agent) => {
    add("Agents", {
      id: agent.uuid,
      label: agent.displayName,
      sub: agent.role?.displayName,
      keywords: agent.role?.displayName,
      to: `/agents/${agent.uuid}`,
      image: agent.displayIconSmall,
    });
  });

  playableMaps(gameMaps).forEach((map) => {
    add("Maps", {
      id: map.uuid,
      label: map.displayName,
      sub: map.tacticalDescription,
      to: `/maps/${map.uuid}`,
      image: map.splash,
    });
  });

  weapons.forEach((weapon) => {
    add("Weapons", {
      id: weapon.uuid,
      label: weapon.displayName,
      sub: weapon.shopData?.categoryText,
      keywords: weapon.shopData?.categoryText,
      to: `/weapons/${weapon.uuid}`,
      image: weapon.displayIcon,
    });

    // Skins are the biggest source by far - around 1400 of them.
    (weapon.skins || []).forEach((skin) => {
      add("Skins", {
        id: skin.uuid,
        label: skin.displayName,
        sub: weapon.displayName,
        keywords: weapon.displayName,
        to: `/weapons/${weapon.uuid}`,
        image: skin.chromas?.[0]?.fullRender || skin.displayIcon,
      });
    });
  });

  // Only available once the bundle metadata has been fetched.
  buildBundles({ weapons, themes, bundles }).forEach((bundle) => {
    add("Bundles", {
      id: bundle.key,
      label: bundle.name,
      sub: `${bundle.items.length} skins`,
      keywords: bundle.weaponsLabel,
      to: `/bundles/${bundle.key}`,
      image: bundle.art,
    });
  });

  LINEUPS.forEach((lineup) => {
    const agent = LINEUP_AGENTS.find((a) => a.slug === lineup.agent);

    add("Line ups", {
      id: lineup.id,
      label: lineup.title || `${agent?.name ?? "Line up"}`,
      sub: [agent?.name, lineup.map].filter(Boolean).join(" · "),
      keywords: [agent?.name, lineup.map, lineup.ability].filter(Boolean).join(" "),
      to: `/lineups/${lineup.agent}`,
    });
  });

  return GROUP_ORDER.map((name, order) => {
    const scored = groups
      .get(name)
      .map((item) => ({ item, weight: rank(item, query) }))
      .filter((entry) => entry.weight > 0)
      .sort(
        (a, b) =>
          b.weight - a.weight || a.item.label.localeCompare(b.item.label)
      );

    return {
      name,
      order,
      // How well the group's best item matched, used to order the groups.
      best: scored[0]?.weight ?? 0,
      total: scored.length,
      items: scored.slice(0, limitPerGroup).map((entry) => entry.item),
    };
  })
    .filter((group) => group.total > 0)
    // Groups whose items match by name come before groups that only matched on
    // secondary text. Searching "vandal" should lead with the weapon and its
    // skins, not the hundred bundles that merely include a Vandal.
    .sort((a, b) => b.best - a.best || a.order - b.order)
    .map(({ order, best, ...group }) => group);
}

export const countResults = (groups) =>
  groups.reduce((sum, group) => sum + group.total, 0);
