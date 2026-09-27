import {
  canCompare,
  comparableWeapons,
  rangeAt,
  damageAt,
  shotDamage,
  shotsToKill,
  timeToKill,
  falloffSeries,
} from "./ballistics";

// Real figures from the Valorant API.
const vandal = {
  displayName: "Vandal",
  weaponStats: {
    fireRate: 9.75,
    damageRanges: [
      { rangeStartMeters: 0, rangeEndMeters: 50, headDamage: 160, bodyDamage: 40, legDamage: 34 },
    ],
  },
};

const phantom = {
  displayName: "Phantom",
  weaponStats: {
    fireRate: 11,
    damageRanges: [
      { rangeStartMeters: 0, rangeEndMeters: 20, headDamage: 156, bodyDamage: 39, legDamage: 33 },
      { rangeStartMeters: 20, rangeEndMeters: 50, headDamage: 140, bodyDamage: 35, legDamage: 29 },
    ],
  },
};

const judge = {
  displayName: "Judge",
  weaponStats: {
    fireRate: 3.5,
    shotgunPelletCount: 12,
    damageRanges: [
      { rangeStartMeters: 0, rangeEndMeters: 10, headDamage: 34, bodyDamage: 17, legDamage: 14.45 },
    ],
  },
};

const melee = { displayName: "Melee", weaponStats: null };

test("melee is excluded from comparison", () => {
  expect(canCompare(melee)).toBe(false);
  expect(comparableWeapons([vandal, melee]).map((w) => w.displayName)).toEqual([
    "Vandal",
  ]);
});

describe("range selection", () => {
  test("a distance on a band boundary belongs to the further band", () => {
    expect(rangeAt(phantom, 20).bodyDamage).toBe(35);
    expect(rangeAt(phantom, 19.9).bodyDamage).toBe(39);
  });

  test("beyond the last band, the last band still applies", () => {
    expect(damageAt(phantom, 999, "body")).toBe(35);
  });
});

describe("damage", () => {
  test("the Vandal does not fall off", () => {
    expect(damageAt(vandal, 5, "head")).toBe(160);
    expect(damageAt(vandal, 49, "head")).toBe(160);
  });

  test("the Phantom falls off past 20m", () => {
    expect(damageAt(phantom, 10, "head")).toBe(156);
    expect(damageAt(phantom, 30, "head")).toBe(140);
  });

  test("shotgun damage counts every pellet", () => {
    expect(shotDamage(judge, 5, "body")).toBe(17 * 12);
  });
});

describe("shots to kill", () => {
  test("both rifles headshot through a full shield", () => {
    expect(shotsToKill(vandal, 10, "head", 150)).toBe(1);
    expect(shotsToKill(phantom, 10, "head", 150)).toBe(1);
  });

  // The core design tradeoff: past 20m the Phantom loses the one-shot headshot
  // against a full shield, while the Vandal keeps it at any range.
  test("past 20m only the Vandal keeps the one-shot headshot", () => {
    expect(shotsToKill(vandal, 30, "head", 150)).toBe(1);
    expect(shotsToKill(phantom, 30, "head", 150)).toBe(2);
  });

  test("body shots through a full shield", () => {
    expect(shotsToKill(vandal, 10, "body", 150)).toBe(4);
    expect(shotsToKill(phantom, 10, "body", 150)).toBe(4);
    expect(shotsToKill(phantom, 30, "body", 150)).toBe(5);
  });
});

describe("time to kill", () => {
  test("the first shot costs no time", () => {
    expect(timeToKill(vandal, 10, "head", 150)).toBe(0);
  });

  test("the Phantom's faster fire rate wins on body shots", () => {
    // 4 shots each, but 11/s beats 9.75/s.
    expect(timeToKill(phantom, 10, "body", 150)).toBeLessThan(
      timeToKill(vandal, 10, "body", 150)
    );
  });
});

test("falloff series steps at each band edge", () => {
  expect(falloffSeries(phantom, "body")).toEqual([
    { meters: 0, damage: 39 },
    { meters: 20, damage: 39 },
    { meters: 20, damage: 35 },
    { meters: 50, damage: 35 },
  ]);
});
