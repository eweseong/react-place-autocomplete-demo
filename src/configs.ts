const MAP_API_KEY = import.meta.env.VITE_MAP_API_KEY;
const MAP_ID = import.meta.env.VITE_MAP_ID;
const MENARA_MAYBANK_COORDINATES: google.maps.LatLngLiteral = {
  lat: 3.1473,
  lng: 101.6995,
};

export type AppConfigs = {
  mapApiKey: string;
  mapCenter: google.maps.LatLngLiteral;
  mapId: string;
};

const configs: AppConfigs = {
  mapApiKey: MAP_API_KEY,
  mapCenter: MENARA_MAYBANK_COORDINATES,
  mapId: MAP_ID,
};

export default configs;
