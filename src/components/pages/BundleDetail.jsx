import { useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import "../layout/Bundles.css";
import DataState, { SkeletonGrid } from "../layout/DataState";
import LazyImage from "../layout/LazyImage";
import useBundleMeta from "../../hooks/useBundleMeta";
import { buildBundles, findBundle, tierLookup } from "../../utils/bundles";

export default function BundleDetail({ weapons, status: weaponStatus, onRetry }) {
  const { id } = useParams();
  const meta = useBundleMeta();

  const bundles = useMemo(
    () => buildBundles({ weapons, themes: meta.themes, bundles: meta.bundles }),
    [weapons, meta.themes, meta.bundles]
  );

  const tierFor = useMemo(() => tierLookup(meta.tiers), [meta.tiers]);

  const status =
    weaponStatus === "error" || meta.status === "error"
      ? "error"
      : weaponStatus === "loading" || meta.status === "loading"
      ? "loading"
      : "ready";

  const retry = () => {
    meta.retry();
    onRetry?.();
  };

  const bundle = findBundle(bundles, id);

  // Only a genuine miss once everything has loaded.
  if (status === "ready" && !bundle) return <Navigate to="/nonexistent" replace />;

  return (
    <div className="page">
      <header className="page-head">
        <span className="eyebrow">
          <Link to="/bundles">Bundles</Link>
        </span>
        <h1>{bundle?.name ?? "Bundle"}</h1>
        {bundle && (
          <p>
            {bundle.items.length} skins · {bundle.weaponsLabel}
          </p>
        )}
      </header>

      <DataState
        status={status}
        onRetry={retry}
        what="this bundle"
        skeleton={<SkeletonGrid count={5} variant="wide" />}
      >
        {bundle && (
          <>
            {bundle.art && (
              <div className="bundle-hero">
                <img src={bundle.art} alt="" />
              </div>
            )}

            <div className="bundle-skins">
              {bundle.items.map((item) => {
                const tier = tierFor(item.tierUuid);

                return (
                  <Link
                    key={item.uuid}
                    to={`/weapons/${item.weaponUuid}`}
                    className="card bundle-skin"
                    // The tier stripe is decorative; the label below carries it.
                    style={tier ? { "--tier": tier.color } : undefined}
                  >
                    <LazyImage className="bundle-skin-art" src={item.image} />
                    <div className="bundle-skin-body">
                      <h4>{item.displayName}</h4>
                      <span className="bundle-skin-weapon">{item.weapon}</span>
                      {tier && (
                        <span className="bundle-skin-tier">
                          {tier.icon && <img src={tier.icon} alt="" />}
                          {tier.name}
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </DataState>
    </div>
  );
}
