import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './src/Navigators/StackNavigator';
import {AuthProvider} from './src/context/AuthContext';
import {ProductsProvider} from './src/context/ProductsContext';

const AppState = ({children}: any) => {
  return (
    <ProductsProvider>
      <AuthProvider>{children}</AuthProvider>
    </ProductsProvider>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <StackNavigator />
      </AppState>
    </NavigationContainer>
  );
};

export default App;
