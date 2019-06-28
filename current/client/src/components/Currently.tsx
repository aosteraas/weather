import React from 'react';
import styled from 'styled-components/macro';
import { getIcon } from '../iconMap';
import { getUnits } from './units';
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

  border: 1px solid ${p => p.theme.white};
  svg {
    height: 2.5rem;
    width: 2.5rem;
  }
`;
const Data = styled.div`
  flex: 1;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: right;
  color: ${p => p.theme.black};
  background: ${p => p.theme.white};
`;
export const Currently: React.FC<Props> = ({ currently, units }) => {
  const formatTime = (time: number): string => {
    return new Date(time * 1000).toLocaleTimeString();
  };

  const formatPercent = (value: number): string => {
    return `${value * 100}%`;
  };
  const _units = getUnits(units);
  const Icon = getIcon(currently.icon);
  const ThermIcon = getIcon('thermometer');
  const HumidIcon = getIcon('humidity');
  const WindIcon = getIcon('windspeed');
  const CloudCoverIcon = getIcon('cloudcover');
  const GustIcon = getIcon('windGust');
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
          <Data>
            {currently.temperature} {_units.temperature}
          </Data>
        </Overview>
        <Overview>
          <HumidIcon />
          <Data>{formatPercent(currently.humidity)}</Data>
        </Overview>
        <Overview>
          <WindIcon />
          <Data>
            {currently.windSpeed}
            {_units.windSpeed}
          </Data>
        </Overview>
        <Overview>
          <GustIcon />
          <Data>
            {currently.windGust} {_units.windGust}
          </Data>
        </Overview>
        <Overview>
          <CloudCoverIcon />
          <Data>{formatPercent(currently.cloudCover)}</Data>
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
