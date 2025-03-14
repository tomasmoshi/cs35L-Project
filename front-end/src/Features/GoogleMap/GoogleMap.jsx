import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 48.8584,
  lng: 2.2945,
};

const GoogleMapComponent = ({ onLocationSelect }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBq_oayKOkXgVquQYgixG9X2DQJB9B13pg", // Replace with your actual API key
  });

  const [markerPosition, setMarkerPosition] = useState(defaultCenter);
  const [map, setMap] = useState(null);

  // Get user's current location and update marker position.
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setMarkerPosition(currentPos);
          if (onLocationSelect) {
            onLocationSelect(currentPos);
          }
        },
        (error) => {
          console.error("Error fetching location, using default:", error);
        }
      );
    }
  }, [onLocationSelect]);

  // Once the map is loaded and markerPosition is set, trigger resize and recenter.
  useEffect(() => {
    if (isLoaded && map) {
      setTimeout(() => {
        window.google.maps.event.trigger(map, "resize");
        map.setCenter(markerPosition);
      }, 100);
    }
  }, [isLoaded, markerPosition, map]);

  // When user clicks on the map, update marker position.
  const handleMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    const newPosition = { lat, lng };
    setMarkerPosition(newPosition);
    console.log("Map clicked at:", newPosition);
    if (onLocationSelect) {
      onLocationSelect(newPosition);
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={markerPosition}
      zoom={15}
      onClick={handleMapClick}
      onLoad={(mapInstance) => setMap(mapInstance)}
    >
      <Marker
        position={markerPosition}
        draggable
        onDragEnd={(e) => {
          const lat = e.latLng.lat();
          const lng = e.latLng.lng();
          const newPosition = { lat, lng };
          setMarkerPosition(newPosition);
          console.log("Marker dragged to:", newPosition);
          if (onLocationSelect) {
            onLocationSelect(newPosition);
          }
        }}
      />
    </GoogleMap>
  );
};

export default GoogleMapComponent;
