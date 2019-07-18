import React from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'rebass';
import { DailyData } from '../types';

const Item = styled(Box)`
  border-bottom: 1px solid ${p => p.theme.colors.darkGrey};
  &:nth-of-type(odd) {
    border-right: 1px solid ${p => p.theme.colors.darkGrey};
  }
`;

export const Overview: React.FC<Props> = ({ overview }) => {
  const keys = [
    'temperatureHigh',
    'temperatureLow',
    'precipProbability',
    'windSpeed',
    'windGust',
    'humidity',
    'pressure'
  ];
  return (
    <Flex backgroundColor="white" color="black" flexWrap="wrap">
      {keys.map((k, idx) => (
        <Item key={idx} width={1 / 2}>
          {overview[k]}
        </Item>
      ))}
      <Item width={1 / 2}>rain so far ?</Item>
    </Flex>
  );
};

interface Props {
  overview: DailyData;
}
