interface UnitMap {
  [key: string]: Units;
}

interface Units {
  nearestStormDistance: string;
  precipIntensity: string;
  precipIntensityMax: string;
  precipAccumulation: string;
  temperature: string;
  temperatureMin: string;
  temperatureMax: string;
  apparentTemperature: string;
  dewPoint: string;
  windSpeed: string;
  windGust: string;
  pressure: string;
  visibility: string;
  [key: string]: string;
}
const si: Units = {
  nearestStormDistance: 'Km',
  precipIntensity: 'ml/h.',
  precipIntensityMax: 'ml/h',
  precipAccumulation: 'cm',
  temperature: 'ºC',
  temperatureMin: 'ºC',
  temperatureMax: 'ºC',
  apparentTemperature: 'ºC',
  dewPoint: 'ºC',
  windSpeed: 'm/s',
  windGust: 'm/s',
  pressure: 'hPa',
  visibility: 'mph'
};

const us: Units = {
  nearestStormDistance: 'mi',
  precipIntensity: 'in/h.',
  precipIntensityMax: 'in/h',
  precipAccumulation: 'in',
  temperature: 'ºF',
  temperatureMin: 'ºF',
  temperatureMax: 'ºF',
  apparentTemperature: 'ºF',
  dewPoint: 'ºF',
  windSpeed: 'ft/s',
  windGust: 'ft/s',
  pressure: 'hPa',
  visibility: 'mi'
};

const units: UnitMap = {
  si: { ...si },
  ca: {
    ...si,
    windSpeed: 'Km/h',
    windGust: 'Km/h'
  },
  uk2: {
    ...si,
    nearestStormDistance: 'mph',
    visibility: 'mph',
    windSpeed: 'mph',
    windGust: 'mph'
  },
  us: { ...us }
};

export const getUnits = (key: string | number): Units => {
  return units[key];
};
