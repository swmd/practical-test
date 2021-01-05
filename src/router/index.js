import React, {Component} from 'react';
import {Scene, Router, Stack} from 'react-native-router-flux';
import HomeScreen from '../container/contacts/HomeScreen.js';
import ContactList from '../container/contacts/ContactList.js';

export default class Route extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {}

  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene
            key="HomeScreen"
            initial
            component={HomeScreen}
            title=""
            hideNavBar={true}
          />
          <Scene
            key="ContactList"
            component={ContactList}
            title=""
            hideNavBar={true}
          />
        </Stack>
      </Router>
    );
  }
}
