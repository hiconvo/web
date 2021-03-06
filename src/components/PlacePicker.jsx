import React from "react";
import PlacesAutocomplete from "react-places-autocomplete";

import {
  Box,
  Text,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteDropDown
} from "./styles";

export const videoChatPlaces = [
  { description: "Zoom", placeId: "zoom" },
  { description: "FaceTime", placeId: "facetime" },
  { description: "WhatsApp", placeId: "whatsapp" },
  { description: "Skype", placeId: "skype" },
  { description: "Google Hangouts", placeId: "googlehangouts" },
  { description: "Other", placeId: "other" }
];

function DropDownItem({ suggestion, key, ...rest }) {
  return (
    <li key={key} {...rest}>
      <AutoCompleteItem>
        <Text>{suggestion.description}</Text>
      </AutoCompleteItem>
    </li>
  );
}

export default function PlacePicker({
  value,
  onChange,
  onSelect,
  tabIndex,
  inputComponent = AutoCompleteInput
}) {
  const InputComponent = inputComponent;

  return (
    <PlacesAutocomplete
      value={value}
      onChange={onChange}
      onSelect={onSelect}
      debounce={400}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps }) => (
        <Box position="relative" width="100%" key="placesautocomplete">
          <InputComponent
            name="Where"
            type="text"
            fontSize={2}
            placeholder="Type a place or address"
            tabIndex={tabIndex}
            {...getInputProps()}
          />
          <Box position="absolute" left="0" top="100%">
            <AutoCompleteDropDown isOpen={suggestions.length > 0}>
              {suggestions.map((suggestion) => (
                <DropDownItem
                  suggestion={suggestion}
                  key={suggestion.id}
                  {...getSuggestionItemProps(suggestion)}
                />
              ))}
              {videoChatPlaces.map((suggestion) => (
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
