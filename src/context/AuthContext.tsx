import React, {useReducer} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useContext, useEffect} from 'react';
import {
  Usuario,
  LoginResponse,
  LoginData,
  RegisterData,
} from '../interfaces/appInterfaces';
import {authReducer, AuthState} from './authReducer';
import {productsApi} from '../api/productsApi';

type AuthContextProps = {
  errorMesaage: string;
  token: string | null;
  user: Usuario | null;
  status: 'checking' | 'authenticated' | 'not-authenticated';
  signUp: (RegisterData: RegisterData) => void;
  signIn: (LoginData: LoginData) => void;
  logOut: () => void;
  removeError: () => void;
};

export const AuthContext = createContext({} as AuthContextProps);

const authInitialState: AuthState = {
  status: 'checking',
  token: null,
  errorMessage: '',
  user: null,
};

export const AuthProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');
    const resp = await productsApi.get('/auth');

    if (!token) return dispatch({type: 'not-authenticated'});
    if (resp.status !== 200) {
      dispatch({type: 'not-authenticated'});
    }
    dispatch({
      type: 'signUp',
      payload: {token: resp.data.token, user: resp.data.usuario},
    });
  };

  const signUp = async ({correo, password, nombre}: RegisterData) => {
    try {
      const resp = await productsApi.post<LoginResponse>('/usuarios', {
        correo,
        password,
        nombre,
      });

      dispatch({
        type: 'signUp',
        payload: {token: resp.data.token, user: resp.data.usuario},
      });
      await AsyncStorage.setItem('token', resp.data.token);
    } catch (error: any) {
      dispatch({
        type: 'addError',
        payload: error.response.data.errors[0].msg || 'Not valid information',
      });
    }
  };

  const signIn = async ({correo, password}: LoginData) => {
    try {
      const {data} = await productsApi.post<LoginResponse>('/auth/login', {
        correo,
        password,
      });
      dispatch({
        type: 'signUp',
        payload: {token: data.token, user: data.usuario},
      });
      await AsyncStorage.setItem('token', data.token);
    } catch (error: any) {
      console.log({error});
      dispatch({
        type: 'addError',
        payload: error.response.data.msg || 'Error de autenticación',
      });
    }
  };
  const logOut = async () => {
    await AsyncStorage.removeItem('token');
    dispatch({type: 'logout'});
  };

  const removeError = () => {
    dispatch({type: 'removeError'});
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        logOut,
        removeError,
        errorMesaage: state.errorMessage,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
