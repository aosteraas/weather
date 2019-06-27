import { useState } from 'react';

interface UseGeolocation {
  getLocation(): void;
}
interface Position {
  coords: Coordinates;
  timestamp: number;
}
interface Coordinates {
  latitude: number;
  longitude: number;
}
export function useGeolocation(): UseGeolocation {
  const [location, setLocation] = useState();

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
