import { useEffect, useState } from "react";

import { useSelectors } from "../redux";
import { getContacts } from "../selectors";
import { userSearch } from "../api/search";
import useWade from "./wade";

const EMAIL_REGEXP = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+| |,|;)*$/;

export default function useUserSearch(query) {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState({
    contactsResults: [],
    networkResults: [],
    googleResults: [],
    emailAddress: []
  });
  const [contacts] = useSelectors(getContacts);
  const localSearch = useWade(contacts);

  useEffect(() => {
    if (query) {
      const isEmail = EMAIL_REGEXP.test(query);
      setIsLoading(true);
      userSearch(query).then(payload => {
        setResults({
          contactsResults: localSearch(query),
          networkResults: payload.users,
          emailAddress: isEmail
            ? [
                {
                  email: query,
                  fullName: query,
                  id: query
                }
              ]
            : []
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
