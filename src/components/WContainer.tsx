import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BACKGROUND_COLOUR, PRIMARY_COLOR} from '../styles/common';

// interface IWContainer {
//   children: .Children;
// }

const WContainer = (props: any) => {
  return <View style={style.container}>{props.children}</View>;
};

export default WContainer;

const style = StyleSheet.create({
  container: {
    justifyContent: `center`,
    paddingLeft: 24,
    backgroundColor: BACKGROUND_COLOUR
  }
});
