import { useState, useEffect } from 'react';
import { useLocalStorage, useWeather } from './';

interface UseGeolocation {
  getLocation(): void;
}
interface Position {
  coords: Coordinates;
  timestamp: number;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}
export function useGeolocation(): UseGeolocation {
  const [location, setLocation] = useState();
  const { saveLocation, restoreLocation } = useLocalStorage();
  const { getWeather } = useWeather();
  const savedLocation = restoreLocation();

  useEffect(() => {
    if (savedLocation) {
      setLocation(savedLocation);
      getWeather(location);
    }
  }, [savedLocation]);

  const onSuccess: PositionCallback = (pos: Position) => {
    setLocation(pos.coords);
    saveLocation(pos.coords);
    getWeather(pos.coords);
  };

  const onError: PositionErrorCallback = (positionError: PositionError) => {
    // TODO alert to error
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  };

  return { getLocation };
}
