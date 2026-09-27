import { useState } from "react";
import "./LazyImage.css";

// Art comes from a CDN that takes roughly 600ms an image, and some grids hold
// hundreds. Browser-level lazy loading keeps the requests down; this adds the
// missing half - a shimmering frame while the image is in flight, then a fade -
// so a scrolled grid reads as loading rather than broken.
//
// `className` sizes the frame, so each caller keeps its own layout rules.
export default function LazyImage({ src, alt = "", className = "", ...rest }) {
  const [loaded, setLoaded] = useState(false);
  const settle = () => setLoaded(true);

  return (
    <div className={`lazy-frame ${className}${loaded ? " is-loaded" : ""}`}>
      {src && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={settle}
          onError={settle}
          {...rest}
        />
      )}
    </div>
  );
}
