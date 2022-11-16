import React from 'react';
import {StyleSheet, View} from 'react-native';
import Input from './Input';

interface IPasswordInput {
  label?: string;
  value: string;
  setter: any;
  placeholder?: string;
}

export default function PasswordInput({
  label = `Contraseña`,
  value,
  setter,
  placeholder = `Contraseña`
}: IPasswordInput) {
  return (
    <View style={style.input}>
      <Input label={label} secureTextEntry placeholder={placeholder} setter={setter} value={value} />
    </View>
  );
}

const style = StyleSheet.create({
  input: {
    backgroundColor: `#e0e0e0`
  }
});
