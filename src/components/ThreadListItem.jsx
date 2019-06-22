import React from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { themeGet } from "styled-system";

const timestampWidth = "6rem";

const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  padding: ${themeGet("space.2")};
  cursor: pointer;
  transition: all ease ${themeGet("animations.fast")};
  border-bottom: 0.1rem solid ${themeGet("colors.lightGray")};
  overflow: hidden;
  width: calc(100% - ${themeGet("space.2")} * 2);

  &:hover {
    background-color: ${themeGet("colors.snow")};
  }
`;

const FromContainer = styled.div`
  margin-bottom: ${themeGet("space.1")};
`;

const From = styled.span`
  display: inline;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: ${themeGet("colors.bodytext")};
  float: left;
  width: calc(100% - ${timestampWidth});
  font-weight: bold;
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
  color: ${themeGet("colors.mediumGray")};
`;

const Timestamp = styled.span`
  width: ${timestampWidth};
  float: right;
  text-align: right;
  text-transform: uppercase;
  font-weight: 500;
  font-size: ${themeGet("fontSizes.0")};
  color: ${themeGet("colors.gray")};
`;

export default function ThreadListItem({ thread }) {
  return (
    <ListItem>
      <FromContainer>
        <From>{thread.users.map(user => user.firstName).join(",")}</From>
        <Timestamp>
          {thread.preview && format(thread.preview.timestamp, "MMM D")}
        </Timestamp>
      </FromContainer>
      <Subject>{thread.subject}</Subject>
      <Preview>{thread.preview && thread.preview.body}</Preview>
    </ListItem>
  );
}
