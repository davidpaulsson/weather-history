import React, { Component } from 'react';
import { Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as weatherActions from '../actions/weatherActions';

class Weather extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.actions.fetchData();
  }

  render() {
    return <Text>Weather container</Text>;
  }
}

export default connect(
  state => ({ settings: state.settings }),
  dispatch => ({
    actions: bindActionCreators(weatherActions, dispatch)
  })
)(Weather);
