import React, { useMemo, useRef } from 'react';
import PropTypes from 'proptypes';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';

L.Icon.Default.imagePath = '/images/';

// @todo fly to marker when position changes

export default function Map(props) {
  const { position, title, onEdit, zoom } = props;
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          onEdit(marker.getLatLng());
        }
      },
    }),
    []
  );

  const editable = onEdit
    ? {
        draggable: true,
        eventHandlers,
        ref: markerRef,
      }
    : {};

  return (
    <MapContainer
      center={position}
      zoom={zoom || 10}
      scrollWheelZoom={false}
      style={{ height: 300 }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker {...editable} position={position}>
        {title && <Popup>{title}</Popup>}
      </Marker>
    </MapContainer>
  );
}

Map.propTypes = {
  position: PropTypes.array.isRequired,
  title: PropTypes.string,
  onEdit: PropTypes.func,
  zoom: PropTypes.number,
};
