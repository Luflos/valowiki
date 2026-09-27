// Skin bundles.
//
// The API has no endpoint that lists a bundle's skins, so the grouping is
// derived: every skin carries a `themeUuid`, and a theme is the collection a
// skin belongs to. /v1/bundles holds the promo art and is joined on by name,
// which covers most themes but not all - roughly 290 of 440 - so anything
// unmatched falls back to the theme's own icon or its first skin.
//
// Skins already arrive inside the weapons payload the app fetches for the
// sidebar, so building this costs no extra weapon data.

// Not real bundles: "Standard" is the default skin for each weapon and
// "Random" is the randomiser entry.
const EXCLUDED = new Set(["standard", "random"]);

const norm = (value = "") => value.trim().toLowerCase();

// Best image for a skin: the full render if it has one, else its icon.
export const skinImage = (skin) =>
  skin.chromas?.[0]?.fullRender || skin.displayIcon || null;

export function buildBundles({ weapons = [], themes = [], bundles = [] }) {
  const themeById = new Map(themes.map((t) => [t.uuid, t]));

  // Several collections shipped more than once - Glitchpop twice, Magepunk
  // three times - and the API versions neither the theme nor the bundle, so
  // both appear under the identical name. The counts line up, so same-named
  // themes take same-named bundles in order; each edition then gets its own
  // (genuinely on-theme) art instead of every card repeating the first.
  const bundleQueues = new Map();
  bundles.forEach((bundle) => {
    const key = norm(bundle.displayName);
    if (!key) return;
    if (!bundleQueues.has(key)) bundleQueues.set(key, []);
    bundleQueues.get(key).push(bundle);
  });

  const taken = new Map();
  const nextBundle = (name) => {
    const key = norm(name);
    const queue = bundleQueues.get(key);
    if (!queue) return null;

    const index = taken.get(key) ?? 0;
    taken.set(key, index + 1);
    // Past the last edition, reuse the final one rather than dropping the art.
    return queue[index] || queue[queue.length - 1];
  };

  const groups = new Map();

  weapons.forEach((weapon) => {
    (weapon.skins || []).forEach((skin) => {
      const theme = themeById.get(skin.themeUuid);
      const name = theme?.displayName;
      if (!name || EXCLUDED.has(norm(name))) return;

      if (!groups.has(skin.themeUuid)) {
        const bundle = nextBundle(name);

        groups.set(skin.themeUuid, {
          key: skin.themeUuid,
          name,
          // Wide promo art, then the square icon, then nothing - the card
          // falls back to a skin render when both are missing.
          art: bundle?.displayIcon || theme.storeFeaturedImage || null,
          logo: bundle?.logoIcon || theme.displayIcon || null,
          vertical: bundle?.verticalPromoImage || null,
          hasBundle: Boolean(bundle),
          items: [],
        });
      }

      groups.get(skin.themeUuid).items.push({
        uuid: skin.uuid,
        displayName: skin.displayName,
        weapon: weapon.displayName,
        weaponUuid: weapon.uuid,
        image: skinImage(skin),
        tierUuid: skin.contentTierUuid || null,
      });
    });
  });

  return [...groups.values()]
    .map((group) => {
      const items = group.items.sort((a, b) => a.weapon.localeCompare(b.weapon));

      return {
        ...group,
        items,
        // What the collection covers. This is also what tells two editions of
        // the same bundle apart, since the API gives them the same name.
        weaponsLabel: items.map((i) => i.weapon).join(" \u00b7 "),
        // Cover art when the bundle had none.
        art: group.art || items.find((i) => i.image)?.image || null,
      };
    })
    // Biggest collections first; they are the recognisable ones.
    .sort((a, b) => b.items.length - a.items.length || a.name.localeCompare(b.name));
}

export const findBundle = (list, key) => list.find((b) => b.key === key);

// Tier lookup, for the rarity stripe on a skin card.
export function tierLookup(tiers = []) {
  const byId = new Map(tiers.map((t) => [t.uuid, t]));

  return (uuid) => {
    const tier = uuid ? byId.get(uuid) : null;
    if (!tier) return null;

    return {
      name: tier.displayName,
      // The API returns 8-digit hex with alpha; CSS wants the first 6.
      color: `#${String(tier.highlightColor || "").slice(0, 6)}`,
      icon: tier.displayIcon || null,
    };
  };
}
