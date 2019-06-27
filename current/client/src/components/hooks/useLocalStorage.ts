import { Coordinates } from './';

interface UseLocalStorage {
  saveLocation(coordinates: Coordinates): void;
  restoreLocation(): Coordinates;
}

export function useLocalStorage(): UseLocalStorage {
  const COORDINATES = 'coordinates';

  const saveLocation = (coordinates: Coordinates) => {
    localStorage.setItem(COORDINATES, JSON.stringify(coordinates));
  };

  const restoreLocation = () => {
    const coords = localStorage.getItem(COORDINATES);
    if (coords) {
      return JSON.parse(coords);
    }
    return { latitude: null, longitude: null };
  };

  return { saveLocation, restoreLocation };
}
