import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { createAppContainer, createSwitchNavigator, SafeAreaView } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LinearGradient from 'react-native-linear-gradient'
import theme from '../theme/theme';
import { setState } from 'expect/build/jestMatchersObject';
import { BottomNavigation, BottomNavigationTab, Icon, Layout, IconRegistry, ApplicationProvider, ThemeProvider } from 'react-native-ui-kitten';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { mapping } from '@eva-design/eva';
import HomeNavigation from './HomeBottomNavigation';
import Home from '../pages/home';
import Login from '../pages/Auth/Login';
import SignUp from '../pages/Auth/SignUp';
import SignUpAddress from '../pages/Auth/SignUpAddress';
import SelectProvider from '../pages/Solicitation/SelectProvider';
import SelectLocalization from '../pages/Solicitation/SelectLocalization';
import ConfirmSolicitation from '../pages/Solicitation/ConfirmSolicitation';

const AppRoutes = createSwitchNavigator({
  // Loading: {
  //   screen: () => <View><Text>cARREGANDO</Text></View>,
  // },
  AuthStack: createStackNavigator(
    {
      SignIn: {
        screen: Login,
        navigationOptions: {
          headerShown: false
        }
      },
      SignUp: {
        screen: SignUp,
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
    Settings: () => <Layout><Text>12313212321</Text></Layout>,
    Home: createStackNavigator({
      Home: {
        screen: Home,
        navigationOptions: {
          headerShown: false
        }
      },
      SelectProvider: {
        screen: SelectProvider,
        navigationOptions: {
          headerTitle: 'Início'
        },
      },
      SelectLocalization: {
        screen: SelectLocalization,
        navigationOptions: {
          headerTitle: 'Voltar'
        },
      },
      ConfirmSolicitation: {
        screen: ConfirmSolicitation,
        navigationOptions: {
          headerTitle: 'Voltar'
        },
      },
    },
      {
        defaultNavigationOptions: {
          headerStyle: {
            backgroundColor: '#1a2138',
            borderBottomColor: theme['color-primary-500'],
            borderBottomWidth: 1,
            borderStyle: 'solid'
          },
          headerTintColor: theme['color-primary-500']
        },
      }),
    Messages: () => <Layout><Text>12313212321</Text></Layout>,
  }, {
    initialRouteName: 'Home',
    tabBarComponent: HomeNavigation
  })
});

export default createAppContainer(AppRoutes);
