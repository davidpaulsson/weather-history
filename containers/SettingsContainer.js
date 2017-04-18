import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as settingsActions from '../actions/settingsActions';
import Settings from '../components/Settings';
import NavigationBar from 'react-native-navbar';
import styled from 'styled-components/native';

const FlexView = styled.View`
  flex: 1
`;

const rightButtonConfig = {
  title: 'Done',
  handler: () => alert('hello!')
};

const SettingsContainer = ({ settings, actions }) => (
  <FlexView>
    <NavigationBar
      title={{ title: 'Settings' }}
      rightButton={rightButtonConfig}
    />
    <Settings {...settings} {...actions} />
  </FlexView>
);

export default connect(
  state => ({ settings: state.settings }),
  dispatch => ({
    actions: bindActionCreators(settingsActions, dispatch)
  })
)(SettingsContainer);
