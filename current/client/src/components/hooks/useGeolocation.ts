import { useState, useEffect } from 'react';
import { useLocalStorage } from './';

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

  const savedLocation = restoreLocation();

  useEffect(() => {
    if (savedLocation) {
      setLocation(savedLocation);
      // getWeather
    }
  }, [savedLocation]);

  const onSuccess: PositionCallback = (pos: Position) => {
    const { latitude, longitude } = pos.coords;
    setLocation({ latitude, longitude });
    console.log(latitude, longitude);
  };

  const onError: PositionErrorCallback = (positionError: PositionError) => {};

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  };

  return { getLocation };
}
