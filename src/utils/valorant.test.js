import {
  groupAgentsByRole,
  groupWeaponsByCategory,
  playableMaps,
  mapSlug,
  calloutPosition,
  calloutsBySide,
  resolvePoint,
} from "./valorant";

const agent = (displayName, role) => ({
  uuid: displayName,
  displayName,
  role: role ? { displayName: role } : null,
});

const weapon = (displayName, categoryText, cost) => ({
  uuid: displayName,
  displayName,
  category: `EEquippableCategory::${displayName}`,
  shopData: categoryText === null ? null : { categoryText, cost },
});

describe("groupAgentsByRole", () => {
  const agents = [
    agent("Jett", "Duelist"),
    agent("Astra", "Controller"),
    agent("Iso", "Duelist"),
    agent("Omen", "Controller"),
  ];

  test("groups by role, pluralised, roles alphabetical", () => {
    expect(groupAgentsByRole(agents).map((g) => g.title)).toEqual([
      "Controllers",
      "Duelists",
    ]);
  });

  test("sorts agents alphabetically inside each role", () => {
    const duelists = groupAgentsByRole(agents).find(
      (g) => g.key === "Duelist"
    );
    expect(duelists.items.map((a) => a.displayName)).toEqual(["Iso", "Jett"]);
  });

  test("skips agents with no role and tolerates no input", () => {
    expect(groupAgentsByRole([agent("Nobody", null)])).toEqual([]);
    expect(groupAgentsByRole()).toEqual([]);
  });
});

describe("groupWeaponsByCategory", () => {
  const weapons = [
    weapon("Vandal", "Assault Rifles", 2900),
    weapon("Melee", null),
    weapon("Classic", "Sidearms", 0),
    weapon("Sheriff", "Sidearms", 800),
  ];

  test("orders categories by the shop layout, unknown ones last", () => {
    expect(groupWeaponsByCategory(weapons).map((g) => g.title)).toEqual([
      "Sidearms",
      "Assault Rifles",
      "Melee",
    ]);
  });

  test("sorts weapons cheapest first", () => {
    const sidearms = groupWeaponsByCategory(weapons)[0];
    expect(sidearms.items.map((w) => w.displayName)).toEqual([
      "Classic",
      "Sheriff",
    ]);
  });

  test("falls back to the equippable category when shopData is missing", () => {
    // Melee is the only weapon the API ships without shopData.
    const melee = groupWeaponsByCategory([weapon("Melee", null)]);
    expect(melee[0].key).toBe("Melee");
  });
});

describe("playableMaps", () => {
  // The API also returns deathmatch arenas, the tutorial and two "The Range"
  // entries; only standard maps carry a tacticalDescription.
  const maps = [
    { uuid: "1", displayName: "Ascent", tacticalDescription: "A/B Sites" },
    { uuid: "2", displayName: "The Range", tacticalDescription: null },
    { uuid: "3", displayName: "Abyss", tacticalDescription: "A/B Sites" },
    { uuid: "4", displayName: "Ascent", tacticalDescription: "A/B Sites" },
  ];

  test("keeps only standard maps, de-duplicated and sorted", () => {
    expect(playableMaps(maps).map((m) => m.displayName)).toEqual([
      "Abyss",
      "Ascent",
    ]);
  });

  test("tolerates no input", () => {
    expect(playableMaps()).toEqual([]);
  });
});

describe("mapSlug", () => {
  test("makes anchor-safe slugs", () => {
    expect(mapSlug("The Range")).toBe("the-range");
    expect(mapSlug("Split")).toBe("split");
    expect(mapSlug("")).toBe("");
  });
});

describe("calloutPosition", () => {
  // Ascent's real transform from the API.
  const ascent = {
    xMultiplier: 7e-5,
    yMultiplier: -7e-5,
    xScalarToAdd: 0.813895,
    yScalarToAdd: 0.573242,
  };

  test("projects game coordinates into 0-1 image space", () => {
    // A Site on Ascent.
    const { left, top } = calloutPosition(ascent, {
      location: { x: 6154, y: -6626 },
    });

    expect(left).toBeGreaterThan(0);
    expect(left).toBeLessThan(1);
    expect(top).toBeGreaterThan(0);
    expect(top).toBeLessThan(1);
  });

  test("the two spawns land at opposite ends of the map", () => {
    const attacker = calloutPosition(ascent, { location: { x: 60, y: 50 } });
    const defender = calloutPosition(ascent, {
      location: { x: 1982, y: -9738 },
    });

    expect(attacker.left).toBeGreaterThan(defender.left);
  });
});

describe("calloutsBySide", () => {
  const map = {
    callouts: [
      { regionName: "Main", superRegionName: "B" },
      { regionName: "Site", superRegionName: "A" },
      { regionName: "Lobby", superRegionName: "A" },
    ],
  };

  test("groups by super-region, alphabetically", () => {
    const groups = calloutsBySide(map);
    expect(groups.map((g) => g.title)).toEqual(["A", "B"]);
    expect(groups[0].items.map((c) => c.regionName)).toEqual(["Lobby", "Site"]);
  });

  test("tolerates a map with no callouts", () => {
    expect(calloutsBySide({})).toEqual([]);
    expect(calloutsBySide()).toEqual([]);
  });
});

describe("resolvePoint", () => {
  const map = {
    xMultiplier: 7e-5,
    yMultiplier: -7e-5,
    xScalarToAdd: 0.813895,
    yScalarToAdd: 0.573242,
    callouts: [
      { regionName: "Main", superRegionName: "A", location: { x: 5322, y: -4710 } },
      { regionName: "Site", superRegionName: "B", location: { x: 3000, y: -3000 } },
    ],
  };

  test("passes through explicit coordinates", () => {
    expect(resolvePoint(map, { x: 0.4, y: 0.8 })).toEqual({ left: 0.4, top: 0.8 });
  });

  test("resolves a callout by its region name", () => {
    const point = resolvePoint(map, "Main");
    expect(point.left).toBeGreaterThan(0);
    expect(point.left).toBeLessThan(1);
  });

  test("resolves a qualified callout, and ignores case", () => {
    expect(resolvePoint(map, "b site")).toEqual(resolvePoint(map, "Site"));
  });

  test("returns null for anything it can't place", () => {
    expect(resolvePoint(map, "Nowhere")).toBe(null);
    expect(resolvePoint(map, null)).toBe(null);
    expect(resolvePoint(null, "Main")).toBe(null);
  });

  // A click measured before the minimap has laid out divides by zero, and the
  // resulting NaN becomes null once it has been through JSON. Half a point is
  // not a point; letting one through crashed the renderer.
  test("rejects a partially written point", () => {
    expect(resolvePoint(map, { x: 0.3, y: null })).toBe(null);
    expect(resolvePoint(map, { x: 0.3 })).toBe(null);
    expect(resolvePoint(map, { x: NaN, y: 0.5 })).toBe(null);
    expect(resolvePoint(map, {})).toBe(null);
  });
});
