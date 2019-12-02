import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import theme from '../theme/theme';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeNavigation from './HomeBottomNavigation';
import Home from '../pages/home';
import Login from '../pages/Auth/Login';
import SignUp from '../pages/Auth/SignUp';
import SignUpAddress from '../pages/Auth/SignUpAddress';
import SelectProvider from '../pages/Solicitation/SelectProvider';
import SelectLocalization from '../pages/Solicitation/SelectLocalization';
import ListComments from '../pages/Solicitation/ListComments';
import ConfirmSolicitation from '../pages/Solicitation/ConfirmSolicitation';
import SolicitationList from '../pages/Solicitation/SolicitationList';
import FinishSolicitation from '../pages/Solicitation/FinishSolicitation';
import SolicitationChat from '../pages/Chat/SolicitationChat';
import CurrentNegociations from '../pages/Chat/CurrentNegociations';
import Configs from '../pages/Configs';

const defaultOptions = {
  headerStyle: {
    backgroundColor: '#1a2138',
    borderBottomColor: theme['color-primary-500'],
    borderBottomWidth: 1,
    borderStyle: 'solid'
  },
  headerTintColor: theme['color-primary-500']
};

const AppRoutes = createSwitchNavigator({
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
      defaultNavigationOptions: defaultOptions
    }
  ),
  App: createBottomTabNavigator({
    Settings: {
      screen: Configs,
      navigationOptions: {
        headerShown: false
      }
    },
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
      SolicitationList: {
        screen: SolicitationList,
        navigationOptions: {
          headerTitle: 'Início'
        },
      },
      ListComments: {
        screen: ListComments,
        navigationOptions: {
          headerTitle: 'Início'
        },
      },
      FinishSolicitation: {
        screen: FinishSolicitation,
        navigationOptions: {
          headerTitle: 'Voltar'
        },
      },
      SolicitationChat: {
        screen: SolicitationChat,
        navigationOptions: ({ navigation }) => {
          return {
            headerTitle: navigation.getParam('providerName', 'Nome do prestador'),
            headerTitleStyle: {
              alignSelf: 'center',
              width: '70%',
              textAlign: 'center'
            },
          }
        },
      },
    },
      {
        defaultNavigationOptions: defaultOptions,
      }),
    Messages: createStackNavigator({
      CurrentNegociations: {
        screen: CurrentNegociations,
        navigationOptions: {
          headerShown: false
        }
      },
      SolicitationChat: {
        screen: SolicitationChat,
        navigationOptions: {
          headerTitle: 'Voltar'
        }
      },
    },
      {
        defaultNavigationOptions: defaultOptions
      }),
  }, {
    initialRouteName: 'Home',
    tabBarComponent: HomeNavigation
  })
});

export default createAppContainer(AppRoutes);
