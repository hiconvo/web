import React from "react";
import { Link } from "react-router-dom";
import "styled-components/macro";

import { useSelectors } from "../redux";
import { getRecentNotes } from "../selectors";
import Bullet from "./NoteBullet";
import { Paragraph, Box, Text, Icon } from "./styles";

export default function RecentLinksSidebar() {
  const [notes] = useSelectors(getRecentNotes);

  return (
    <Box mb={4} mr={2}>
      <Paragraph color="gray" mb={2} fontSize={0}>
        Recent links & notes
      </Paragraph>
      {notes.length <= 0 ? (
        <Paragraph fontSize={1}>
          You don't have any recent links or notes.{" "}
          <Link to="/links">
            <Text color="primary900" fontSize={1} fontWeight="semiBold">
              Learn more <Icon name="call_made" fontSize={1} />
            </Text>
          </Link>
        </Paragraph>
      ) : (
        notes.map((note) => {
          const isLink = note && note.url;

          return (
            <Box as="li" flexDirection="row" alignItems="center" py={2}>
              <Bullet favicon={note.favicon} isLink={isLink} />
              <Box
                width="calc(100% - 3rem)"
                overflow="visible"
                flexDirection="row"
                alignItems="center"
              >
                {isLink ? (
                  <Box
                    as="a"
                    href={note.url}
                    target="_blank"
                    display="block"
                    overflow="hidden"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                    css={{ "&:hover": { "text-decoration": "underline" } }}
                  >
                    <Text weight="semiBold" fontSize={2}>
                      {note.name}
                    </Text>
                  </Box>
                ) : (
                  <Link key={note.id} to={`/notes/${note.id}`}>
                    <Text
                      weight="semiBold"
                      overflow="hidden"
                      whiteSpace="nowrap"
                      textOverflow="ellipsis"
                      fontSize={2}
                    >
                      {note.name}
                    </Text>
                  </Link>
                )}
              </Box>
            </Box>
          );
        })
      )}
    </Box>
  );
}
