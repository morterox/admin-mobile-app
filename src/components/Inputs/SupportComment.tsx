import React from 'react';
import {TextInput} from 'react-native-paper';
import {RED_COLOR} from '../../styles/common';

interface ISupporCommentInput {
  value: string;
  setter: any;
}

export default function SupportCommentInput({value, setter}: ISupporCommentInput) {
  return (
    <TextInput
      multiline={true}
      numberOfLines={10}
      value={value}
      onChangeText={(text) => {
        console.log(text, `TEXT`);
        setter(text);
      }}
      style={{height: 200, textAlignVertical: `top`}}
      underlineColor={RED_COLOR}
      activeUnderlineColor={RED_COLOR}
    />
  );
}
