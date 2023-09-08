import { useEffect, useState } from 'react';
import { useEffectOnce } from 'usehooks-ts';
import styles from './map.module.scss';

export interface MapProps {
  center: google.maps.LatLngLiteral;
  id: string;
  marker?: google.maps.Marker;
  zoom?: number;
}

export function Map({ center, id, marker, zoom = 15 }: MapProps) {
  const [map, setMap] = useState<google.maps.Map>();

  useEffectOnce(() => {
    async function loadMap() {
      const { Map } = (await google.maps.importLibrary('maps')) as google.maps.MapsLibrary;
      setMap(
        new Map(document.getElementById('map') as HTMLElement, {
          center,
          disableDefaultUI: true,
          mapId: id,
          zoom,
        })
      );
    }

    loadMap();
  });

  useEffect(() => {
    const markerPosition = marker?.getPosition();

    if (map && markerPosition !== undefined) {
      map.setCenter(markerPosition!);
      marker!.setMap(map);
    }

    return () => {
      marker?.setMap(null);
    };
  }, [map, marker]);

  return <div id="map" className={styles.map}></div>;
}

export default Map;
