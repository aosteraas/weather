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
  return (
    <Flex backgroundColor="white" color="black" flexWrap="wrap">
      <Item width={1 / 2}>{overview.temperatureHigh}</Item>
      <Item width={1 / 2}>{overview.temperatureLow}</Item>
      <Item width={1 / 2}>rain so far ?</Item>
      <Item width={1 / 2}>{overview.precipProbability}</Item>
      <Item width={1 / 2}>{overview.windSpeed}</Item>
      <Item width={1 / 2}>{overview.windGust}</Item>
      <Item width={1 / 2}>{overview.humidity}</Item>
      <Item width={1 / 2}>{overview.pressure}</Item>
    </Flex>
  );
};

interface Props {
  overview: DailyData;
}
