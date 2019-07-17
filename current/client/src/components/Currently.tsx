import React from 'react';
import styled from 'styled-components/macro';
import { Flex, Box } from 'rebass';
import { getIcon } from '../lib/iconMap';
import { Currently as CurrentlyProps } from '../types';
import { getUnits } from './units';

const IconBox = styled.div`
  width: 50%;
  margin: -30px;
  svg {
    width: 100%;
    height: 100%;
  }
`;
export const Currently: React.FC<Props> = ({ currently, units }) => {
  const _units = getUnits(units);
  const Icon = getIcon(currently.icon);
  return (
    <Flex padding="2rem">
      <IconBox>
        <Icon />
      </IconBox>
      <Flex
        flex="1 1 auto"
        width="auto"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box>{currently.summary}</Box>
        <Box fontSize={6}>
          {currently.temperature}
          {_units.temperature}
        </Box>
        <Box>Feels like {currently.apparentTemperature}</Box>
      </Flex>
    </Flex>
  );
};

interface Props {
  currently: CurrentlyProps;
  units: string;
}
