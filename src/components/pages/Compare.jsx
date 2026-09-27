import { useMemo, useState } from "react";
import "../layout/Compare.css";
import FalloffChart from "../layout/FalloffChart";
import { ErrorState } from "../layout/DataState";
import {
  BODY_PARTS,
  SHIELDS,
  comparableWeapons,
  shotDamage,
  shotsToKill,
  timeToKill,
  pelletCount,
  tidy,
} from "../../utils/ballistics";

const SERIES_COLORS = ["var(--series-1)", "var(--series-2)"];
const RANGES = [5, 15, 25, 35, 45];

const DEFAULTS = ["Vandal", "Phantom"];

const fmtTime = (seconds) =>
  Number.isFinite(seconds) ? `${(seconds * 1000).toFixed(0)} ms` : "-";

export default function Compare({ weapons, status, onRetry }) {
  const [part, setPart] = useState("body");
  const [shield, setShield] = useState("heavy");
  const [picked, setPicked] = useState(DEFAULTS);

  const options = useMemo(
    () =>
      comparableWeapons(weapons).sort((a, b) =>
        a.displayName.localeCompare(b.displayName)
      ),
    [weapons]
  );

  const chosen = picked
    .map((name) => options.find((w) => w.displayName === name))
    .filter(Boolean);

  const hp = SHIELDS.find((s) => s.key === shield).hp;

  const setSlot = (index, name) =>
    setPicked((current) => current.map((v, i) => (i === index ? name : v)));

  if (status === "error") {
    return (
      <div className="page">
        <ErrorState onRetry={onRetry} what="weapon stats" />
      </div>
    );
  }

  if (options.length === 0) {
    return (
      <div className="page">
        <div className="compare-skeleton" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className="page">
      <header className="page-head">
        <span className="eyebrow">ValoREF</span>
        <h1>Weapon Comparison</h1>
        <p>
          Shots and time to kill, computed from the game's own damage tables.
          Melee is excluded - it is the one weapon with no stats in the API.
        </p>
      </header>

      <div className="compare-controls">
        {[0, 1].map((slot) => (
          <label className="compare-field" key={slot}>
            <span>Weapon {slot + 1}</span>
            <select
              className="compare-select"
              value={picked[slot]}
              onChange={(event) => setSlot(slot, event.target.value)}
            >
              {options.map((w) => (
                <option key={w.uuid} value={w.displayName}>
                  {w.displayName}
                </option>
              ))}
            </select>
          </label>
        ))}

        <label className="compare-field">
          <span>Hit location</span>
          <select
            className="compare-select"
            value={part}
            onChange={(event) => setPart(event.target.value)}
          >
            {BODY_PARTS.map((p) => (
              <option key={p} value={p}>
                {p[0].toUpperCase() + p.slice(1)}
              </option>
            ))}
          </select>
        </label>

        <label className="compare-field">
          <span>Target</span>
          <select
            className="compare-select"
            value={shield}
            onChange={(event) => setShield(event.target.value)}
          >
            {SHIELDS.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label} ({s.hp} HP)
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="compare-grid">
        {chosen.map((weapon, i) => (
          <section className="card compare-card" key={weapon.uuid}>
            <header className="compare-card-head">
              <span
                className="chart-swatch"
                style={{ background: SERIES_COLORS[i] }}
              />
              <h2>{weapon.displayName}</h2>
            </header>

            <img
              className="compare-art"
              src={weapon.displayIcon}
              alt={weapon.displayName}
            />

            <dl className="compare-stats">
              <div>
                <dt>Fire rate</dt>
                <dd>{weapon.weaponStats.fireRate}/s</dd>
              </div>
              <div>
                <dt>Magazine</dt>
                <dd>{weapon.weaponStats.magazineSize}</dd>
              </div>
              <div>
                <dt>Reload</dt>
                <dd>{weapon.weaponStats.reloadTimeSeconds}s</dd>
              </div>
              <div>
                <dt>Run speed</dt>
                <dd>{weapon.weaponStats.runSpeedMultiplier}x</dd>
              </div>
              {pelletCount(weapon) > 1 && (
                <div>
                  <dt>Pellets</dt>
                  <dd>{pelletCount(weapon)}</dd>
                </div>
              )}
              {weapon.shopData && (
                <div>
                  <dt>Cost</dt>
                  <dd>{weapon.shopData.cost} creds</dd>
                </div>
              )}
            </dl>
          </section>
        ))}
      </div>

      {chosen.length === 2 && (
        <>
          <h2 className="section-title">Shots &amp; time to kill</h2>
          <div className="compare-table-wrap">
            <table className="compare-table">
              <thead>
                <tr>
                  <th scope="col">Distance</th>
                  {chosen.map((w) => (
                    <th scope="col" colSpan={3} key={w.uuid}>
                      {w.displayName}
                    </th>
                  ))}
                </tr>
                <tr className="compare-subhead">
                  <th scope="col"></th>
                  {chosen.map((w) => [
                    <th scope="col" key={`${w.uuid}-d`}>Dmg</th>,
                    <th scope="col" key={`${w.uuid}-s`}>Shots</th>,
                    <th scope="col" key={`${w.uuid}-t`}>TTK</th>,
                  ])}
                </tr>
              </thead>
              <tbody>
                {RANGES.map((m) => {
                  const rows = chosen.map((w) => ({
                    uuid: w.uuid,
                    dmg: tidy(shotDamage(w, m, part)),
                    shots: shotsToKill(w, m, part, hp),
                    ttk: timeToKill(w, m, part, hp),
                  }));
                  const best = Math.min(...rows.map((r) => r.ttk));

                  return (
                    <tr key={m}>
                      <th scope="row">{m} m</th>
                      {rows.map((r) => [
                        <td key={`${r.uuid}-d`}>{r.dmg}</td>,
                        <td key={`${r.uuid}-s`}>
                          {Number.isFinite(r.shots) ? r.shots : "-"}
                        </td>,
                        <td
                          key={`${r.uuid}-t`}
                          className={r.ttk === best ? "is-best" : undefined}
                        >
                          {fmtTime(r.ttk)}
                        </td>,
                      ])}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="compare-note">
            Faster time to kill is marked. TTK counts only the interval between
            shots, so a one-shot kill is 0 ms - the practical difference is
            whether a weapon needs a second bullet at all.
          </p>

          <h2 className="section-title">Damage falloff</h2>
          <FalloffChart
            part={part}
            series={chosen.map((weapon, i) => ({
              weapon,
              label: weapon.displayName,
              color: SERIES_COLORS[i],
            }))}
          />
        </>
      )}
    </div>
  );
}
