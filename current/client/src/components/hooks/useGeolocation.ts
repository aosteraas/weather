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
  const onSuccess: PositionCallback = (pos: Position) => {
    // saveLocation(pos.coords);
    // getWeather(pos.coords);
  };

  const onError: PositionErrorCallback = (positionError: PositionError) => {
    // TODO alert to error
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  };

  return { getLocation };
}
