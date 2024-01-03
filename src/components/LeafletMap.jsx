import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import TentPNG from '../Images/icons8-tent-48.png'

const LeafletMap = ({ latitude, longitude, zoom, height, width }) => {
  const customMarkerIcon = new L.Icon({
    iconUrl: TentPNG, // Replace with the path to your custom marker image
    iconSize: [32, 32], // Adjust the size of your custom marker
    iconAnchor: [16, 32], // Adjust the anchor point if needed
    popupAnchor: [0, -32], // Adjust the popup anchor point if needed
  });

  const markerCoordinates = [
    { id: 1, lat: 44.4268, lng: 26.1025},
    { id: 2, lat: 45.9432, lng: 24.9668},
    { id: 3, lat: 47.1597, lng: 27.5828},
  ];
  const center = [latitude,longitude];

  return (
    <MapContainer center={center} zoom={zoom} style={{ height: height, width: width }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
       {markerCoordinates.map((marker) => (
        <Marker position={[marker.lat, marker.lng]} icon={customMarkerIcon}>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LeafletMap;
