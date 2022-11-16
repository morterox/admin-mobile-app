import React, {useContext, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import {Button, Text} from 'react-native-paper';
import {BACKGROUND_COLOUR, PRIMARY_COLOR, PRIMARY_TEXT_COLOR} from '../styles/common';

export default function LogOutScreen({navigation}) {
  const {logOut, tokenId} = useContext(AuthContext);

  const handleLogOut = async () => {
    const response = await logOut(tokenId);
  };

  return (
    <View style={style.mainContainer}>
      <View style={style.buttonContainer}>
        <Text style={style.text}>¿Está seguro que desea salir?</Text>
        <View style={style.container}>
          <Button style={style.button} mode="contained" onPress={handleLogOut}>
            Si
          </Button>
          <Button style={style.button} mode="contained" onPress={() => navigation.navigate(`home`)}>
            Volver
          </Button>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  mainContainer: {
    display: `flex`,
    justifyContent: `center`,
    width: `100%`,
    height: `100%`,
    backgroundColor: BACKGROUND_COLOUR
  },
  buttonContainer: {
    display: `flex`,
    alignItems: `center`,
    justifyContent: `space-around`,
    height: `50%`,
    width: `100%`,
    backgroundColor: BACKGROUND_COLOUR
  },
  container: {
    display: `flex`,
    flexDirection: `row`,
    justifyContent: `space-around`,
    width: `100%`,
    backgroundColor: BACKGROUND_COLOUR
  },
  button: {
    width: `30%`,
    backgroundColor: PRIMARY_COLOR,
    color: PRIMARY_TEXT_COLOR
  },
  text: {
    fontSize: 25,
    color: `red`
  }
});
