import React from 'react';
import { StyleSheet } from 'react-native';
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  ThemeProvider
} from 'react-native-ui-kitten';
import { mapping } from '@eva-design/eva';
import theme from './theme/theme';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import GeocodeProvider from './providers/GeocodeProvider';
import AppRoutes from './routes/AppRoutes';
import Geolocation from '@react-native-community/geolocation';

Geolocation.setRNConfiguration({
  authorizationLevel: 'auto',
  skipPermissionRequests: false,
});

const App = () => (
  <GeocodeProvider>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider mapping={mapping} theme={theme}>
      <ThemeProvider theme={theme}>
        <AppRoutes />
      </ThemeProvider>
    </ApplicationProvider>
  </GeocodeProvider>
);

export default App;
