import React, {useContext} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {AuthContext} from '../context/AuthContext';

const ProtectedScreen = () => {
  const {user, logOut, token} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ProtectedScreen</Text>

      <Button title="Logout" color="#ff0000" onPress={logOut} />

      <Text>{JSON.stringify(user, null, 5)}</Text>
      <Text>{token}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default ProtectedScreen;
