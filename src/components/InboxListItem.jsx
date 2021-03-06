import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { format } from "date-fns";
import { themeGet } from "@styled-system/theme-get";

import { useSelectors } from "../redux";
import { getUser } from "../selectors";
import { Box, Text } from "./styles";

const timestampWidth = "6rem";

const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  padding: ${themeGet("space.3")};
  cursor: pointer;
  transition: all ease ${themeGet("animations.fast")};
  overflow: hidden;
  width: calc(100% - ${themeGet("space.3")} * 2);
  flex-shrink: 0;
  border-bottom: 0.1rem solid ${themeGet("colors.veryLightGray")};

  background-color: ${(props) =>
    props.isSelected
      ? props.theme.colors.primary100
      : props.theme.colors.trueWhite};

  &:hover {
    background-color: ${themeGet("colors.snow")};
  }
`;

const FromContainer = styled.div`
  margin-bottom: ${themeGet("space.2")};
`;

const From = styled.span`
  display: inline;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: ${themeGet("colors.bodytext")};
  float: left;
  width: calc(100% - ${timestampWidth});
  font-weight: 600;
  font-size: ${themeGet("fontSizes.1")};
`;

const Subject = styled.span`
  display: inline;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: ${themeGet("fontSizes.1")};
  color: ${themeGet("colors.darkGray")};
  margin-bottom: ${themeGet("space.1")};
`;

const Preview = styled.span`
  display: inline;
  text-overflow: ellipsis;
  overflow: hidden;
  height: 2.4em;
  line-height: 1.2em;
  font-size: ${themeGet("fontSizes.0")};
  color: ${themeGet("colors.gray")};
`;

const Timestamp = styled.span`
  width: ${timestampWidth};
  float: right;
  text-align: right;
  text-transform: uppercase;
  font-weight: 500;
  font-size: ${themeGet("fontSizes.0")};
  color: ${themeGet("colors.mediumGray")};
`;

const EventContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const EventDate = styled.span`
  font-size: ${themeGet("fontSizes.1")};
  color: ${themeGet("colors.gray")};
`;

function InboxListItem({ resource, isSelected }) {
  const [user] = useSelectors(getUser);
  const hasRead =
    resource.reads && resource.reads.some((r) => r.id === user.id);

  if (resource.resourceType === "Thread") {
    // Thread
    return (
      <Link to={`convos/${resource.id}`}>
        <ListItem isSelected={isSelected}>
          <FromContainer>
            <From hasRead={hasRead}>
              {resource.users.map((user) => user.firstName).join(", ")}
            </From>
            <Timestamp>
              {resource.preview &&
                format(new Date(resource.createdAt), "MMM d")}
            </Timestamp>
          </FromContainer>
          <Subject>{resource.subject}</Subject>
          <Preview>{resource.body}</Preview>
        </ListItem>
      </Link>
    );
  } else {
    // Event
    return (
      <Link to={`/events/${resource.id}`}>
        <ListItem isSelected={isSelected}>
          <FromContainer>
            <From hasRead={hasRead}>{resource.owner.fullName}</From>
            <Timestamp>
              {format(new Date(resource.createdAt), "MMM d")}
            </Timestamp>
          </FromContainer>

          <EventContainer isSelected={isSelected}>
            <Box flexDirection="column" overflow="hidden">
              <Text
                weight="semiBold"
                overflow="hidden"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                fontSize={1}
                mb={1}
              >
                {resource.name}
              </Text>
              <EventDate>
                {format(new Date(resource.createdAt), "MMM d @ h:mm a")}
              </EventDate>
            </Box>
          </EventContainer>
        </ListItem>
      </Link>
    );
  }
}

export default InboxListItem;
