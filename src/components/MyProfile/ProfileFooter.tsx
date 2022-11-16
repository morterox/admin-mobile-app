import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableHighlight, TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {Button} from 'react-native-paper';
import {RED_COLOR, WHITE_COLOR} from '../../styles/common';

const ProfileFooter = () => {
  const navigation = useNavigation();
  return (
    <View style={style.container}>
      <View style={style.info}>
        <Text style={style.textInfo}>
          Si alguno de estos datos se encuentra desactualizado, por favor, hacé click en el botón siguiente
        </Text>
      </View>
      <View style={style.button}>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate(`support`, {});
          }}
        >
          <View>
            <Text style={style.button.text}>Formulario de</Text>
            <Text style={style.button.text}>contacto</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: `center`,
    justifyContent: `flex-start`
  },
  info: {
    alignSelf: `center`,
    width: `85%`
  },
  textInfo: {
    fontWeight: `400`,
    color: `black`,
    fontSize: 12,
    textAlign: `center`
  },
  button: {
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `center`,
    width: 220,
    height: 60,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: RED_COLOR,
    text: {
      textAlign: `center`,
      color: `white`,
      fontWeight: `400`,
      fontSize: 20
    }
  }
});

export default ProfileFooter;
