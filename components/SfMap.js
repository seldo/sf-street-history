'use client';

import { useEffect } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  useMap,
} from '@vis.gl/react-google-maps';
import styles from './SfMap.module.css';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const MAP_ID = 'sf-street-history';

const DEFAULT_CENTER = { lat: 37.76555, lng: -122.447558 };
const DEFAULT_ZOOM = 13;

function MapController({ location }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !location) return;
    map.panTo(location.center);
    map.setZoom(location.zoom);
  }, [map, location]);

  return null;
}

export default function SfMap({ location }) {
  const center = location?.center ?? DEFAULT_CENTER;
  const zoom = location?.zoom ?? DEFAULT_ZOOM;

  if (!API_KEY) {
    return (
      <div className={styles.missingKey}>
        Missing <code>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code>.
      </div>
    );
  }

  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        mapId={MAP_ID}
        defaultCenter={center}
        defaultZoom={zoom}
        gestureHandling="greedy"
        disableDefaultUI={false}
        streetViewControl
        mapTypeControl={false}
        fullscreenControl={false}
        className={styles.map}
      >
        {location?.place ? (
          <AdvancedMarker position={location.center}>
            <div
              className={styles.marker}
              dangerouslySetInnerHTML={{ __html: location.place }}
            />
          </AdvancedMarker>
        ) : null}
        <MapController location={location} />
      </Map>
    </APIProvider>
  );
}
