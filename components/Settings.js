import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import styled from 'styled-components/native';
import availableLanguages from '../data/availableLanguages';

const CustomTableView = styled.ScrollView`
    backgroundColor: #EFEFF4;
    paddingBottom: 20;
    flex: 1
`;

const Settings = ({ unitType, language, setUnitType, setLocale }) => {
  return (
    <CustomTableView>
      <Section header="Units">
        <Cell
          title="Metric"
          accessory={unitType === 'si' && 'Checkmark'}
          onPress={() => setUnitType('si')}
        />
        <Cell
          title="Imperial"
          accessory={unitType === 'us' && 'Checkmark'}
          onPress={() => setUnitType('us')}
        />
      </Section>

      <Section header="Language">
        {availableLanguages.map(lang => (
          <Cell
            key={lang.id}
            title={lang.text}
            accessory={language === lang.id && 'Checkmark'}
            onPress={() => setLocale(lang.id)}
          />
        ))}
      </Section>
    </CustomTableView>
  );
};

export default Settings;
