import React from 'react';
import ReadingContent from './ReadingContent';
import InitialScreen from './InitialScreen';

import {
    createSwitchNavigator,
    createAppContainer,
    createDrawerNavigator,
    createBottomTabNavigator,
    createStackNavigator
  } from 'react-navigation';

export default class App extends React.Component {
  render() {
    return <AppStackNavigator />
  }
}

const AppSwitchNavigator = createSwitchNavigator({
  InitialScreen: { screen: InitialScreen},
  ReadingContent: { screen: ReadingContent },
});

const AppStackNavigator = createAppContainer(AppSwitchNavigator);