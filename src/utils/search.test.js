import { searchAll, countResults } from "./search";

const agents = [
  { uuid: "a1", displayName: "Jett", role: { displayName: "Duelist" } },
  { uuid: "a2", displayName: "Cypher", role: { displayName: "Sentinel" } },
];

const gameMaps = [
  { uuid: "m1", displayName: "Ascent", tacticalDescription: "A/B Sites" },
  // No tacticalDescription, so not a playable map.
  { uuid: "m2", displayName: "The Range", tacticalDescription: null },
];

const weapons = [
  {
    uuid: "w1",
    displayName: "Vandal",
    shopData: { categoryText: "Assault Rifles" },
    skins: [
      { uuid: "s1", displayName: "Glitchpop Vandal", themeUuid: "t1" },
      { uuid: "s2", displayName: "Prime Vandal", themeUuid: "t2" },
    ],
  },
  { uuid: "w2", displayName: "Ghost", shopData: { categoryText: "Sidearms" }, skins: [] },
];

const themes = [
  { uuid: "t1", displayName: "Glitchpop" },
  { uuid: "t2", displayName: "Prime" },
];
const bundles = [{ uuid: "b1", displayName: "Glitchpop", displayIcon: "art" }];

const sources = { agents, gameMaps, weapons, themes, bundles };
const find = (groups, name) => groups.find((g) => g.name === name);

test("ignores queries shorter than two characters", () => {
  expect(searchAll(sources, "v")).toEqual([]);
  expect(searchAll(sources, " ")).toEqual([]);
});

test("finds across every source at once", () => {
  const groups = searchAll(sources, "vandal");
  // Ordering is asserted separately; this is about reach.
  expect(groups.map((g) => g.name).sort()).toEqual([
    "Bundles",
    "Skins",
    "Weapons",
  ]);
  expect(find(groups, "Weapons").items[0].label).toBe("Vandal");
  expect(find(groups, "Skins").total).toBe(2);
});

test("an exact name outranks a skin that merely contains it", () => {
  const groups = searchAll(sources, "vandal");
  // Weapons comes before Skins in the group order, and the weapon itself is
  // an exact match rather than a substring one.
  expect(groups[0].name).toBe("Weapons");
  expect(find(groups, "Weapons").items[0].label).toBe("Vandal");
});

test("equally-ranked matches fall back to alphabetical order", () => {
  // Both skins merely contain "vandal", so neither outranks the other.
  const groups = searchAll(sources, "vandal");
  expect(find(groups, "Skins").items.map((i) => i.label)).toEqual([
    "Glitchpop Vandal",
    "Prime Vandal",
  ]);
});

test("a prefix beats a substring", () => {
  const groups = searchAll(sources, "glitchpop");
  expect(find(groups, "Skins").items[0].label).toBe("Glitchpop Vandal");
});

test("secondary text matches without outranking names", () => {
  const groups = searchAll(sources, "sentinel");
  expect(find(groups, "Agents").items[0].label).toBe("Cypher");
});

test("non-playable maps are excluded", () => {
  expect(searchAll(sources, "range")).toEqual([]);
  expect(find(searchAll(sources, "ascent"), "Maps").items[0].label).toBe("Ascent");
});

test("bundles only appear once their metadata has loaded", () => {
  const without = searchAll({ ...sources, themes: [], bundles: [] }, "glitchpop");
  expect(find(without, "Bundles")).toBeUndefined();
  expect(find(searchAll(sources, "glitchpop"), "Bundles").items[0].label).toBe(
    "Glitchpop"
  );
});

test("limitPerGroup caps items but total still reports the full count", () => {
  const groups = searchAll(sources, "vandal", { limitPerGroup: 1 });
  const skins = find(groups, "Skins");
  expect(skins.items).toHaveLength(1);
  expect(skins.total).toBe(2);
});

test("countResults sums the untruncated totals", () => {
  // 1 weapon + 2 skins + both bundles, which each list a Vandal.
  const capped = searchAll(sources, "vandal", { limitPerGroup: 1 });
  expect(capped.every((g) => g.items.length <= 1)).toBe(true);
  expect(countResults(capped)).toBe(5);
});

test("tolerates missing sources", () => {
  expect(searchAll({}, "vandal")).toEqual([]);
});

describe("group ordering", () => {
  test("name matches outrank groups that only match secondary text", () => {
    // Every fixture bundle lists a Vandal in its weapons, but only as keywords;
    // the weapon and its skins match by name, so they lead.
    const groups = searchAll(sources, "vandal");
    expect(groups.map((g) => g.name)).toEqual(["Weapons", "Skins", "Bundles"]);
  });

  test("otherwise the canonical group order holds", () => {
    const groups = searchAll(sources, "glitchpop");
    // Bundle name and skin name both match as a prefix, so order decides.
    expect(groups.map((g) => g.name)).toEqual(["Bundles", "Skins"]);
  });
});
