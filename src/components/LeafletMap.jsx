import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import TentPNG from '../Images/icons8-tent-48.png'

const LeafletMap = ({ latitude, longitude, zoom, height, width, coordinates, onMapClick }) => {
  const customMarkerIcon = new L.Icon({
    iconUrl: TentPNG, // Replace with the path to your custom marker image
    iconSize: [32, 32], // Adjust the size of your custom marker
    iconAnchor: [16, 32], // Adjust the anchor point if needed
    popupAnchor: [0, -32], // Adjust the popup anchor point if needed
  });

  const handleClick = (e) => {
    const { lat, lng } = e.latlng;
    console.log("asd")
    onMapClick({ lat, lng });
  };
  const center = [latitude, longitude];
  return (


    <MapContainer center={center} zoom={zoom} style={{ height: height, width: width }} onMapClick={handleClick}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {coordinates &&
        coordinates.map((marker) => (
          <Marker position={[marker.latitude, marker.longitude]} icon={customMarkerIcon} onClick = {() => console.log("123123")}>
          </Marker>
        ))}

    </MapContainer>

  );
};

export default LeafletMap;
