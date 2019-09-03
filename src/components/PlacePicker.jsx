import React from "react";
import PlacesAutocomplete from "react-places-autocomplete";

import {
  Box,
  Text,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteDropDown
} from "./styles";

function DropDownItem({ suggestion, ...rest }) {
  return (
    <li {...rest}>
      <AutoCompleteItem>
        <Text>{suggestion.description}</Text>
      </AutoCompleteItem>
    </li>
  );
}

export default function PlacePicker({ value, onChange, onSelect }) {
  return (
    <PlacesAutocomplete value={value} onChange={onChange} onSelect={onSelect}>
      {({ getInputProps, suggestions, getSuggestionItemProps }) => (
        <Box position="relative">
          <AutoCompleteInput type="text" {...getInputProps()} />
          <Box position="absolute" left="0" top="100%">
            <AutoCompleteDropDown isOpen={suggestions.length > 0}>
              {suggestions.map(suggestion => (
                <DropDownItem
                  suggestion={suggestion}
                  key={suggestion.id}
                  {...getSuggestionItemProps(suggestion)}
                />
              ))}
            </AutoCompleteDropDown>
          </Box>
        </Box>
      )}
    </PlacesAutocomplete>
  );
}
