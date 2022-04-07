import React from 'react';
import {ActivityIndicator, View} from 'react-native';

const LoadingScreen = () => {
  return (
    <View>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default LoadingScreen;
