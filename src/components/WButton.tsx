import * as React from 'react';
import {StyleSheet, View, Button, Text} from 'react-native';
import {PRIMARY_COLOR, PRIMARY_TEXT_COLOR} from '../styles/common';

interface IWButton {
  text: string;
  onPress?: any;
}

const WButton = ({text, onPress}: IWButton) => (
  <View style={style.button}>
    <Text
      onPress={() => {
        if (onPress) {
          onPress();
        }
      }}
      style={style.text}
    >
      {text}
    </Text>
  </View>
);

export default WButton;

const style = StyleSheet.create({
  button: {
    marginTop: 20,
    backgroundColor: PRIMARY_COLOR,
    color: PRIMARY_TEXT_COLOR,
    marginHorizontal: 80,
    borderRadius: 10,
    justifyContent: `center`,
    alignSelf: `center`,
    width: 200,
    height: 40
  },
  text: {
    fontWeight: `400`,
    color: `white`,
    fontSize: 22,
    textAlign: `center`
  }
});
