import React from "react";

import { useSelectors } from "../redux";
import { getIsNotesFetched, getNotes } from "../selectors";
import { Ripple, Text } from "../components/styles";

export default function Links() {
  const [isNotesFetched, notes] = useSelectors(getIsNotesFetched, getNotes);

  if (isNotesFetched && notes.length <= 0) {
    return (
      <div>
        <Text>Null state</Text>
      </div>
    );
  }

  return (
    <div>
      {!isNotesFetched && <Ripple />}
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <Text>{note.name}</Text>
          </li>
        ))}
      </ul>
    </div>
  );
}
