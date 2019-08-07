import { useEffect, useState } from "react";

import { useSelectors } from "../redux";
import { getContacts } from "../selectors";
import { userSearch } from "../api/search";
import useWade from "./wade";

export default function useUserSearch(query) {
  const [isLoading, setIsLoading] = useState(false);
  const [remoteResults, setRemoteResults] = useState([]);
  const [contacts] = useSelectors(getContacts);
  const localSearch = useWade(contacts);

  useEffect(() => {
    if (query) {
      setIsLoading(true);
      userSearch(query).then(payload => {
        setRemoteResults(payload.users);
        setIsLoading(false);
      });
    }
  }, [query, setRemoteResults]);

  return {
    contactsResults: localSearch(query),
    networkResults: remoteResults,
    isLoading
  };
}
