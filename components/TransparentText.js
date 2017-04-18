import React from 'react';
import { Text } from 'react-native';

const TransparentText = ({ text, style }) => (
  <Text
    style={{
      fontFamily: 'din-engschrift-std',
      backgroundColor: 'transparent',
      color: '#fff',
      fontSize: 40,
      ...style
    }}
  >
    {text.toUpperCase()}
  </Text>
);

export default TransparentText;
