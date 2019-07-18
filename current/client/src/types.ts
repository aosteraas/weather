interface Base {
  summary: string;
  icon: string;
  time: number;
}

export interface Hourly extends Base {
  data: HourlyData[];
}
export interface Daily extends Base {
  data: DailyData[];
}

export interface Currently extends Base {
  nearestStormDistance: number;
  nearestStormBearing: number;
  precipIntensity: number;
  precipProbability: number;
  temperature: number;
  apparentTemperature: number;
  dewPoint: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windGust: number;
  windBearing: number;
  cloudCover: number;
  uvIndex: number;
  visibility: number;
  ozone: number;
}

interface BaseData extends Base {
  precipIntensity: number;
  precipProbability: number;
  windSpeed: number;
  windGust: number;
  uvIndex: number;
  humidity: number;
  pressure: number;
  dewPoint: number;
  visibility: number;
  ozone: number;
  cloudCover: number;
  windBearing: number;
  precipType: string;
}

export interface HourlyData extends BaseData {
  temperature: number;
  apparentTemperature: number;
}

export interface DailyData extends BaseData {
  sunriseTime: number;
  sunsetTime: number;
  moonPhase: number;
  precipIntensityMax: number;
  precipIntensityMaxTime: number;
  temperatureHigh: number;
  temperatureHighTime: number;
  temperatureLow: number;
  temperatureLowTime: number;
  apparentTemperatureHigh: number;
  apparentTemperatureHighTime: number;
  apparentTemperatureLow: number;
  apparentTemperatureLowTime: number;
  windGustTime: number;
  uvIndexTime: number;
  temperatureMin: number;
  temperatureMinTime: number;
  temperatureMax: number;
  temperatureMaxTime: number;
  apparentTemperatureMin: number;
  apparentTemperatureMinTime: number;
  apparentTemperatureMax: number;
  apparentTemperatureMaxTime: number;
  [key: string]: string | number;
}

export interface Flags {
  sources: string[];
  'nearest-station': number;
  units: string;
}

export interface Root {
  latitude: number;
  longitude: number;
  timezone: string;
  currently: Currently;
  hourly: Hourly;
  daily: Daily;
  flags: Flags;
  offset: number;
}
