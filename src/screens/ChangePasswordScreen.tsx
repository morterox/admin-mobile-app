import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Divider, Button} from 'react-native-paper';
import {useToast} from 'react-native-toast-notifications';
import PasswordInput from '../components/Inputs/Password';
import {AuthContext} from '../navigation/AuthProvider';
import {IPasswordChange} from '../services/types';
import {BACKGROUND_COLOUR, PRIMARY_COLOR, PRIMARY_TEXT_COLOR, RED_COLOR, THIRD_COLOR} from '../styles/common';

export default function ChangePasswordScreen({navigation}: any) {
  const toast = useToast();
  const {changePassword, tokenId} = useContext(AuthContext);

  const [currentPassword, setCurrentPassword] = useState(``);
  const [newPassword, setNewPassword] = useState(``);
  const [reConfirmNewPassword, setReconfirmPassword] = useState(``);

  const handleChangePassword = async () => {
    const token: string = tokenId!;
    const data: IPasswordChange = {
      currentPassword,
      newPassword,
      tokenId: token
    };
    const response = await changePassword(data);
    if (response) {
      toast.show(`Su contraseña ha sido cambiada con éxito`, {
        type: `success`,
        placement: `top`,
        duration: 4000,
        animationType: `slide-in`
      });
    } else {
      toast.show(`Ooops! Algo ha salido mal. Intentelo de nuevo más tarde`, {
        type: `danger`,
        placement: `top`,
        duration: 4000,
        animationType: `slide-in`
      });
    }
  };

  return (
    <View style={style.container}>
      <View style={style.changePassword}>
        <View style={style.prompts}>
          <Text style={style.titles}>Contraseña actual</Text>
        </View>
        <View style={style.input}>
          <PasswordInput value={currentPassword} setter={setCurrentPassword} label="" placeholder="" />
        </View>
        <View style={style.divider}></View>
        <View style={style.prompts}>
          <Text style={style.titles}>Nueva contraseña</Text>
        </View>
        <View style={style.input}>
          <PasswordInput value={newPassword} setter={setNewPassword} label="" placeholder="" />
        </View>
        <View style={style.divider}></View>
        <View style={style.prompts}>
          <Text style={style.titles}>Confirmar contraseña actual</Text>
        </View>
        <View style={style.input}>
          <PasswordInput value={reConfirmNewPassword} setter={setReconfirmPassword} label="" placeholder="" />
        </View>
        <View style={style.divider}></View>
      </View>
      <View>
        <Button
          style={style.confirmButton}
          labelStyle={style.confirmButton.text}
          mode="contained"
          onPress={handleChangePassword}
        >
          CONFIRMAR
        </Button>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: `center`,
    justifyContent: `flex-start`,
    backgroundColor: BACKGROUND_COLOUR
  },
  prompts: {
    marginLeft: 20,
    paddingBottom: 20
  },
  input: {
    marginHorizontal: 20
  },
  titles: {
    fontWeight: `300`,
    color: `black`,
    fontSize: 16,
    textAlign: `left`
  },
  divider: {
    alignSelf: `center`,
    width: `80%`,
    borderBottomColor: `white`,
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 10
  },
  changePassword: {
    marginTop: 130,
    width: 300,
    //flex: ,
    paddingTop: 10,
    backgroundColor: `#e0e0e0`,
    borderRadius: 15,
    shadowColor: `#bebebe`,
    shadowRadius: 20
  },
  confirmButton: {
    margin: `5%`,
    marginTop: `10%`,
    width: 220,
    backgroundColor: PRIMARY_COLOR,
    color: PRIMARY_TEXT_COLOR,
    borderRadius: 20,
    text: {
      fontSize: 24
    }
  }
});
