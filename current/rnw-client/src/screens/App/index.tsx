import * as React from 'react';
import styled from 'styled-components/native';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Currently, Forecast, Overview } from '../../components';
import { weatherData as weather } from '../../../lib/weatherData';
const Spacer = styled.View`
  height: 16px;
  background-color: #f8f8f8;
  border-bottom-color: #e4e4e4;
  border-bottom-width: 1;
  border-top-color: #e4e4e4;
  border-top-width: 1;
`;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1
  }
});

export const App = () => {
  // const instructions = Platform.select({
  //   android: 'Double tap R on your keyboard to reload,\nShake or press menu button for dev menu',
  //   ios: 'Press Cmd+R to reload,\nCmd+D or shake for dev menu'
  // });
  const { flags, currently, daily } = weather;

  return (
    <SafeAreaView style={styles.container}>
      <Currently currently={currently} />
      <Forecast units={flags.units} daily={daily} />
      <Spacer />
      <Overview units={flags.units} overview={daily.data[0]} />
    </SafeAreaView>
  );
};
