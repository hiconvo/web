import { useEffect, useState } from "react";

import { useSelectors } from "../redux";
import { getContacts } from "../selectors";
import { userSearch } from "../api/search";
import useWade from "./wade";
import useGoogleContacts from "./googleContacts";

export default function useUserSearch(query) {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState({
    contactsResults: [],
    networkResults: [],
    googleResults: []
  });
  const [contacts] = useSelectors(getContacts);
  const localSearch = useWade(contacts);
  const googleContactsSearch = useGoogleContacts();

  useEffect(() => {
    if (query) {
      setIsLoading(true);
      userSearch(query).then(payload => {
        setResults({
          contactsResults: localSearch(query),
          networkResults: payload.users,
          googleResults: googleContactsSearch(query)
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
