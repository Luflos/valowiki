import {
  LINEUPS,
  LINEUP_AGENTS,
  getAgent,
  lineupsFor,
  mapsFor,
  lineupsOn,
  roleOn,
  missingFields,
  TEACHING_FIELDS,
} from "./lineups";

describe("catalogue integrity", () => {
  test("every line up has the three required fields", () => {
    LINEUPS.forEach((lineup) => {
      expect(typeof lineup.id).toBe("string");
      expect(typeof lineup.agent).toBe("string");
      expect(typeof lineup.map).toBe("string");
    });
  });

  test("every line up belongs to a known agent", () => {
    const slugs = LINEUP_AGENTS.map((a) => a.slug);
    LINEUPS.forEach((lineup) => expect(slugs).toContain(lineup.agent));
  });

  test("video ids are unique", () => {
    const ids = LINEUPS.map((l) => l.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("mapsFor", () => {
  test("lists an agent's maps alphabetically with counts", () => {
    expect(mapsFor("sova")).toEqual([
      { map: "Ascent", count: 4 },
      { map: "Haven", count: 4 },
    ]);
  });

  test("an unknown agent has no maps", () => {
    expect(mapsFor("nobody")).toEqual([]);
  });
});

describe("lineupsOn", () => {
  test("returns only that agent on that map", () => {
    const onAscent = lineupsOn("sova", "Ascent");
    expect(onAscent).toHaveLength(4);
    expect(onAscent.every((l) => l.map === "Ascent")).toBe(true);
  });

  test("matches the map case-insensitively, for URL slugs", () => {
    expect(lineupsOn("sova", "ascent")).toHaveLength(4);
  });

  test("orders by learning priority, then title", () => {
    const ordered = lineupsOn("sova", "Ascent").map((l) => l.title);
    // Nothing is prioritised yet, so it falls back to alphabetical.
    expect(ordered).toEqual([...ordered].sort((a, b) => a.localeCompare(b)));
  });

  test("a prioritised line up comes first", () => {
    const sample = [
      { id: "a", agent: "x", map: "M", title: "Zebra", priority: 1 },
      { id: "b", agent: "x", map: "M", title: "Apple" },
    ];
    const ordered = [...sample].sort((a, b) => {
      const order = (l) => (typeof l.priority === "number" ? l.priority : Infinity);
      return order(a) - order(b) || a.title.localeCompare(b.title);
    });
    expect(ordered.map((l) => l.title)).toEqual(["Zebra", "Apple"]);
  });

  test("an agent with no line ups on a map returns nothing", () => {
    expect(lineupsOn("sova", "Bind")).toEqual([]);
  });
});

describe("roleOn", () => {
  test("finds the role entry for an agent on a map", () => {
    expect(roleOn("sova", "Ascent")).toMatchObject({ agent: "sova", map: "Ascent" });
  });

  test("returns null rather than undefined when there is none", () => {
    expect(roleOn("sova", "Bind")).toBe(null);
  });
});

describe("missingFields", () => {
  test("reports every unfilled teaching field", () => {
    expect(missingFields({ id: "x" })).toEqual(TEACHING_FIELDS);
  });

  test("treats an empty string as unfilled", () => {
    expect(missingFields({ denies: "" })).toContain("denies");
  });

  test("a fully documented entry has no gaps", () => {
    const full = Object.fromEntries(TEACHING_FIELDS.map((f) => [f, "x"]));
    expect(missingFields(full)).toEqual([]);
  });
});

test("getAgent and lineupsFor still work for the existing routes", () => {
  expect(getAgent("cypher").name).toBe("Cypher");
  expect(lineupsFor("cypher")).toHaveLength(6);
});
