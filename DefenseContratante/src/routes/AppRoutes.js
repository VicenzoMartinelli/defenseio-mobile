import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { createAppContainer, createSwitchNavigator, SafeAreaView } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import login from '../pages/login';
import home from '../pages/home';
import signup from '../pages/signup';
import LinearGradient from 'react-native-linear-gradient'
import theme from '../theme/theme';
import SignUpAddress from '../pages/signup/SignUpAddress';
import { setState } from 'expect/build/jestMatchersObject';
import { BottomNavigation, BottomNavigationTab, Icon, Layout, IconRegistry, ApplicationProvider, ThemeProvider } from 'react-native-ui-kitten';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { mapping } from '@eva-design/eva';

const AppRoutes = createSwitchNavigator({
  // Loading: {
  //   screen: () => <View><Text>cARREGANDO</Text></View>,
  // },
  AuthStack: createStackNavigator(
    {
      SignIn: {
        screen: login,
        navigationOptions: {
          headerShown: false
        }
      },
      SignUp: {
        screen: signup,
        navigationOptions: {
          headerTitle: 'Criar conta'
        },
      },
      SignUpAddress: {
        screen: SignUpAddress,
        navigationOptions: {
          headerTitle: 'Finalizar cadastro'
        },
      },
    },
    {
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#222b45',
          borderBottomColor: theme['color-primary-500'],
          borderBottomWidth: 1,
          borderStyle: 'solid'
        },
        headerTintColor: theme['color-primary-500']
      },
    }
  ),
  App: createBottomTabNavigator({
    Dashboard: home,
    Settings: home
  }, {
    initialRouteName: 'Dashboard',
    tabBarComponent: BottomNavigationWithIconsShowcase,
    tabBarOptions: {
      activeBackgroundColor: theme['background-basic-color-1'],
      activeTintColor: theme['background-basic-color-1'],
      inactiveBackgroundColor: theme['background-basic-color-1'],
      style: {
        backgroundColor: theme['background-basic-color-1']
      }
    }
  })
});

const BottomNavigationWithIconsShowcase = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const DashboardIcon = (style) => (
    <Icon {...style} name='layout' />
  );

  const SettingsIcon = (style) => (
    <Icon {...style} name='settings' />
  );
  onTabSelect = (selectedIndex) => {
    setState(selectedIndex);
  };
  return (
    <SafeAreaView style={{ backgroundColor: theme['background-basic-color-1'] }}>
      <ThemeProvider theme={theme}>
        <BottomNavigation
          selectedIndex={selectedIndex}
          onSelect={onTabSelect}>
          <BottomNavigationTab
            title='DASHBOARD'
            icon={DashboardIcon}
          />
          <BottomNavigationTab
            title='SETTINGS'
            icon={SettingsIcon}
          />
        </BottomNavigation>
      </ThemeProvider>
    </SafeAreaView>
  );
}
export default createAppContainer(AppRoutes);
