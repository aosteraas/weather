import React from 'react';
import styled from 'styled-components';
import { Flex, Box, Text } from 'rebass';
import { getIcon } from '../lib/iconMap';
import { getUnits } from './units';
import { DailyData } from '../types';
import { format } from '../lib/formatter';
const Item = styled(Box)`
  display: flex;
  align-items: center;
  height: 5.6rem;
  border-bottom: 1px solid ${p => p.theme.colors.darkGrey};
  &:nth-of-type(odd) {
    border-right: 1px solid ${p => p.theme.colors.darkGrey};
  }
`;

const IconBox = styled.div<IconBoxProps>`
  background-color: ${p => p.theme.icon[p.iconColor]};
  color: ${p => p.theme.colors.white};
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  margin: 0 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
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
    <Flex backgroundColor="white" color="black" flexWrap="wrap">
      {Object.keys(keys).map((k, idx) => {
        const { icon, color, label, formatter, showUnits } = keys[k];
        const Icon = getIcon(icon);

        return (
          <Item key={idx} width={1 / 2}>
            <IconBox iconColor={color}>
              <Icon />
            </IconBox>
            <Flex flexDirection="column">
              <Text color={color}>
                {formatter(overview[k])}
                {showUnits && _units[k]}
              </Text>
              <Text color="midGrey" fontSize="1.2rem">
                {label}
              </Text>
            </Flex>
          </Item>
        );
      })}
      <Box py={2} flex="1 1 auto">
        <Text width={1} fontSize="1.2rem" textAlign="center">
          Last Observation {lastObserved} minutes ago
        </Text>
      </Box>
    </Flex>
  );
};

interface Props {
  overview: DailyData;
  units: string;
}

interface IconBoxProps {
  iconColor: string;
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
