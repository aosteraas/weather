interface UseGeolocation {
  getLocation(): void;
}
interface Postion {
  coords: Coordinates;
}
interface Coordinates {
  latitude: number;
  longitude: number;
}
export function useGeolocation(): UseGeolocation {
  const getLocation = () => {};
  return { getLocation };
}
