import {
  WiDaySunny,
  WiNightClear,
  WiRainMix,
  WiSnow,
  WiSleet,
  WiStrongWind,
  WiFog,
  WiCloud,
  WiDayCloudy,
  WiNightAltPartlyCloudy,
  WiHumidity,
  WiThermometer,
  WiWindy,
  WiCloudy
} from 'weather-icons-react';

interface IconMap {
  [key: string]: any;
}

const altIconMap: IconMap = {
  'clear-day': WiDaySunny,
  'clear-night': WiNightClear,
  rain: WiRainMix,
  snow: WiSnow,
  sleet: WiSleet,
  wind: WiWindy,
  fog: WiFog,
  cloudy: WiCloud,
  'partly-cloudy-day': WiDayCloudy,
  'partly-cloudy-night': WiNightAltPartlyCloudy,
  humidity: WiHumidity,
  thermometer: WiThermometer,
  windspeed: WiStrongWind,
  cloudcover: WiCloudy
};

export const getIcon = (icon: string) => {
  const _icon = altIconMap[icon];
  if (!_icon) {
    return WiCloud;
  }
  return _icon;
};
