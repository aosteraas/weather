import { useState, useEffect } from 'react';
import { useLocalStorage } from './';

interface Position {
  coords: Coordinates;
  timestamp: number;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

interface UseWeather {
  getWeather(coordinates: Coordinates): void;
  getLocation(): void;
  error: boolean;
  weather?: any;
}

export function useWeather(): UseWeather {
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(false);
  const { saveLocation, restoreLocation } = useLocalStorage();

  const savedLocation = restoreLocation();

  useEffect(() => {
    if (savedLocation.latitude && savedLocation.longitude) {
      getWeather(savedLocation);
    }
  }, [savedLocation.latitude, savedLocation.longitude]);

  const getWeather = async (coordinates: Coordinates) => {
    //
    const response = await fetch('/post', { method: 'POST', body: JSON.stringify(coordinates) });
    if (response.ok) {
      const data = await response.json();

      setWeather(data);
    } else {
      setError(true);
    }
  };

  const onSuccess: PositionCallback = (position: Position) => {
    const { latitude, longitude } = position.coords;
    saveLocation({ latitude, longitude });
    getWeather({ latitude, longitude });
  };

  const onError: PositionErrorCallback = (positionError: PositionError) => {
    // TODO alert to error
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  };

  return { getWeather, getLocation, weather, error };
}
