import * as React from 'react';
import styled from 'styled-components/native';
import { View, Text, StyleSheet } from 'react-native';
import { Daily as DailyProps } from '../../types';
import { format } from '../../../lib/format';
const Wrapper = styled.View`
  flex-direction: column;
`;
const Row = styled.View`
  flex-direction: row;
  padding: 10px 0;
  margin: 0 10px 0 10px;
  border-bottom-color: #e4e4e4;
  border-bottom-width: 1;
`;
const Day = styled.View`
  flex: 1 1 auto;
`;
const Min = styled.View`
  width: 20px;
  margin: 0 8px;
`;
const Max = styled.View`
  width: 20px;
  margin-left: 8px;
`;
const rowStyle = {
  flexDirection: 'row',
  paddingTop: 10,
  paddingBottom: 10,
  marginLeft: 10,
  marginRight: 10
};
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    borderBottomColor: `#e4e4e4`,
    borderBottomWidth: 1
  },
  rowNoBorder: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 10,
    marginRight: 10
  }
});
export const Forecast: React.FC<Props> = ({ daily, units }) => {
  return (
    <Wrapper>
      {daily.data.map((day, idx) => {
        const style = idx === daily.data.length - 1 ? styles.rowNoBorder : styles.row;
        return (
          <View style={style} key={idx}>
            <Day>
              <Text>{format.tsToDay(day.time)}</Text>
            </Day>
            <Min>
              <Text style={{ color: `#7e8492`, textAlign: 'right' }}>
                {format.round(day.temperatureMin)}
              </Text>
            </Min>
            <Max>
              <Text style={{ textAlign: 'right' }}>{format.round(day.temperatureMax)}</Text>
            </Max>
          </View>
        );
      })}
    </Wrapper>
  );
};
interface Props {
  daily: DailyProps;
  units: string;
}
