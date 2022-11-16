import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {BACKGROUND_COLOUR} from '../styles/common';

export default function Loading() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#6646ee" />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: `center`,
    justifyContent: `center`,
    backgroundColor: BACKGROUND_COLOUR
  }
});
