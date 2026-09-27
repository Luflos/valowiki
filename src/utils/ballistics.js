// Damage and time-to-kill maths for the weapon comparison tool.
//
// Valorant's model, as the API exposes it:
//   - A weapon has one or more damageRanges, each with head/body/leg damage.
//     Most guns fall off with distance; the Vandal famously does not.
//   - Shotguns fire shotgunPelletCount pellets per trigger pull, and the
//     damage figures are *per pellet*.
//   - Agents have 100 HP plus shield (25 light, 50 heavy), and shields absorb
//     damage one-for-one, so effective HP is simply 100 + shield.

export const BODY_PARTS = ["head", "body", "leg"];

export const SHIELDS = [
  { key: "none", label: "No shield", hp: 100 },
  { key: "light", label: "Light shield", hp: 125 },
  { key: "heavy", label: "Heavy shield", hp: 150 },
];

// Melee has no weaponStats at all, so it can't be compared.
export const canCompare = (weapon) =>
  Boolean(weapon?.weaponStats?.damageRanges?.length);

export const comparableWeapons = (weapons = []) => weapons.filter(canCompare);

export const maxRange = (weapon) =>
  Math.max(...weapon.weaponStats.damageRanges.map((r) => r.rangeEndMeters));

// The band covering a given distance. Bands are contiguous (0-30, 30-50), so a
// distance sitting exactly on a boundary belongs to the further band.
export function rangeAt(weapon, meters) {
  const ranges = weapon.weaponStats.damageRanges;

  return (
    ranges.find(
      (r) => meters >= r.rangeStartMeters && meters < r.rangeEndMeters
    ) || ranges[ranges.length - 1]
  );
}

// Damage from a single bullet or pellet.
export function damageAt(weapon, meters, part = "body") {
  const range = rangeAt(weapon, meters);
  const key = `${part}Damage`;

  return range[key] ?? 0;
}

export const pelletCount = (weapon) =>
  weapon.weaponStats.shotgunPelletCount || 1;

// Damage from one trigger pull, assuming every pellet connects. That is the
// best case for a shotgun and exactly true for everything else.
export const shotDamage = (weapon, meters, part = "body") =>
  damageAt(weapon, meters, part) * pelletCount(weapon);

// Shots needed to kill. Infinity when a weapon simply cannot (no damage).
export function shotsToKill(weapon, meters, part = "body", hp = 150) {
  const perShot = shotDamage(weapon, meters, part);
  if (perShot <= 0) return Infinity;

  return Math.ceil(hp / perShot);
}

// Time from the first shot landing to the kill. The first shot costs no time,
// so n shots take (n - 1) intervals at the weapon's fire rate.
export function timeToKill(weapon, meters, part = "body", hp = 150) {
  const shots = shotsToKill(weapon, meters, part, hp);
  if (!Number.isFinite(shots)) return Infinity;

  const rate = weapon.weaponStats.fireRate;
  if (!rate) return Infinity;

  return (shots - 1) / rate;
}

// Points for a damage-vs-distance chart. Each band contributes its start and
// end so the line steps where the falloff actually happens rather than sloping
// through it.
export function falloffSeries(weapon, part = "body") {
  const points = [];

  weapon.weaponStats.damageRanges.forEach((range) => {
    const damage = (range[`${part}Damage`] ?? 0) * pelletCount(weapon);
    points.push({ meters: range.rangeStartMeters, damage });
    points.push({ meters: range.rangeEndMeters, damage });
  });

  return points;
}

// Rounds to one decimal and strips a trailing ".0" - the API returns values
// like 14.450001 for leg damage.
export const tidy = (value) =>
  Number.isFinite(value) ? +value.toFixed(1) : value;
