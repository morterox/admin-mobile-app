import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {BACKGROUND_COLOUR, PRIMARY_COLOR, PRIMARY_TEXT_COLOR} from '../../styles/common';
import WButton from '../WButton';
import {useNavigation} from '@react-navigation/native';

const FAQFooter = () => {
  const navigation = useNavigation();
  return (
    <View style={style.container}>
      <Text style={style.text}>Si todavia tenés dudas, hacé click en el botón siguiente</Text>
      <View style={style.button}>
        <Text
          onPress={() => {
            navigation.navigate(`support`, {});
          }}
          style={style.textButton}
        >
          {`Formulario de contacto`}
        </Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    display: `flex`,
    flexDirection: `column`,
    alignItems: `center`,
    justifyContent: `center`,
    width: `100%`,
    backgroundColor: BACKGROUND_COLOUR
  },
  logoApp: {
    alignSelf: `flex-end`
  },
  text: {
    textAlign: `center`,
    width: `80%`,
    fontSize: 18
  },
  textButton: {
    fontWeight: `400`,
    color: `white`,
    fontSize: 22,
    textAlign: `center`
  },
  button: {
    marginTop: 20,
    backgroundColor: PRIMARY_COLOR,
    color: PRIMARY_TEXT_COLOR,
    marginHorizontal: 80,
    borderRadius: 10,
    justifyContent: `center`,
    alignSelf: `center`,
    width: 300,
    height: 40
  }
});

export default FAQFooter;
