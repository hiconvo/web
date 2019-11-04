import React, { useState, useRef } from "react";

import MemberItemSmallInline from "./MemberItemSmallInline";
import UserSearchAutocompleteField, {
  USER_SEARCH_DEFAULT_STATE
} from "./UserSearchAutocompleteField";
import { Box } from "./styles";

export default function MultiMemberPickerField({ members, setMembers }) {
  const inputEl = useRef(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(USER_SEARCH_DEFAULT_STATE);

  function handleAddMember(e, member) {
    e && e.preventDefault();

    if (!members.some(m => m.id === member.id)) {
      setMembers(members.concat(member));
      setQuery("");
      setResults(USER_SEARCH_DEFAULT_STATE);
      inputEl.current && inputEl.current.focus();
    }
  }

  function handleRemoveMember(member) {
    return e => {
      e && e.preventDefault();
      setMembers(
        members.filter(m => {
          if (m.email && member.email) {
            return m.email !== member.email;
          } else {
            return m.id !== member.id;
          }
        })
      );
    };
  }

  return (
    <Box flexDirection="row">
      <Box as="ul" flexDirection="row" alignItems="center" flexWrap="wrap">
        {members.map(member => (
          <MemberItemSmallInline
            key={member.id}
            member={member}
            onDelete={handleRemoveMember(member)}
          />
        ))}
        <Box as="li">
          <UserSearchAutocompleteField
            ref={inputEl}
            query={query}
            onQueryChange={e => setQuery(e.target.value)}
            results={results}
            onResultsChange={setResults}
            onClick={handleAddMember}
          />
        </Box>
      </Box>
    </Box>
  );
}
