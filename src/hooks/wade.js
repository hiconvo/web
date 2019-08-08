import { useMemo } from "react";
import Wade from "wade";

export default function useWade(items) {
  return useMemo(() => {
    const search = Wade(items.map(i => i.fullName));

    return query => {
      const results = search(query) || [];
      return results.map(({ index }) => items[index]);
    };
  }, [items]);
}
