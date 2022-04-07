import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ProductsStackParams} from '../Navigators/ProductsNavigator';

interface Props
  extends NativeStackScreenProps<ProductsStackParams, 'ProductScreen'> {}

const ProductsScreen = ({route, navigation}: Props) => {
  const name = route.params.name;
  const id = route.params.id;

  useEffect(() => {
    navigation.setOptions({
      title: name ? name : 'Add Product',
    });
  }, []);

  return (
    <View style={style.container}>
      <ScrollView>
        <Text style={style.label}>Nombre del Producto</Text>
        <TextInput placeholder="Producto" style={style.textInput} />
        <Text style={style.label}>Categoria</Text>

        <Button title="Guardar" onPress={() => {}} color="blue" />

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Button
            title="Camara"
            onPress={() => navigation.navigate('ProductsScreen')}
            color="blue"
          />

          <Button
            title="Galeria"
            onPress={() => navigation.navigate('ProductsScreen')}
            color="blue"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 10,
  },
  label: {fontSize: 18},
  textInput: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderColor: 'rgba(0,0,0,0.2)',
    height: 45,
    marginTop: 5,
    marginBottom: 20,
  },
});

export default ProductsScreen;
