//* LIbs
import { memo, useEffect, useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { toast } from 'react-hot-toast';
import { Audio } from 'react-loader-spinner';

//* Reducers
import { setPlaceRequest } from 'app/weather/WeatherSlice';

//* Hooks
import { useAppDispatch } from 'hooks';

//* Types
import { ICoord } from 'app/type/weatherTypes';

//* Utils
import { autoCompleteStyle, autoCompleteStyleActive } from 'utils';

//* Style
import s from './Sidebar.module.scss';

type FrameProps = {
  currentName: string;
};

const AutocompleteCountry = ({ currentName }: FrameProps) => {
  const [address, setAddress] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    setAddress(currentName);
  }, [currentName]);

  const onError = () => {
    if (window.google.maps.places.PlacesServiceStatus) {
      toast.error('Invalid data');
    }
  };

  const handleSelect = async (value: any) => {
    geocodeByAddress(value)
      .then((results: any[]) => {
        return getLatLng(results[0]);
      })
      .then((latLng: ICoord) => {
        dispatch(setPlaceRequest(latLng));
      })
      .catch(() => toast.error('Enter city name'));
  };

  const renderFunc = ({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
    <div className={s.dropdown}>
      <input {...getInputProps({ placeholder: 'Type address' })} />

      <ul className={s.dropdown__content}>
        {loading ? <Audio color="#7ca2b1" height={50} width={50} /> : null}
        {suggestions.map(suggestion => {
          const style = suggestion.active ? autoCompleteStyleActive : autoCompleteStyle;
          return (
            <li key={suggestion.placeId} {...getSuggestionItemProps(suggestion, { style })}>
              {suggestion.description}
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <PlacesAutocomplete
      value={address}
      onChange={setAddress}
      onSelect={handleSelect}
      onError={onError}
    >
      {renderFunc}
    </PlacesAutocomplete>
  );
};

export default memo(AutocompleteCountry);
