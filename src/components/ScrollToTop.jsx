import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const EXCEPTIONS = ["/convos"];

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!EXCEPTIONS.includes(pathname)) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
