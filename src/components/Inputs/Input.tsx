import React from 'react';
import {TextInput} from 'react-native-paper';
import {RED_COLOR} from '../../styles/common';

interface IInput {
  value: string;
  label: string;
  placeholder: string;
  setter: any;
  secureTextEntry?: any;
}

export default function Input({value, setter, label, placeholder, secureTextEntry}: IInput) {
  return (
    <TextInput
      style={{
        height: 50
      }}
      secureTextEntry={secureTextEntry}
      label={label}
      placeholder={placeholder}
      value={value}
      onChangeText={(value) => setter(value)}
      underlineColor={RED_COLOR}
      activeUnderlineColor={RED_COLOR}
    />
  );
}
