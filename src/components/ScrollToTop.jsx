import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import throttle from "lodash/throttle";

const MEMORY = { "/convos": 0 };

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (MEMORY[pathname]) {
      window.scrollTo(0, MEMORY[pathname]);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  useEffect(() => {
    const scrollCb = throttle(
      () => {
        if (MEMORY.hasOwnProperty(pathname) && window.scrollY !== 0) {
          MEMORY[pathname] = window.scrollY;
        }
      },
      200,
      {}
    );

    window.addEventListener("scroll", scrollCb);

    return () => {
      window.removeEventListener("scroll", scrollCb);
    };
  }, [pathname]);

  return null;
}
