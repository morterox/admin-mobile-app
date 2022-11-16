import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        options={{
          title: `Iniciar sesión`
        }}
        component={LoginScreen}
      />
      <Stack.Screen
        name="ForgotPassword"
        options={{
          title: `Recuperar contraseña`
        }}
        component={ForgotPasswordScreen}
      />
    </Stack.Navigator>
  );
}
