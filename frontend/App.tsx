import React, { Component } from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import { store } from './src/utils/store';

import Gymkhana from './src/screens/gymkhana';
import Loading from './src/screens/loading';
import Login from './src/screens/login';
import Main from './src/screens/main';
import MainPhases from './src/screens/mainPhases';
import Phase from './src/screens/phase';
import Profile from './src/screens/profile';

import SideBar from './src/components/sidebar';

export class App extends Component<any, any> {
  public render() {
    return (
      <Provider store={ store }>
        <AppNavigator style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}/>
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
}, { initialRouteName: 'Loading', headerMode: 'none' },
);

export default createAppContainer(AppNavigator);
