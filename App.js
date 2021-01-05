import React, {Component} from 'react';
import {View} from 'react-native';
import Router from './src/router/index';

export default class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <View style={{flex: 1}}>
        <Router />
      </View>
    );
  }
}