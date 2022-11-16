import 'react-native-gesture-handler';
import * as React from 'react';
import {AppRegistry} from 'react-native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import App from './App.tsx';
import {name as appName} from './app.json';

const theme = {
  ...DefaultTheme
  /*colors: {
    ...DefaultTheme.colors,
    primary: `green`,
    accent: `yellow`
  }*/
};

export default function Main() {
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
