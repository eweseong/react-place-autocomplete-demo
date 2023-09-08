import { Spin } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useScript } from 'usehooks-ts';
import configs from '../configs';
import PlaceAutocomplete from '../features/place-autocomplete/place-autocomplete';
import styles from './app.module.scss';

const { mapApiKey, mapCenter, mapId } = configs;

export function App() {
  // hooks
  // use JavaScript API instead of web service because AutoComplete API doesn't support CORS as mentioned here https://issuetracker.google.com/issues/35827564
  const apiStatus = useScript(
    `https://maps.googleapis.com/maps/api/js?key=${mapApiKey}&libraries=geocoding,places&callback=Function.prototype`,
    {
      removeOnUnmount: false,
    }
  );

  // local states
  const isAppReady = apiStatus === 'ready';
  const [map, setMap] = useState<google.maps.Map>();
  const [, setMarker] = useState<google.maps.Marker>();

  // utils
  const replaceMarker = useCallback((newMarker: google.maps.Marker) => {
    setMarker((prevMarker) => {
      prevMarker?.setMap(null);
      return newMarker;
    });
  }, []);

  useEffect(() => {
    async function initMap() {
      // lazy load libraries
      const { Map } = (await google.maps.importLibrary('maps')) as google.maps.MapsLibrary;
      const map = new Map(document.getElementById('map') as HTMLElement, {
        center: mapCenter,
        disableDefaultUI: true,
        mapId: mapId,
        zoom: 15,
      });
      const marker = new google.maps.Marker({
        map: map,
        position: mapCenter,
        title: 'My Location',
      });
      replaceMarker(marker);
      setMap(map);
    }

    if (apiStatus === 'ready') {
      initMap();
    }
  }, [apiStatus, replaceMarker]);

  return (
    <Spin size="large" spinning={!isAppReady} tip="Loading...">
      <main className={styles.app}>
        <div className={styles.sticky}>
          <PlaceAutocomplete
            label="Search Places"
            onSelect={(placeId) => {
              if (map && placeId) {
                new google.maps.Geocoder().geocode({ placeId }).then(({ results }) => {
                  const [result] = results;

                  if (result) {
                    const infowindow = new google.maps.InfoWindow();
                    const marker = new google.maps.Marker({
                      map,
                      position: result.geometry.location,
                    });
                    map.setCenter(result.geometry.location);
                    infowindow.setContent(result.formatted_address);
                    infowindow.open(map, marker);
                    replaceMarker(marker);
                  } else {
                    window.alert('No results found');
                  }
                });
              }
            }}
          />
        </div>
        <div id="map" className={styles.map}></div>
      </main>
    </Spin>
  );
}

export default App;
