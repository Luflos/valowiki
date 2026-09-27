import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

// React Router keeps the scroll position across navigations, so following a
// link from halfway down a long list dropped you into the middle of the next
// page. Reset on a new navigation only - a back or forward should keep
// whatever position the page restores for itself.
export default function ScrollToTop() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType === "POP") return;

    window.scrollTo(0, 0);
  }, [pathname, navigationType]);

  return null;
}
