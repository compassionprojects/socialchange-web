import React, { useEffect, useMemo, useRef } from 'react';
import PropTypes from 'proptypes';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';

L.Icon.Default.imagePath = '/images/';

// @todo fly to marker when position changes

function LocationMarker({ title, position, onEdit }) {
  const map = useMap();
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

  // fly to marker when position changes
  useEffect(() => {
    map.flyTo(position);
  }, [position]);

  // to make the marker draggable
  const editable = onEdit
    ? {
        draggable: true,
        eventHandlers,
        ref: markerRef,
      }
    : {};

  return (
    <Marker {...editable} position={position}>
      {title && <Popup>{title}</Popup>}
    </Marker>
  );
}

export default function Map(props) {
  const { position, zoom, height } = props;

  return (
    <MapContainer
      center={position}
      zoom={zoom || 10}
      scrollWheelZoom={false}
      style={{ height: height || 300 }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {props.children ? props.children : <LocationMarker {...props} />}
    </MapContainer>
  );
}

Map.propTypes = {
  position: PropTypes.array.isRequired,
  title: PropTypes.string,
  onEdit: PropTypes.func,
  zoom: PropTypes.number,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

LocationMarker.propTypes = {
  position: PropTypes.array.isRequired,
  title: PropTypes.string,
  onEdit: PropTypes.func,
};
