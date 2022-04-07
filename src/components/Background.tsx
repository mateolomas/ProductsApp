import React from 'react';
import {View} from 'react-native';

export const Background = () => {
  return (
    <View
      style={{
        position: 'absolute',
        backgroundColor: 'purple',
        top: -250,
        width: 1000,
        height: 1200,
        transform: [{rotate: '-60deg'}],
      }}
    />
  );
};
