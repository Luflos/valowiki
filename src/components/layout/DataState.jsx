import "./DataState.css";

// A run of placeholder cards, shaped roughly like the real grid so the layout
// doesn't jump when data lands.
export function SkeletonGrid({ count = 12, variant = "card" }) {
  return (
    <div className={`skeleton-grid is-${variant}`} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <div className="skeleton-card" key={i}>
          <div className="skeleton-art" />
          <div className="skeleton-lines">
            <span />
            <span />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ErrorState({ onRetry, what = "data" }) {
  return (
    <div className="data-error" role="alert">
      <h3>Couldn't load {what}</h3>
      <p>
        The Valorant API didn't respond. It may be briefly unavailable, or your
        connection dropped.
      </p>
      {onRetry && (
        <button type="button" className="btn btn-primary" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}

// Wraps a data-backed view: shows a skeleton while loading and a retryable
// error instead of an empty page that looks like a bug.
export default function DataState({
  status,
  onRetry,
  what,
  skeleton,
  children,
}) {
  if (status === "error") return <ErrorState onRetry={onRetry} what={what} />;
  if (status === "loading") return skeleton ?? <SkeletonGrid />;

  return children;
}
