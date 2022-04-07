import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen} from '../screens/LoginScreen';
import {RegisterScreen} from '../screens/RegisterScreen';
import {AuthContext} from '../context/AuthContext';
import ProtectedScreen from '../screens/ProtectedScreen';
import LoadingScreen from '../screens/LoadingScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const {status} = React.useContext(AuthContext);

  if (status === 'checking') return <LoadingScreen />;

  return (
    <Stack.Navigator>
      {status !== 'authenticated' ? (
        <>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="LoginScreen"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="RegisterScreen"
            component={RegisterScreen}
          />
        </>
      ) : (
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="ProtectedScreen"
          component={ProtectedScreen}
        />
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
