import React from "react";
import { useHistory } from "react-router-dom";

import LinkSearchField from "./LinksSearch";
import LinksFilterMenu from "./LinksFilterMenu";
import {
  Text,
  Box,
  LinkButton,
  IconButton,
  Icon,
  Dropdown
} from "../components/styles";

export default function LinksChrome({ onRefresh, withBackButton, isFetching }) {
  const history = useHistory();

  function handleBack() {
    history.push("/links");
  }

  return (
    <Box flexDirection="row" justifyContent="space-between" mb={4}>
      <Box flexDirection="row" justifyContent="flex-start">
        {withBackButton && (
          <IconButton
            iconName="chevron_left"
            text="Back"
            mr={2}
            onClick={handleBack}
          />
        )}
        <Dropdown
          side="left"
          renderAnchor={({ onClick }) => (
            <IconButton
              mobileHideText={true}
              onClick={onClick}
              iconName="search"
              text="Search"
              mr={2}
            />
          )}
        >
          {({ isOpen, isVisible, handleToggle }) => (
            <LinkSearchField
              isOpen={isOpen}
              isVisible={isVisible}
              onClose={handleToggle}
            />
          )}
        </Dropdown>
        <Dropdown
          side="left"
          renderAnchor={({ onClick }) => (
            <IconButton
              mobileHideText={true}
              onClick={onClick}
              iconName="filter_alt"
              text="Filter"
              mr={2}
            />
          )}
        >
          {({ isOpen, isVisible, handleToggle }) => (
            <LinksFilterMenu
              isOpen={isOpen}
              isVisible={isVisible}
              onClose={handleToggle}
            />
          )}
        </Dropdown>
        {onRefresh && (
          <IconButton
            mobileHideText={true}
            iconName="refresh"
            text="Refresh"
            onClick={onRefresh}
            disabled={isFetching}
            mr={2}
          />
        )}
      </Box>
      <Box>
        <LinkButton variant="action" to="/notes/new">
          <Icon name="edit" />
          <Text ml={2} color="inherit" display={["none", "inline"]}>
            New Note
          </Text>
        </LinkButton>
      </Box>
    </Box>
  );
}
