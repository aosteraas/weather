import React from 'react';
import { CurrentStyles, Summary, Overview, Data, Overviews } from './styles';
import { getIcon } from '../iconMap';
import { Currently as CurrentlyProps } from '../types';
import { getUnits } from './units';

const ThermIcon = getIcon('thermometer');
const HumidIcon = getIcon('humidity');
const WindIcon = getIcon('windspeed');
const CloudCoverIcon = getIcon('cloudcover');
const GustIcon = getIcon('windGust');
const PressureIcon = getIcon('pressure');
export const Currently: React.FC<Props> = ({ currently, units }) => {
  const formatTime = (time: number): string => {
    return new Date(time * 1000).toLocaleTimeString();
  };

  const formatPercent = (value: number): string => {
    return `${value * 100}%`;
  };
  const _units = getUnits(units);
  const Icon = getIcon(currently.icon);

  return (
    <CurrentStyles>
      <Summary>
        <p>Weather at {formatTime(currently.time)}</p>
        <div>
          <Icon />
        </div>
        <p>{currently.summary}</p>
      </Summary>
      <Overviews>
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
        <Overview>
          <PressureIcon />
          <Data>
            {currently.pressure} {_units.pressure}
          </Data>
        </Overview>
      </Overviews>
    </CurrentStyles>
  );
};

interface Props {
  currently: CurrentlyProps;
  units: string;
}
