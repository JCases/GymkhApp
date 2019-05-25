import React, { Component } from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import Loading from './src/screens/loading';
import Login from './src/screens/login';
import Main from './src/screens/main';

import SideBar from './src/components/sidebar';

export class App extends Component<any, any> {
  public render() { return (<AppNavigator style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}/>); }
}

const AppNavigator = createStackNavigator({
  Loading,
  Login,
  Main,
  SideBar,
}, { initialRouteName: 'Main', headerMode: 'none' },
);

export default createAppContainer(AppNavigator);
