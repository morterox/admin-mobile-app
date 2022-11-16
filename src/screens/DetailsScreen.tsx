import React, {useContext} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {BACKGROUND_COLOUR} from '../styles/common';

export default function DetailsScreen({navigation}: any) {
  return (
    <View style={style.container}>
      <Text>Details Screen</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: `center`,
    justifyContent: `center`,
    backgroundColor: BACKGROUND_COLOUR
  }
});
