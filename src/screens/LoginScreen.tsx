import React, {useContext, useState} from 'react';
import {StyleSheet, View, ScrollView, Image, Text} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import {IAuthtenticate} from '../services/types';
import {Button} from 'react-native-paper';
import EmailInput from '../components/Inputs/Email';
import IdentificationInput from '../components/Inputs/Identification';
import IdentificationTypeInput from '../components/Inputs/IdentificationType';
import PasswordInput from '../components/Inputs/Password';
import {BACKGROUND_COLOUR, PRIMARY_COLOR, PRIMARY_TEXT_COLOR} from '../styles/common';
import {useToast} from 'react-native-toast-notifications';

export default function LoginScreen({navigation}) {
  const toast = useToast();
  const {logIn} = useContext(AuthContext);
  const [email, setEmail] = useState(`diez.manuel98@gmail.com`);
  const [identification, setIdentification] = useState(`39171745`);
  const [identificationType, setIdentificationType] = useState(`DNI`);
  const [password, setPassword] = useState(`123456`);

  const handleLogIn = async () => {
    const user: IAuthtenticate = {
      identificationType,
      identification,
      password,
      email
    };
    const res = await logIn(user);
    if (!res) {
      toast.show(`Error iniciando sesión. Contraseña y/o usuario incorrecto`, {
        type: `danger`,
        placement: `top`,
        duration: 4000,
        animationType: `slide-in`
      });
    }
  };

  return (
    <ScrollView>
      <View style={style.container}>
        <Image style={style.logo} source={require(`../assets/logo.png`)} />
        <View></View>
        <IdentificationTypeInput setter={setIdentificationType} />
        <IdentificationInput value={identification} setter={setIdentification} />

        <EmailInput value={email} setter={setEmail} />
        <PasswordInput value={password} setter={setPassword} />
      </View>
      <Button style={style.loginScreenButton} mode="contained" onPress={handleLogIn}>
        Ingresar
      </Button>
      <Button style={style.forgotScreenButton} mode="contained" onPress={() => navigation.navigate(`ForgotPassword`)}>
        Recuperar contraseña
      </Button>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    display: `flex`,
    flex: 1,
    margin: `5%`,
    width: `90%`,
    backgroundColor: BACKGROUND_COLOUR
  },
  loginScreenButton: {
    margin: `5%`,
    width: `90%`,
    color: PRIMARY_TEXT_COLOR,
    backgroundColor: PRIMARY_COLOR
  },
  logo: {
    width: `50%`,
    height: 180,
    marginLeft: `25%`
  },
  forgotScreenButton: {
    margin: `5%`,
    width: `90%`,
    color: PRIMARY_COLOR,
    backgroundColor: PRIMARY_COLOR
  }
});
