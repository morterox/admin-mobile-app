import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {BACKGROUND_COLOUR} from '../styles/common';

export default function LogoTitle({backgroundColor}) {
  return (
    <View style={{...style.container, backgroundColor: backgroundColor || BACKGROUND_COLOUR}}>
      <Image style={{width: 50, height: 50, marginRight: 10}} source={require(`../assets/logo.png`)} />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: `flex-end`,
    alignSelf: `flex-end`,
    borderRadius: 100
    //borderBottomLeftRadius: 100,
    //borderBottomRightRadius: 100,
  }
});
