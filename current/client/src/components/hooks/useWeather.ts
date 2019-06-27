import { Coordinates } from './';

interface UseWeather {
  getWeather(coordinates: Coordinates): void;
}

export function useWeather(): UseWeather {
  const getWeather = async (coordinates: Coordinates) => {
    //
    const response = await fetch('/post', { method: 'POST', body: JSON.stringify(coordinates) });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  };
  return { getWeather };
}
