// Development-only API behind the line-up admin panel.
//
// CRA loads this file when running `react-scripts start` and never includes it
// in a production build, so these routes cannot reach a deployed site. They
// exist so map positions can be clicked out and saved straight into
// src/data/lineups.js rather than copied by hand.

const fs = require("fs");
const path = require("path");

const DATA = path.join(__dirname, "data", "lineups.js");

// The order properties are written back in, so entries stay consistent no
// matter which order they were edited.
const KEY_ORDER = [
  "id",
  "agent",
  "map",
  "title",
  "ability",
  "side",
  "difficulty",
  "priority",
  "from",
  "to",
  "denies",
  "when",
  "beatenBy",
  "images",
];

// The object literal for one line up, located by its video id and delimited by
// brace matching rather than a regex, so nested objects survive.
function findEntry(source, id) {
  const marker = source.indexOf(`id: "${id}"`);
  if (marker === -1) return null;

  let start = source.lastIndexOf("{", marker);
  if (start === -1) return null;

  let depth = 0;
  for (let i = start; i < source.length; i += 1) {
    if (source[i] === "{") depth += 1;
    else if (source[i] === "}") {
      depth -= 1;
      if (depth === 0) return { start, end: i + 1, text: source.slice(start, i + 1) };
    }
  }

  return null;
}

const quote = (value) => JSON.stringify(value);

function serialise(entry) {
  const keys = KEY_ORDER.filter((key) => entry[key] !== undefined).concat(
    Object.keys(entry).filter((key) => !KEY_ORDER.includes(key))
  );

  const lines = keys.map((key) => {
    const value = entry[key];

    if (value === null) return `    ${key}: null,`;
    if (typeof value === "number") return `    ${key}: ${value},`;
    if (typeof value === "string") return `    ${key}: ${quote(value)},`;

    // Points and image sets: one line if short, which most are.
    const inner = Object.entries(value)
      .map(([k, v]) => `${k}: ${typeof v === "number" ? v : quote(v)}`)
      .join(", ");
    return `    ${key}: { ${inner} },`;
  });

  // Short entries stay on one line, matching how the file is written by hand -
  // so clearing a position leaves no formatting churn in the diff.
  const oneLine = `{ ${lines.map((l) => l.trim()).join(" ").replace(/,$/, "")} }`;
  if (oneLine.length <= 92 && !oneLine.includes("{ x:") && !oneLine.includes("stand:")) {
    return oneLine;
  }

  return `{\n${lines.join("\n")}\n  }`;
}

// A point is either a callout name or a pair of finite fractions. Anything
// else is a bug upstream and must not reach the data file.
function validPoint(value) {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") return value.trim().length > 0;

  return (
    typeof value === "object" &&
    Number.isFinite(value.x) &&
    Number.isFinite(value.y)
  );
}

function writePosition({ id, from, to }) {
  if (!validPoint(from)) throw new Error(`Invalid "from": ${JSON.stringify(from)}`);
  if (!validPoint(to)) throw new Error(`Invalid "to": ${JSON.stringify(to)}`);

  const source = fs.readFileSync(DATA, "utf8");
  const found = findEntry(source, id);
  if (!found) throw new Error(`No line up with id "${id}"`);

  // Evaluating the literal is safe here: these entries are plain data, and this
  // only ever runs on a developer's own machine.
  // eslint-disable-next-line no-new-func
  const entry = new Function(`return (${found.text});`)();

  if (from === null) delete entry.from;
  else if (from !== undefined) entry.from = from;

  if (to === null) delete entry.to;
  else if (to !== undefined) entry.to = to;

  const updated =
    source.slice(0, found.start) + serialise(entry) + source.slice(found.end);

  // Refuse to write anything that lost or gained an entry.
  const count = (text) => (text.match(/id: "/g) || []).length;
  if (count(updated) !== count(source)) {
    throw new Error("Refusing to write: entry count changed");
  }

  fs.writeFileSync(DATA, updated, "utf8");
  return entry;
}

module.exports = function setupAdmin(app) {
  app.use("/__admin", (req, res, next) => {
    res.set("Cache-Control", "no-store");
    next();
  });

  app.get("/__admin/status", (_req, res) => res.json({ ok: true }));

  app.post("/__admin/position", (req, res) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1e5) req.destroy();
    });

    req.on("end", () => {
      try {
        const payload = JSON.parse(body || "{}");
        if (!payload.id) throw new Error("id is required");

        const entry = writePosition(payload);
        res.json({ ok: true, entry });
      } catch (error) {
        res.status(400).json({ ok: false, error: error.message });
      }
    });
  });
};
