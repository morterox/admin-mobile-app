import React from 'react';
import {TextInput} from 'react-native-paper';
import {RED_COLOR} from '../../styles/common';
import Input from './Input';

export default function PedidoDescriptionInput({value, setter, label, mandatory}) {
  return (
    <TextInput
      multiline={true}
      numberOfLines={10}
      value={value}
      onChangeText={(text) => {
        setter(text);
      }}
      style={{height: 200, textAlignVertical: `top`}}
      underlineColor={RED_COLOR}
      activeUnderlineColor={RED_COLOR}
    />
  );
}
