import React, {useContext, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import {TextInput} from 'react-native-paper';
import {IPasswordReset} from '../services/types';
import LogoTitle from '../components/LogoTitle';
import {Button} from 'react-native-paper';
import IdentificationTypeInput from '../components/Inputs/IdentificationType';
import EmailInput from '../components/Inputs/Email';
import IdentificationInput from '../components/Inputs/Identification';
import {BACKGROUND_COLOUR, PRIMARY_COLOR, PRIMARY_TEXT_COLOR} from '../styles/common';
import {apiResetPassword} from '../services/api';

export default function ForgotPasswordScreen({navigation}) {
  const [email, setEmail] = useState(``);
  const [identification, setIdentification] = useState(``);
  const [identificationType, setIdentificationType] = useState(``);

  const handleRecoveryPassword = async () => {
    const recoveryEmailPayload: IPasswordReset = {
      identificationType,
      identification,
      email
    };
    const res = await apiResetPassword(recoveryEmailPayload);
    if (res.status === 200) {
      navigation.navigate(`Login`);
    }
  };

  return (
    <View>
      <LogoTitle />
      <View style={style.container}>
        <IdentificationTypeInput setter={setIdentificationType} />
        <IdentificationInput value={identification} setter={setIdentification} />

        <EmailInput value={email} setter={setEmail} />
      </View>
      <Button style={style.loginScreenButton} mode="contained" onPress={handleRecoveryPassword}>
        Recuperar contraseña
      </Button>
      <Button style={style.forgotScreenButton} mode="contained" onPress={() => navigation.navigate(`Login`)}>
        Volver
      </Button>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    display: `flex`,
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
  forgotScreenButton: {
    margin: `5%`,
    width: `90%`,
    color: PRIMARY_TEXT_COLOR,
    backgroundColor: PRIMARY_COLOR
  },
  dropdownButton: {}
});
