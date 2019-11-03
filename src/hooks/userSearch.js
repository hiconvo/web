import { useEffect, useState } from "react";

import { useSelectors } from "../redux";
import { getContacts } from "../selectors";
import { userSearch } from "../api/search";
import useWade from "./wade";

export default function useUserSearch(query) {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState({
    contactsResults: [],
    networkResults: [],
    googleResults: []
  });
  const [contacts] = useSelectors(getContacts);
  const localSearch = useWade(contacts);

  useEffect(() => {
    if (query) {
      setIsLoading(true);
      userSearch(query).then(payload => {
        setResults({
          contactsResults: localSearch(query),
          networkResults: payload.users
        });
        setIsLoading(false);
      });
    }
  }, [query, setResults, localSearch]);

  return {
    ...results,
    isLoading
  };
}
