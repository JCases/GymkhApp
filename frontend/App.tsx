import React, { Component } from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import Loading from './src/screens/loading';
import Login from './src/screens/login';

export class App extends Component<any, any> {
  public render() { return (<AppNavigator style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}/>); }
}

const AppNavigator = createStackNavigator({
  Loading,
  Login,
}, { initialRouteName: 'Loading', headerMode: 'none' },
);

export default createAppContainer(AppNavigator);
