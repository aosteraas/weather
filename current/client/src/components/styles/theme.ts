import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  breakpoints: ['40em', '52em', '64em'],
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
  colors: {
    black: `#282c34`,
    white: `#ffffff`,
    offWhite: `#f8f8f8`,
    blue: `#2e7efc`,
    lightBlue: `#5faafc`,
    grey: `#e4e4e4`,
    lightGrey: `#d4d4d4`,
    darkGrey: `#d7d7d7`
  },
  icon: {
    blue: `#4ba6ed`,
    red: `#e15241`,
    green: `#8ed25e`
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256],
  shadows: {
    small: '0 0 4px rgba(0, 0, 0, .125)',
    large: '0 0 24px rgba(0, 0, 0, .125)'
  }
};
