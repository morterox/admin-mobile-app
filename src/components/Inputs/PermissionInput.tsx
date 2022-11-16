import React, {useState} from 'react';
import {View, Switch, StyleSheet, Text} from 'react-native';

export default function PermissionInput({setter, value, text, textLeft, width}) {
  return (
    <View style={{...style.container, width: width || `auto`}}>
      {textLeft && <Text>{text}</Text>}
      <Switch
        trackColor={{false: `#767577`, true: `#81b0ff`}}
        //thumbColor={isEnabled ? `#f5dd4b` : `#f4f3f4`}
        ios_backgroundColor="#3e3e3e"
        onValueChange={setter}
        value={value}
      />
      {!textLeft && <Text>{text}</Text>}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    display: `flex`,
    justifyContent: `space-between`,
    flexDirection: `row`,
    alignItems: `center`
  }
});
