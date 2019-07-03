import React from 'react';
import styled from 'styled-components/macro';
import { Daily as DailyProps } from '../types';
import { getUnits } from './units';
import { getIcon } from '../lib/iconMap';
import { formatTime, formatPercent } from '../lib/formatter';

const ThermIcon = getIcon('thermometer');
const PressureIcon = getIcon('pressure');
const SunriseIcon = getIcon('sunrise');
const SunsetIcon = getIcon('sunset');
const CloudCoverIcon = getIcon('cloudcover');

const DailyStyles = styled.section`
  display: flex;
  flex-direction: column;
  .cards {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const DailyCard = styled.article`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 25%;
  max-width: 25rem;
  border: 1px solid #dfdfdf;
`;

const Row = styled.div`
  display: flex;
  > div {
    display: flex;
    flex: 1;
    align-items: center;
  }
`;
const Sun = styled.div`
  display: flex;
`;

const Data = styled.div`
  flex: 1;
  text-align: right;
`;
const IconBox = styled.div<{ high?: boolean }>`
  background: ${p => (p.high ? 'red' : 'blue')};
  svg {
    height: 2.5rem;
    width: 2.5rem;
  }
`;
const Sunset = styled(IconBox)`
  background-color: #a40606;
  background-image: linear-gradient(315deg, #a40606 0%, #d98324 74%);
`;

const Sunrise = styled(IconBox)`
  background-color: #ff4e00;
  background-image: linear-gradient(315deg, #ff4e00 0%, #ec9f05 74%);
`;

export const Daily: React.FC<Props> = ({ daily, units }) => {
  const _units = getUnits(units);

  return (
    <DailyStyles>
      <p>{daily.summary}</p>
      <div className="cards">
        {daily.data.map((d, idx) => {
          const Icon = getIcon(d.icon);
          return (
            <DailyCard key={idx}>
              <div>{d.summary}</div>
              <div>
                <Icon />
              </div>
              <Row>
                <div>
                  <IconBox high>
                    <ThermIcon />
                  </IconBox>
                  <Data>
                    {d.temperatureHigh} {_units.temperature}
                  </Data>
                </div>
                <div>
                  <IconBox>
                    <ThermIcon />
                  </IconBox>
                  <Data>
                    {d.temperatureLow} {_units.temperature}
                  </Data>
                </div>
              </Row>
              <Row>
                <div>
                  <Sunrise>
                    <SunriseIcon />
                  </Sunrise>
                  <Data>{formatTime(d.sunriseTime)}</Data>
                </div>
                <div>
                  <Sunset>
                    <SunsetIcon />
                  </Sunset>
                  <Data>{formatTime(d.sunsetTime)}</Data>
                </div>
              </Row>
              <Row>
                <div>
                  <IconBox>
                    <CloudCoverIcon />
                  </IconBox>
                  <Data>{formatPercent(d.cloudCover)}</Data>
                </div>
                <div>
                  <IconBox>
                    <PressureIcon />
                  </IconBox>
                  <Data>
                    {d.pressure}
                    {_units.pressure}
                  </Data>
                </div>
              </Row>
            </DailyCard>
          );
        })}
      </div>
    </DailyStyles>
  );
};

interface Props {
  daily: DailyProps;
  units: string;
}
interface DailyData {
  apparentTemperatureHigh: number;
  apparentTemperatureHighTime: number;
  apparentTemperatureLow: number;
  apparentTemperatureLowTime: number;
  apparentTemperatureMax: number;
  apparentTemperatureMaxTime: number;
  apparentTemperatureMin: number;
  apparentTemperatureMinTime: number;
  cloudCover: number;
  dewPoint: number;
  humidity: number;
  moonPhase: number;
  ozone: number;
  precipIntensity: number;
  precipIntensityMax: number;
  precipIntensityMaxTime: number;
  precipProbability: number;
  precipType: string;
  pressure: number;
  sunriseTime: number;
  sunsetTime: number;
  temperatureHigh: number;
  temperatureHighTime: number;
  temperatureLow: number;
  temperatureLowTime: number;
  temperatureMax: number;
  temperatureMaxTime: number;
  temperatureMin: number;
  temperatureMinTime: number;
  uvIndex: number;
  uvIndexTime: number;
  visibility: number;
  windBearing: number;
  windGust: number;
  windGustTime: number;
  windSpeed: number;
}
