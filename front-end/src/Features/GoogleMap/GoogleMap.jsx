import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
  position: "relative", // necessary for overlay positioning
};

const defaultCenter = {
  lat: 48.8584,
  lng: 2.2945,
};

const GoogleMapComponent = ({ onLocationSelect, initialCenter, readOnly = false }) => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    console.log(apiKey)
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: apiKey,
    });

  const [markerPosition, setMarkerPosition] = useState(initialCenter || defaultCenter);
  const [map, setMap] = useState(null);
  const [address, setAddress] = useState("Fetching address...");

  // If no initialCenter and interactive, try to get user's current location
  useEffect(() => {
    if (
      !initialCenter &&
      !readOnly &&
      markerPosition.lat === defaultCenter.lat &&
      markerPosition.lng === defaultCenter.lng &&
      navigator.geolocation
    ) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setMarkerPosition(currentPos);
          if (onLocationSelect) onLocationSelect(currentPos);
        },
        (error) => {
          console.error("Error fetching location, using default:", error);
        }
      );
    }
  }, [initialCenter, readOnly, markerPosition, onLocationSelect]);

  // Resize and recenter the map when markerPosition changes
  useEffect(() => {
    if (isLoaded && map) {
      setTimeout(() => {
        window.google.maps.event.trigger(map, "resize");
        map.setCenter(markerPosition);
      }, 100);
    }
  }, [isLoaded, markerPosition, map]);

  // Reverse geocode the marker position to get an address
  useEffect(() => {
    if (isLoaded && window.google && markerPosition) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: markerPosition }, (results, status) => {
        console.log("Geocoder status:", status, "results:", results);
        if (status === "OK" && results && results.length > 0) {
          setAddress(results[0].formatted_address);
        } else {
          console.error("Geocoder failed due to:", status);
          setAddress("No address found");
        }
      });
    }
  }, [isLoaded, markerPosition]);

  // Handle map click events (if interactive)
  const handleMapClick = (e) => {
    if (readOnly) return;
    const newPosition = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    setMarkerPosition(newPosition);
    if (onLocationSelect) onLocationSelect(newPosition);
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div style={containerStyle}>
      {/* Address overlay */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          background: "rgba(255,255,255,0.95)",
          padding: "8px 12px",
          borderRadius: "4px",
          fontSize: "14px",
          maxWidth: "90%",
          textAlign: "center",
          boxShadow: "0 2px 6px rgba(0,0,0,0.3)"
        }}
      >
        {address}
      </div>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={markerPosition}
        zoom={15}
        onClick={handleMapClick}
        onLoad={(mapInstance) => setMap(mapInstance)}
      >
        <Marker
          position={markerPosition}
          draggable={!readOnly}
          onDragEnd={(e) => {
            if (readOnly) return;
            const newPosition = { lat: e.latLng.lat(), lng: e.latLng.lng() };
            setMarkerPosition(newPosition);
            if (onLocationSelect) onLocationSelect(newPosition);
          }}
        />
      </GoogleMap>
    </div>
  );
};

export default GoogleMapComponent;
