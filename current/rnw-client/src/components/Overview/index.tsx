import React from 'react';
import styled from 'styled-components/native';
import { View, Text } from 'react-native';
import { format } from '../../../lib/format';
import { getUnits } from '../../../lib/units';
import { DailyData } from '../../types';
const Item = styled.View`
  flex-direction: row;
  align-items: center;
  height: 56;
  width: 50%;
  border-bottom-color: #d7d7d7;
  border-bottom-width: 1;
`;
interface IIconColor {
  blue: string;
  red: string;
  green: string;
  [key: string]: string;
}
const icon: IIconColor = {
  blue: `#4ba6ed`,
  red: `#e15241`,
  green: `#8ed25e`
};
const IconBox = styled.View<IconBoxProps>`
  background-color: ${p => icon[p.iconColor]};
  border-radius: 50;
  color: #fff;
  width: 30;
  height: 30;
  margin-left: 10;
  margin-right: 10;
  justify-content: center;
  align-items: center;
`;
const Observed = styled.View`
  padding-top: 8;
  padding-bottom: 8;
  border-bottom-color: #d7d7d7;
  border-bottom-width: 1;
`;
export const Overview: React.FC<Props> = ({ overview, units }) => {
  const keys: DataKeys = {
    temperatureHigh: {
      icon: 'thermometer',
      color: 'red',
      label: 'Recorded High',
      showUnits: false,
      formatter: format.temp
    },
    temperatureLow: {
      icon: 'thermometer',
      color: 'blue',
      label: 'Recorded Low',
      showUnits: false,
      formatter: format.temp
    },
    precipProbability: {
      icon: 'rain',
      color: 'blue',
      label: 'Chance of Rain',
      showUnits: false,
      formatter: format.percent
    },
    humidity: {
      icon: 'humidity',
      color: 'blue',
      label: 'Humidity',
      showUnits: false,
      formatter: format.percent
    },
    windSpeed: {
      icon: 'wind',
      color: 'green',
      label: 'Wind Speed',
      showUnits: true,
      formatter: format.round
    },
    windGust: {
      icon: 'windGust',
      color: 'green',
      label: 'Wind Gust',
      showUnits: true,
      formatter: format.round
    },
    cloudCover: {
      icon: 'cloudcover',
      color: 'blue',
      label: 'Cloud Cover',
      showUnits: false,
      formatter: format.percent
    },
    pressure: {
      icon: 'pressure',
      color: 'blue',
      label: 'Air Pressure',
      showUnits: true,
      formatter: format.round
    }
  };
  const _units = getUnits(units);
  const lastObserved = format.minutesAgo(overview.time);

  return (
    <>
      <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
        {Object.keys(keys).map((k, idx) => {
          const { icon, color, label, formatter, showUnits } = keys[k];
          return (
            <Item key={idx}>
              <IconBox iconColor={color}>
                <Text>I</Text>
              </IconBox>
              <View style={{ flexDirection: 'column' }}>
                <Text style={{ color }}>
                  {formatter(overview[k])}
                  {showUnits && _units[k]}
                </Text>
                <Text style={{ fontSize: 12, color: `#7e8492` }}>{label}</Text>
              </View>
            </Item>
          );
        })}
      </View>
      <Observed>
        <Text style={{ fontSize: 12, textAlign: 'center' }}>
          Last Observation {lastObserved} minutes ago
        </Text>
      </Observed>
    </>
  );
};

interface Props {
  overview: DailyData;
  units: string;
}
interface DataValue {
  icon: string;
  color: string;
  label: string;
  showUnits: boolean;
  formatter(value: string | number): string;
}

interface DataKeys {
  [key: string]: DataValue;
}
interface IconBoxProps {
  iconColor: string;
}
