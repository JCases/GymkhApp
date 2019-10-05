import React, { Component } from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import { Root } from 'native-base';

import { store } from './src/utils/store';

import Gymkhana from './src/screens/gymkhana';
import Loading from './src/screens/loading';
import Login from './src/screens/login';
import Main from './src/screens/main';
import MainPhases from './src/screens/mainPhases';
import Phase from './src/screens/phase';
import Profile from './src/screens/profile';

import SideBar from './src/components/sidebar';

export default class App extends Component<any, any> {
  public render() {
    console.disableYellowBox = true;
    return (
      <Provider store={ store }>
        <Root>
          <Navigation style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}/>
        </Root>
      </Provider>
    );
  }
}

const AppNavigator = createStackNavigator({
  Loading,
  Login,
  Main,
  SideBar,
  Gymkhana,
  Phase,
  MainPhases,
  Profile,
}, { initialRouteName: 'Loading', headerMode: 'none', defaultNavigationOptions: { gesturesEnabled: false, swipeEnabled: false } },
);

const Navigation = createAppContainer(AppNavigator);
