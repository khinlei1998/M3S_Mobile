import {View, Text} from 'react-native';
import React from 'react';
import {Divider} from 'react-native-paper';

export default function DividerLine() {
  return (
    <Divider
      style={{
        backgroundColor: '#000',
        height: 1,
        marginTop: 20,
        width: '90%',
        alignSelf: 'center',
        marginBottom:10
      }}
    />
  );
}