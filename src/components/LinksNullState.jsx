import React from "react";

import Markdown from "./Markdown";
import { Box, FloatingPill } from "../components/styles";

const text = `
Hello,

I'm testing out a new feature that allows you to **save links** as you browse. To get started, dowload the browser extension for Chrome or Firefox and start saving links.

I built this feature over a few nights and weekends because I wasn't satisfied with the available solutions for **saving links**. I tried using [Instapaper](https://instapaper.com), [Pocket](https://getpocket.com), Medium's [Journal](https://usejournal.com), and a few others, but there was something missing about each of them.

Basically, I wanted something to do the following, but couldn't find it.

- **Save links** that I may or may not go back to in the future. I don't want a queue-based reading list that makes me feel guilty.
- **Search** my links in case I do want to go back to something but don't remember exactly what it was called.
- **Tag** links and notes to keep certain things organized. For example, I have resturants tag for all of the new resturants I'd like to go to.
- **Take notes**, since links and notes often go together.
- Display my links and notes in a **clean UI** with **high information density**.
- Organize everything on one logical level. No "workspaces" (Notion) or "spaces" (Journal) or other unnecessary subcategories.

Not all of these features are available now, but they're all on the road map, along with iOS and Android apps for Convo.

— Alex
`;

export default function LinksNullState() {
  return (
    <Box maxWidth="80rem" width="100%" margin="auto">
      <FloatingPill>
        <Box mb={4}>
          <Markdown text={text} fontSize={3} lineHeight={1.6} />
        </Box>
      </FloatingPill>
    </Box>
  );
}
