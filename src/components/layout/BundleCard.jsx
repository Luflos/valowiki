import { Link } from "react-router-dom";
import LazyImage from "./LazyImage";

export default function BundleCard({ bundle, onOpen }) {
  return (
    <Link
      to={`/bundles/${bundle.key}`}
      className="card bundle-card"
      onClick={onOpen}
    >
      <LazyImage className="bundle-card-art" src={bundle.art} />
      <div className="bundle-card-body">
        <h3>{bundle.name}</h3>
        {/* Two editions of a collection share a name, so the weapon list is
            what tells them apart. */}
        <p className="bundle-card-weapons">{bundle.weaponsLabel}</p>
        <span className="bundle-card-count">
          {bundle.items.length} {bundle.items.length === 1 ? "skin" : "skins"}
        </span>
      </div>
    </Link>
  );
}
