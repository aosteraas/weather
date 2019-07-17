import React from 'react';
import styled from 'styled-components';
import { Flex, Box, Text } from 'rebass';
import { Daily as DailyProps } from '../types';
import { getDay } from '../lib/formatter';
import { getIcon } from '../lib/iconMap';

const Row = styled(Flex)`
  padding: 1rem 0;
  margin: 0 1rem 0 1rem;
  &:not(:last-child) {
    border-bottom: 1px solid ${p => p.theme.colors.grey};
  }
`;

const ForecastStyle = styled(Flex)`
  border-bottom: 1px solid ${p => p.theme.colors.grey};
`;

export const Forecast: React.FC<Props> = ({ daily, units }) => {
  return (
    <ForecastStyle flexDirection="column" backgroundColor="white" color="black">
      {daily.data.map((day, idx) => {
        const Icon = getIcon(day.icon);
        return (
          <Row padding="1rem" key={idx}>
            <Box flex="1 1 auto">{getDay(day.time)}</Box>
            <Box mx={1}>
              <Icon />
            </Box>
            <Box width="2rem" mx={2}>
              <Text textAlign="right">{day.temperatureMin.toFixed(0)}</Text>
            </Box>
            <Box ml={2} width="2rem">
              <Text textAlign="right">{day.temperatureMax.toFixed(0)}</Text>
            </Box>
          </Row>
        );
      })}
    </ForecastStyle>
  );
};

interface Props {
  daily: DailyProps;
  units: string;
}
