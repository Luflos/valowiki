import { asset } from "./asset";

// CRA inlines process.env.PUBLIC_URL at build time; in Jest it is "".
describe("asset", () => {
  test("builds a root-relative path when PUBLIC_URL is empty", () => {
    expect(asset("images/logo.png")).toBe("/images/logo.png");
  });

  test("tolerates a leading slash rather than doubling it", () => {
    expect(asset("/images/logo.png")).toBe("/images/logo.png");
    expect(asset("//images/logo.png")).toBe("/images/logo.png");
  });

  test("handles an empty path", () => {
    expect(asset()).toBe("/");
  });
});
