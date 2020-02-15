import { useEffect } from "react";
import throttle from "lodash/throttle";

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

    const scrollCb = throttle(
      e => {
        const scrollingElement = e.target.scrollingElement
          ? e.target.scrollingElement
          : e.target;
        const { scrollTop, scrollHeight, clientHeight } = scrollingElement;

        if (scrollHeight - scrollTop <= clientHeight + 1500) {
          handleFetch();
        }
      },
      400,
      { leading: true }
    );

    node && node.addEventListener("scroll", scrollCb);

    return () => {
      node && node.removeEventListener("scroll", scrollCb);
    };
    // eslint-disable-next-line
  }, [node, pageNumber]);
}
