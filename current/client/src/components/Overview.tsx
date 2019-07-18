import React from 'react';
import styled from 'styled-components';
import { Flex, Box, Text } from 'rebass';
import { getIcon } from '../lib/iconMap';
import { DailyData } from '../types';

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
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Overview: React.FC<Props> = ({ overview }) => {
  const keys: DataKeys = {
    temperatureHigh: {
      icon: 'thermometer',
      iconColor: 'red'
    },
    temperatureLow: {
      icon: 'thermometer',
      iconColor: 'blue'
    },
    precipProbability: {
      icon: 'rain',
      iconColor: 'blue'
    },
    windSpeed: {
      icon: 'wind',
      iconColor: 'green'
    },
    windGust: {
      icon: 'windGust',
      iconColor: 'green'
    },
    humidity: {
      icon: 'humidity',
      iconColor: 'blue'
    },
    pressure: {
      icon: 'pressure',
      iconColor: 'blue'
    }
  };
  return (
    <Flex backgroundColor="white" color="black" flexWrap="wrap">
      {Object.keys(keys).map((k, idx) => {
        const { icon, iconColor } = keys[k];
        const Icon = getIcon(icon);

        return (
          <Item key={idx} width={1 / 2}>
            <IconBox iconColor={iconColor}>
              <Icon />
            </IconBox>
            <Text>{overview[k]}</Text>
          </Item>
        );
      })}
      <Item width={1 / 2}>rain so far ?</Item>
    </Flex>
  );
};

interface Props {
  overview: DailyData;
}

interface IconBoxProps {
  iconColor: string;
}
interface DataValue {
  icon: string;
  iconColor: string;
}

interface DataKeys {
  [key: string]: DataValue;
}
