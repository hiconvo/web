import { useEffect } from "react";
import debounce from "lodash/debounce";

import { useSelectors, useActions } from "../redux";

let isFetching = false;

export default function usePagination(fetchAction, pageInfoSelector, node) {
  const { boundFetchAction } = useActions({ boundFetchAction: fetchAction });
  const [{ pageNumber, isExhausted }] = useSelectors(pageInfoSelector);

  useEffect(() => {
    async function handleFetch() {
      if (isFetching || isExhausted) return;

      isFetching = true;
      await boundFetchAction(pageNumber + 1);
      isFetching = false;
    }

    const scrollCb = debounce(
      e => {
        const scrollingElement = e.target.scrollingElement
          ? e.target.scrollingElement
          : e.target;
        const { scrollTop, scrollHeight, clientHeight } = scrollingElement;

        if (scrollHeight - scrollTop <= clientHeight + 1500) {
          handleFetch();
        }
      },
      200,
      { leading: true }
    );

    node && node.addEventListener("scroll", scrollCb);

    return () => {
      node && node.removeEventListener("scroll", scrollCb);
    };
    // eslint-disable-next-line
  }, [node, pageNumber]);
}
