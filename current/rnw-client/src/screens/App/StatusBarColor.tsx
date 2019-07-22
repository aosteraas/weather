import * as React from 'react';
import { View, StatusBar, StyleSheet, Platform, StatusBarStyle } from 'react-native';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 45 : StatusBar.currentHeight;

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT
  }
});

const StatusBarColor: React.FC<Props> = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

interface Props {
  backgroundColor: string;
  barStyle: StatusBarStyle;
}

export default StatusBarColor;
