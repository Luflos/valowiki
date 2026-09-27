import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";
import {
  groupAgentsByRole,
  groupWeaponsByCategory,
  playableMaps,
} from "../../utils/valorant";
import { LINEUP_AGENTS } from "../../data/lineups";
import SearchBox from "./SearchBox";
import { asset } from "../../utils/asset";

// Driven by the line-up catalogue, so a new agent appears here automatically.
const LINEUP_SECTION = {
  id: "lineups",
  label: "Line Ups",
  to: "/lineups",
  groups: [
    {
      key: "lineups",
      title: null,
      items: LINEUP_AGENTS.map((agent) => ({
        uuid: agent.slug,
        displayName: agent.name,
      })),
    },
  ],
  hrefFor: (entry) => `/lineups/${entry.uuid}`,
};

export default function Sidebar({ agents = [], gameMaps = [], weapons = [] }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openSections, setOpenSections] = useState([]);
  const { pathname, hash } = useLocation();

  const sections = [
    {
      id: "agents",
      label: "Agents",
      to: "/agents",
      groups: groupAgentsByRole(agents),
      hrefFor: (agent) => `/agents/${agent.uuid}`,
    },
    {
      id: "maps",
      label: "Maps",
      to: "/maps",
      groups: (() => {
        const maps = playableMaps(gameMaps);
        return maps.length ? [{ key: "maps", title: null, items: maps }] : [];
      })(),
      hrefFor: (map) => `/maps/${map.uuid}`,
    },
    {
      id: "weapons",
      label: "Weapons",
      to: "/weapons",
      groups: groupWeaponsByCategory(weapons),
      hrefFor: (weapon) => `/weapons/${weapon.uuid}`,
    },
    LINEUP_SECTION,
  ];

  // Open whichever section matches the current route, and close the mobile
  // drawer once navigation has happened.
  useEffect(() => {
    const match = ["agents", "maps", "weapons", "lineups"].find((id) =>
      pathname.startsWith(`/${id}`)
    );
    if (match) setOpenSections((open) => (open.includes(match) ? open : [...open, match]));
    setDrawerOpen(false);
  }, [pathname, hash]);

  const toggleSection = (id) =>
    setOpenSections((open) =>
      open.includes(id) ? open.filter((s) => s !== id) : [...open, id]
    );

  const isCurrent = (href) =>
    href.includes("#") ? `${pathname}${hash}` === href : pathname === href;

  return (
    <>
      {/* Mobile-only bar: the sidebar itself is off-canvas below 900px. */}
      <header className="topbar">
        <button
          type="button"
          className="topbar-burger"
          aria-expanded={drawerOpen}
          aria-label="Toggle navigation"
          onClick={() => setDrawerOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
        <Link to="/" className="topbar-brand">
          <img src={asset("images/logo.png")} alt="" />
          <span>ValoREF</span>
        </Link>
      </header>

      <button
        type="button"
        className={`sidebar-scrim${drawerOpen ? " is-visible" : ""}`}
        tabIndex={-1}
        aria-hidden="true"
        onClick={() => setDrawerOpen(false)}
      />

      <aside className={`sidebar${drawerOpen ? " is-open" : ""}`}>
        <Link to="/" className="sidebar-brand">
          <img src={asset("images/logo.png")} alt="" />
          <span>ValoREF</span>
        </Link>

        <SearchBox agents={agents} gameMaps={gameMaps} weapons={weapons} />

        <nav className="sidebar-nav" aria-label="Main">
          <ul>
            {sections.map((section) => {
              const isOpen = openSections.includes(section.id);
              const hasItems = section.groups.length > 0;

              return (
                <li key={section.id} className="sidebar-section">
                  <div className="sidebar-row">
                    <Link
                      to={section.to}
                      className={`sidebar-link${
                        pathname === section.to ? " is-active" : ""
                      }`}
                    >
                      {section.label}
                    </Link>
                    {hasItems && (
                      <button
                        type="button"
                        className="sidebar-toggle"
                        aria-expanded={isOpen}
                        aria-label={`Toggle ${section.label}`}
                        onClick={() => toggleSection(section.id)}
                      />
                    )}
                  </div>

                  {hasItems && (
                    <div className={`sidebar-panel${isOpen ? " is-open" : ""}`}>
                      <div className="sidebar-panel-inner">
                        {section.groups.map((group) => (
                          <div className="sidebar-group" key={group.key}>
                            {group.title && (
                              <span className="sidebar-group-title">
                                {group.title}
                              </span>
                            )}
                            <ul>
                              {group.items.map((item) => {
                                const href = section.hrefFor(item);
                                return (
                                  <li key={item.uuid}>
                                    <Link
                                      to={href}
                                      className={
                                        isCurrent(href) ? "is-active" : undefined
                                      }
                                    >
                                      {item.displayName}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}

            <li className="sidebar-section">
              <div className="sidebar-row">
                <Link
                  to="/bundles"
                  className={`sidebar-link${
                    pathname.startsWith("/bundles") ? " is-active" : ""
                  }`}
                >
                  Bundles
                </Link>
              </div>
            </li>

            <li className="sidebar-section">
              <div className="sidebar-row">
                <Link
                  to="/compare"
                  className={`sidebar-link${
                    pathname === "/compare" ? " is-active" : ""
                  }`}
                >
                  Compare
                </Link>
              </div>
            </li>

            <li className="sidebar-section">
              <div className="sidebar-row">
                <Link
                  to="/team"
                  className={`sidebar-link${
                    pathname === "/team" ? " is-active" : ""
                  }`}
                >
                  Team
                </Link>
              </div>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
