import React from 'react';
import { CurrentStyles, Summary, Overview, Data, Overviews } from './styles';
import { getIcon } from '../lib/iconMap';
import { Currently as CurrentlyProps } from '../types';
import { getUnits } from './units';
import { formatTime, formatPercent } from '../lib/formatter';
// TODO make icon generation less bad
const ThermIcon = getIcon('thermometer');
const HumidIcon = getIcon('humidity');
const WindIcon = getIcon('windspeed');
const CloudCoverIcon = getIcon('cloudcover');
const GustIcon = getIcon('windGust');
const PressureIcon = getIcon('pressure');

export const Currently: React.FC<Props> = ({ currently, units }) => {
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
