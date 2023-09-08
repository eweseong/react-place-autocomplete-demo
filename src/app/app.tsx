import { LoadingOutlined } from '@ant-design/icons';
import { Skeleton } from 'antd';
import { useState } from 'react';
import { useScript } from 'usehooks-ts';
import configs from '../configs';
import Map from '../features/map/map';
import PlaceAutocomplete from '../features/place-autocomplete/place-autocomplete';
import styles from './app.module.scss';

const { mapApiKey, mapCenter, mapId } = configs;

export function App() {
  // use JavaScript API instead of web service because AutoComplete API doesn't support CORS as mentioned here https://issuetracker.google.com/issues/35827564
  const apiStatus = useScript(
    `https://maps.googleapis.com/maps/api/js?key=${mapApiKey}&libraries=geocoding,places&callback=Function.prototype`,
    {
      removeOnUnmount: false,
    }
  );
  const isAppReady = apiStatus === 'ready';
  const [marker, setMarker] = useState<google.maps.Marker>();

  if (!isAppReady) {
    return (
      <Skeleton.Node className={styles.skeleton} active>
        <LoadingOutlined className={styles.icon} spin />
      </Skeleton.Node>
    );
  }

  return (
    <main className={styles.app}>
      <div className={styles.sticky}>
        <PlaceAutocomplete
          label="Search Places"
          onSelect={(placeId) => {
            if (placeId) {
              new google.maps.Geocoder().geocode({ placeId }).then(({ results }) => {
                const [result] = results;

                if (result) {
                  setMarker(
                    new google.maps.Marker({
                      position: result.geometry.location,
                    })
                  );
                } else {
                  window.alert('No results found');
                }
              });
            }
          }}
        />
      </div>
      <Map center={mapCenter} id={mapId} marker={marker ?? new google.maps.Marker({ position: mapCenter })} />
    </main>
  );
}

export default App;
