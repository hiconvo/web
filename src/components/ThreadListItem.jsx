import React from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { themeGet } from "styled-system";

const ListItem = styled.li`
  display: flex;
  padding: ${themeGet("space.3")} ${themeGet("space.5")};
  cursor: pointer;
  justify-content: center;
  border-bottom: 0.1rem solid ${themeGet("colors.trueWhite")};
  border-top: 0.1rem solid ${themeGet("colors.snow")};
  transition: all ease ${themeGet("animations.fast")};

  &:hover {
    background-color: ${themeGet("colors.snow")};
    border-bottom: 0.1rem solid ${themeGet("colors.lightGray")};
    border-top: 0.1rem solid ${themeGet("colors.lightGray")};
  }
`;

const FromContainer = styled.div`
  max-width: 16rem;
  width: 20%;
  flex-shrink: 0;
`;

const From = styled.span`
  color: ${themeGet("colors.bodytext")};
  font-weight: 500;
`;

const Subject = styled.span`
  display: inline;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-right: 2rem;
  color: ${themeGet("colors.darkGray")};
`;

const Preview = styled.span`
  display: inline;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: ${themeGet("colors.mediumGray")};
`;

const Content = styled.div`
  display: flex;
  flex-grow: 1;
  overflow: hidden;
`;

const Timestamp = styled.span`
  width: 6rem;
  flex-shrink: 0;
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
        {thread.users.map(user => (
          <From>{user.firstName}</From>
        ))}
      </FromContainer>
      <Content>
        <Subject>{thread.subject}</Subject>
        <Preview>{thread.preview && thread.preview.body}</Preview>
      </Content>
      <Timestamp>
        {thread.preview && format(thread.preview.timestamp, "MMM D")}
      </Timestamp>
    </ListItem>
  );
}
