const si = {
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

const us = {
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

export const units = {
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
