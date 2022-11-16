import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BACKGROUND_COLOUR, PRIMARY_COLOR} from '../styles/common';

interface IWBanner {
  text: string;
}

const WBanner = ({text}: IWBanner) => {
  return (
    <View style={style.banner}>
      <Text style={style.text}>{text}</Text>
    </View>
  );
};

export default WBanner;

const style = StyleSheet.create({
  banner: {
    justifyContent: `center`,
    paddingLeft: 24,
    backgroundColor: BACKGROUND_COLOUR
  },
  text: {
    color: PRIMARY_COLOR,
    fontSize: 22
  }
});
