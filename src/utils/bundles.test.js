import { buildBundles, findBundle, tierLookup, skinImage } from "./bundles";

const theme = (uuid, displayName, extra = {}) => ({ uuid, displayName, ...extra });

const skin = (uuid, displayName, themeUuid, extra = {}) => ({
  uuid,
  displayName,
  themeUuid,
  displayIcon: `${uuid}-icon`,
  ...extra,
});

const themes = [
  theme("t-glitch", "Glitchpop", { displayIcon: "glitch-theme-icon" }),
  theme("t-prime", "Prime"),
  theme("t-std", "Standard"),
  theme("t-rand", "Random"),
];

const bundles = [
  { uuid: "b1", displayName: "Glitchpop", displayIcon: "glitch-art", logoIcon: "glitch-logo" },
  // A duplicate name: the first should win.
  { uuid: "b2", displayName: "Glitchpop", displayIcon: "wrong-art" },
];

const weapons = [
  {
    uuid: "w-vandal",
    displayName: "Vandal",
    skins: [
      skin("s1", "Glitchpop Vandal", "t-glitch", { contentTierUuid: "tier-premium" }),
      skin("s2", "Vandal", "t-std"),
      skin("s3", "Random Favourite", "t-rand"),
    ],
  },
  {
    uuid: "w-classic",
    displayName: "Classic",
    skins: [
      skin("s4", "Glitchpop Classic", "t-glitch"),
      skin("s5", "Prime Classic", "t-prime"),
    ],
  },
];

describe("buildBundles", () => {
  const built = buildBundles({ weapons, themes, bundles });

  test("groups skins by theme across weapons", () => {
    const glitch = findBundle(built, "t-glitch");
    expect(glitch.items.map((i) => i.displayName)).toEqual([
      "Glitchpop Classic",
      "Glitchpop Vandal",
    ]);
  });

  test("drops the Standard and Random pseudo-themes", () => {
    expect(built.map((b) => b.name)).toEqual(["Glitchpop", "Prime"]);
  });

  test("joins bundle art by name", () => {
    expect(findBundle(built, "t-glitch").art).toBe("glitch-art");
    expect(findBundle(built, "t-glitch").hasBundle).toBe(true);
  });

  test("a re-released collection gets each edition its own art", () => {
    // Two Glitchpop themes and two Glitchpop bundles, paired in order.
    const twoEditions = buildBundles({
      weapons: [
        {
          uuid: "w",
          displayName: "Vandal",
          skins: [
            skin("a", "Glitchpop Vandal", "t-glitch"),
            skin("b", "Glitchpop Vandal 2", "t-glitch-2"),
          ],
        },
      ],
      themes: [...themes, theme("t-glitch-2", "Glitchpop")],
      bundles,
    });

    expect(findBundle(twoEditions, "t-glitch").art).toBe("glitch-art");
    expect(findBundle(twoEditions, "t-glitch-2").art).toBe("wrong-art");
  });

  test("lists the weapons a collection covers", () => {
    expect(findBundle(built, "t-glitch").weaponsLabel).toBe("Classic \u00b7 Vandal");
  });

  test("falls back to a skin render when no bundle matches", () => {
    const prime = findBundle(built, "t-prime");
    expect(prime.hasBundle).toBe(false);
    expect(prime.art).toBe("s5-icon");
  });

  test("orders by size, then name", () => {
    expect(built[0].name).toBe("Glitchpop");
    expect(built[0].items.length).toBe(2);
  });

  test("tolerates missing input", () => {
    expect(buildBundles({})).toEqual([]);
  });
});

describe("skinImage", () => {
  test("prefers the full render over the icon", () => {
    expect(skinImage({ chromas: [{ fullRender: "big" }], displayIcon: "small" })).toBe("big");
    expect(skinImage({ displayIcon: "small" })).toBe("small");
    expect(skinImage({})).toBe(null);
  });
});

describe("tierLookup", () => {
  const lookup = tierLookup([
    { uuid: "tier-premium", displayName: "Premium Edition", highlightColor: "d1548dff" },
  ]);

  test("trims the alpha channel off the highlight colour", () => {
    expect(lookup("tier-premium").color).toBe("#d1548d");
  });

  test("returns null for an unknown or missing tier", () => {
    expect(lookup("nope")).toBe(null);
    expect(lookup(null)).toBe(null);
  });
});
