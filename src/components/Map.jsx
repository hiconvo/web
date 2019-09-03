import React, { useState, useRef, useEffect } from "react";
import { geocodeByPlaceId } from "react-places-autocomplete";

import { Box } from "./styles";

const NYC = { lat: 40.71, lng: -74.0 };

export default function Map({ placeId }) {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

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
        position: NYC
      });

      setMap(gmap);
      setMarker(gmarker);
    }
  }, [mapRef, map]);

  useEffect(() => {
    if (map && marker && placeId) {
      geocodeByPlaceId(placeId).then(results => {
        if (results.length) {
          map.setCenter(results[0].geometry.location);
          marker.setPosition(results[0].geometry.location);
        }
      });
    }
  }, [placeId, map, marker]);

  return <Box ref={mapRef} width="100%" height="20rem" borderRadius="normal" />;
}
