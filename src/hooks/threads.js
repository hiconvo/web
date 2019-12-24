import { useEffect } from "react";

import { useSelectors, useActions } from "../redux";
import { getIsThreadsFetched, getThreads } from "../selectors";
import * as unboundThreadActions from "../actions/threads";

let hasFetched = false;

export default function useThreads(...selectors) {
  const [isThreadsFetched] = useSelectors(getIsThreadsFetched);
  const { fetchThreads } = useActions(unboundThreadActions);

  useEffect(() => {
    if (!isThreadsFetched && !hasFetched) {
      fetchThreads();
      hasFetched = true;
    }
  }, [isThreadsFetched, fetchThreads]);

  return useSelectors(...(selectors.length <= 0 ? [getThreads] : selectors));
}
