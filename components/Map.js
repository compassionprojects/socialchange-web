import React from 'react';
import PropTypes from 'proptypes';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';

L.Icon.Default.imagePath = '/images/';

export default function Map(props) {
  const { position, title } = props;
  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: 300 }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>{title}</Popup>
      </Marker>
    </MapContainer>
  );
}

Map.propTypes = {
  position: PropTypes.array,
  title: PropTypes.string,
};
