// Helpers that turn raw valorant-api.com payloads into the grouped, filtered
// shapes the UI renders. Kept in one place so the navbar and the pages always
// agree on what counts as a map, a weapon category, or an agent role.

const pluralize = (word) => (word.endsWith("s") ? word : `${word}s`);

const byName = (a, b) => a.displayName.localeCompare(b.displayName);

// Shop column order. Anything the API adds that isn't listed here still shows
// up, appended after the known categories.
const WEAPON_CATEGORY_ORDER = [
  "Sidearms",
  "SMGs",
  "Shotguns",
  "Assault Rifles",
  "Sniper Rifles",
  "Heavy Weapons",
];

// Groups agents under their role, e.g. "Controller" -> "Controllers".
// Roles are alphabetical, so a brand new role slots itself in.
export function groupAgentsByRole(agents = []) {
  const groups = new Map();

  agents.forEach((agent) => {
    const role = agent.role?.displayName;
    if (!role) return;

    if (!groups.has(role)) groups.set(role, []);
    groups.get(role).push(agent);
  });

  return [...groups.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([role, roleAgents]) => ({
      key: role,
      title: pluralize(role),
      items: [...roleAgents].sort(byName),
    }));
}

// Groups weapons by their shop category. Melee has no shopData at all, so it
// falls back to its equippable category and lands at the end of the list.
export function groupWeaponsByCategory(weapons = []) {
  const groups = new Map();

  weapons.forEach((weapon) => {
    const category =
      weapon.shopData?.categoryText ||
      weapon.category?.split("::").pop() ||
      "Other";

    if (!groups.has(category)) groups.set(category, []);
    groups.get(category).push(weapon);
  });

  const rank = (category) => {
    const index = WEAPON_CATEGORY_ORDER.indexOf(category);
    return index === -1 ? WEAPON_CATEGORY_ORDER.length : index;
  };

  return [...groups.entries()]
    .sort(([a], [b]) => rank(a) - rank(b) || a.localeCompare(b))
    .map(([category, categoryWeapons]) => ({
      key: category,
      title: category,
      // Cheapest first, mirroring the in-game buy menu.
      items: [...categoryWeapons].sort(
        (a, b) => (a.shopData?.cost ?? 0) - (b.shopData?.cost ?? 0)
      ),
    }));
}

// The /maps endpoint also returns the shooting range, tutorial and deathmatch
// arenas, and ships "The Range" twice. Only standard maps carry a tactical
// description ("A/B Sites"), which is what we filter on.
export function playableMaps(gameMaps = []) {
  const seen = new Set();

  return gameMaps
    .filter((map) => {
      if (!map.tacticalDescription || !map.displayName) return false;
      if (seen.has(map.displayName)) return false;

      seen.add(map.displayName);
      return true;
    })
    .sort(byName);
}

// "The Range" -> "the-range", used for /maps#<slug> anchors.
export const mapSlug = (displayName = "") =>
  displayName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// Callouts carry game-world coordinates; each map ships the transform that
// projects them onto its minimap image (displayIcon). Note the axes swap: the
// game's y feeds the image's x. Returns fractions of the image, 0-1.
export function calloutPosition(map, callout) {
  const { x, y } = callout.location;

  return {
    left: y * map.xMultiplier + map.xScalarToAdd,
    top: x * map.yMultiplier + map.yScalarToAdd,
  };
}

// Callouts grouped by their super-region (A, B, Mid, Attacker Side...), which
// is how players actually talk about a map.
export function calloutsBySide(map) {
  const groups = new Map();

  (map?.callouts || []).forEach((callout) => {
    const side = callout.superRegionName || "Other";
    if (!groups.has(side)) groups.set(side, []);
    groups.get(side).push(callout);
  });

  return [...groups.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([side, items]) => ({
      key: side,
      title: side,
      items: items.sort((a, b) => a.regionName.localeCompare(b.regionName)),
    }));
}

// A line-up position may be given either as a fraction of the minimap
// ({ x, y }) or as the name of a callout on that map ("B Main"), which is far
// easier to write and is already the vocabulary the titles use. Returns null
// when it cannot be resolved, so the marker is simply omitted.
export function resolvePoint(map, value) {
  if (!value || !map) return null;

  // Both axes must be real numbers. A partially written position - which a
  // divide-by-zero can produce before the map image has laid out - would
  // otherwise reach the renderer and crash it.
  if (typeof value === "object") {
    return Number.isFinite(value.x) && Number.isFinite(value.y)
      ? { left: value.x, top: value.y }
      : null;
  }

  if (typeof value !== "string") return null;

  const wanted = value.trim().toLowerCase();
  const callout = (map.callouts || []).find((c) => {
    const region = c.regionName?.toLowerCase();
    const full = `${c.superRegionName} ${c.regionName}`.toLowerCase();
    return region === wanted || full === wanted;
  });

  return callout ? calloutPosition(map, callout) : null;
}
