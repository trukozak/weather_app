//* Libs
import { GoogleMap, Marker } from '@react-google-maps/api';
import { useCallback, useRef } from 'react';

//* Selectors
import { weatherSelector } from 'app/weather/WeatherSlice';

//* Hooks
import { useAppSelector } from 'hooks';

//* Utils
import { mapContainerStyle } from 'utils';

const Map = () => {
  const { placeRequest } = useAppSelector(weatherSelector);
  const mapRef = useRef(null);
  const center = { lat: placeRequest.lat, lng: placeRequest.lng };

  const onLoad = useCallback(map => {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  return (
    <div className="googleMap">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={11}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
};

export default Map;
