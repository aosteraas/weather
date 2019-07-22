import * as React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, StatusBar, Platform, View } from 'react-native';
import { Currently, Forecast, Overview } from '../../components';
import Spacer from './Spacer';
import StatusBarColor from './StatusBarColor';
import { weatherData as weather } from '../../../lib/weatherData';

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
    <>
      <StatusBarColor backgroundColor="#2e7efc" barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Currently currently={currently} />
          <Forecast units={flags.units} daily={daily} />
          <Spacer />
          <Overview units={flags.units} overview={daily.data[0]} />
          <Spacer />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
