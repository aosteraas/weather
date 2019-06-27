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
  WiNightAltPartlyCloudy
} from 'weather-icons-react';

export const iconMap = [
  { icon: 'clear-day', Component: WiDaySunny },
  { icon: 'clear-night', Component: WiNightClear },
  { icon: 'rain', Component: WiRainMix },
  { icon: 'snow', Component: WiSnow },
  { icon: 'sleet', Component: WiSleet },
  { icon: 'wind', Component: WiStrongWind },
  { icon: 'fog', Component: WiFog },
  { icon: 'cloudy', Component: WiCloud },
  { icon: 'partly-cloudy-day', Component: WiDayCloudy },
  { icon: 'partly-cloudy-night', Component: WiNightAltPartlyCloudy }
];
