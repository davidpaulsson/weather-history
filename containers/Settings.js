import React, { Component } from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as settingsActions from '../actions/settingsActions';

const Settings = ({ settings, actions }) => {
  console.log('component', { settings, actions });
  return (
    <ScrollView>
      <Text>Settings container</Text>
      <Text>
        Unit Type: {settings.unitType === 'si' ? 'Metric' : 'Imperial'}
      </Text>
      <TouchableOpacity
        onPress={() =>
          actions.setUnitType(settings.unitType === 'si' ? 'us' : 'si')}
      >
        {settings.unitType === 'si'
          ? <Text>Switch to Imperial</Text>
          : <Text>Switch to Metric</Text>}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default connect(
  state => ({ settings: state.settings }),
  dispatch => ({
    actions: bindActionCreators(settingsActions, dispatch)
  })
)(Settings);
