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

export const iconMap = [
  { icon: 'clear-day', Component: WiDaySunny },
  { icon: 'clear-night', Component: WiNightClear },
  { icon: 'rain', Component: WiRainMix },
  { icon: 'snow', Component: WiSnow },
  { icon: 'sleet', Component: WiSleet },
  { icon: 'wind', Component: WiWindy },
  { icon: 'fog', Component: WiFog },
  { icon: 'cloudy', Component: WiCloud },
  { icon: 'partly-cloudy-day', Component: WiDayCloudy },
  { icon: 'partly-cloudy-night', Component: WiNightAltPartlyCloudy },
  { icon: 'humidity', Component: WiHumidity },
  { icon: 'thermometer', Component: WiThermometer },
  { icon: 'windspeed', Component: WiStrongWind },
  { icon: 'cloudcover', Component: WiCloudy }
];

export const getIcon = (icon: string) => {
  const iconable = iconMap.find(x => x.icon === icon);
  if (iconable) {
    return iconable.Component;
  }
  return WiCloud;
};
