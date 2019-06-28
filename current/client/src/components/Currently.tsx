import React from 'react';
import styled from 'styled-components/macro';
import { getIcon } from '../iconMap';
import { units } from './units';
const CurrentWrapper = styled.section`
  display: flex;
`;

const Summary = styled.div`
  min-height: 14rem;
  height: auto;
  display: flex;
  flex-direction: column;
  border-right: 1px solid white;
  padding-right: 1.5rem;
  margin-right: 1.5rem;
  svg {
    width: 100%;
    height: 100%;
    max-height: 14rem;
  }
  p {
    font-size: 2rem;
    text-align: center;
  }
`;
const Overview = styled.div`
  display: flex;
  align-items: center;
  svg {
    height: 2.5rem;
    width: 2.5rem;
  }
`;
export const Currently: React.FC<Props> = ({ currently }) => {
  const formatTime = (time: number): string => {
    return new Date(time * 1000).toLocaleTimeString();
  };

  const formatPercent = (value: number): string => {
    return `${value * 100}%`;
  };
  console.log(Object.keys(currently.temperature));
  const Icon = getIcon(currently.icon);
  const ThermIcon = getIcon('thermometer');
  const HumidIcon = getIcon('humidity');
  const WindIcon = getIcon('windspeed');
  const CloudCoverIcon = getIcon('cloudcover');
  return (
    <CurrentWrapper>
      <Summary>
        <p>{currently.summary}</p>
        <div>
          <Icon />
          <p>Weather at {formatTime(currently.time)}</p>
        </div>
      </Summary>
      <div>
        <Overview>
          <ThermIcon />
          <div>
            {currently.temperature} {units.si.temperature}
          </div>
        </Overview>
        <Overview>
          <HumidIcon />
          <div>{formatPercent(currently.humidity)}</div>
        </Overview>
        <Overview>
          <WindIcon /> <div>{currently.windSpeed}</div>
        </Overview>
        <Overview>
          {currently.windGust} {units.si.windGust}
        </Overview>
        <Overview>
          <CloudCoverIcon />
          <div>{formatPercent(currently.cloudCover)}</div>
        </Overview>
      </div>
    </CurrentWrapper>
  );
};

interface Props {
  currently: CurrentlyProps;
  units: string;
}

interface CurrentlyProps {
  time: number;
  summary: string;
  icon: string;
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
