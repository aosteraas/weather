import * as React from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native';
import { Currently as CurrentlyProps } from '../../types';
import { format } from '../../../lib/format';

const Wrapper = styled.View`
  padding: 20px;
  background: #2e7efc;
  flex-direction: row;
`;

const IconBox = styled.View`
  width: 50%;
`;

const SmallText = styled.Text`
  font-size: 16px;
  color: #fff;
`;
export const Currently: React.FC<Props> = ({ currently }) => {
  return (
    <Wrapper>
      <IconBox>
        <Text style={{ color: `#fff` }}>Icon goes here</Text>
      </IconBox>
      <IconBox>
        <SmallText>{currently.summary}</SmallText>
        <Text style={{ fontSize: 48, color: `#fff` }}>{format.temp(currently.temperature)}</Text>
        <SmallText>Feels like {format.temp(currently.apparentTemperature)}</SmallText>
      </IconBox>
    </Wrapper>
  );
};
interface Props {
  currently: CurrentlyProps;
}
