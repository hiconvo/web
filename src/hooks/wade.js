import { useEffect, useRef } from "react";
import Wade from "wade";

export default function useWade(items) {
  const search = useRef(null);

  useEffect(() => {
    search.current = Wade(items.map(i => i.fullName));
  }, [items, search]);

  return query => {
    const results = search.current ? search.current(query) : [];
    return results.map(({ index }) => items[index]);
  };
}
