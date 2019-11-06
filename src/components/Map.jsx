import React, { useState, useRef, useEffect } from "react";
import { geocodeByPlaceId } from "react-places-autocomplete";

import { getGoogleMapsUrl } from "../utils";
import { Box } from "./styles";

const NYC = { lat: 40.71, lng: -74.0 };

export default function Map({ placeId, lat, lng, noLink }) {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const geoloc = lat && lng && { lat, lng };

  useEffect(() => {
    if (!map && mapRef.current) {
      const gmap = new window.google.maps.Map(mapRef.current, {
        zoom: 11,
        center: NYC,
        clickableIcons: false,
        disableDefaultUI: true,
        draggable: false
      });
      const gmarker = new window.google.maps.Marker({
        map: gmap,
        position: geoloc || NYC
      });

      setMap(gmap);
      setMarker(gmarker);
    }
  }, [mapRef, map, geoloc]);

  useEffect(() => {
    if (map && marker && placeId) {
      function setMapLocation(__geoloc) {
        map.setCenter(__geoloc);
        marker.setPosition(__geoloc);
        map.setZoom(15);
      }

      if (!geoloc) {
        geocodeByPlaceId(placeId).then(results => {
          if (results.length) {
            setMapLocation(results[0].geometry.location);
          }
        });
      } else {
        setMapLocation(geoloc);
      }
    }
  }, [placeId, map, marker, geoloc]);

  function handleClick() {
    !noLink && window.open(getGoogleMapsUrl(lat, lng, placeId), "_blank");
  }

  return (
    <Box
      ref={mapRef}
      onClick={handleClick}
      width="100%"
      height="20rem"
      borderRadius="normal"
      cursor="pointer"
    />
  );
}
