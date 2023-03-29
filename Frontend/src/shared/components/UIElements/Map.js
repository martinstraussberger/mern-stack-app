import React, { useRef, useEffect } from 'react';

import './Map.css';

export const Map = (props) => {
  const mapRef = useRef();
  const { center, zoom } = props;

  // will run in the first render cycle but after the react jsx code (html, js)
  useEffect(() => {
    // .current holds the actual pointer
    const map = new window.google.maps.Map(mapRef.current, {
      zoom: props.zoom,
      center: props.center,
    });

    new window.google.maps.Marker({ position: props.center, map: map });
  }, [center, zoom]);

  return (
    <div ref={mapRef} className={`map ${props.className}`} style={props.style}></div>
  );
};
