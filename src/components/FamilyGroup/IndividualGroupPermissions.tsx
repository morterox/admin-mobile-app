import * as React from 'react';
import {useContext, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {AuthContext} from '../../navigation/AuthProvider';
import {GREY_CONTAINER_BACKGROUND, RED_COLOR} from '../../styles/common';
import WSwitch from '../WSwitch';
import {putEditUserConfigurationApi} from '../../services/api';
import {useToast} from 'react-native-toast-notifications';
import {useNavigation} from '@react-navigation/native';

interface IIndivPermissions {
  data: {
    puede_invitar_con_aut: string | null;
    puede_invitar_sin_aut: string | null;
  };
}

const PersonalData = ({data}: IIndivPermissions) => {
  const [inviteWithoutAuthorization, setInviteWithoutAuthorization] = useState(data.puede_invitar_sin_aut);
  const [inviteWithAuthorization, setInviteWithAuthorization] = useState(data.puede_invitar_con_aut);
  const [canAuthorize, setCanAuthorize] = useState(data.flag_inv_puede_aut);
  const {tokenId, permisos} = useContext(AuthContext);
  const toast = useToast();
  const navigation = useNavigation();

  const putEditUserConfiguration = () => {
    putEditUserConfigurationApi(tokenId, {
      flag_invita_sin_aut: inviteWithoutAuthorization ? `Si` : `No`,
      flag_invita_con_aut: inviteWithAuthorization ? `Si` : `No`,
      flag_puede_autorizar: canAuthorize ? `Si` : `No`,
      socio_id: data.socio_id
    }).then((response) => {
      if (response.status == 200) {
        toast.show(`Se han actualizado los datos.`, {
          type: `success`,
          placement: `top`,
          duration: 4000,
          animationType: `slide-in`
        });
        navigation.navigate(`familyGroup`, {});
      } else {
        toast.show(`Ha ocurrido un error en la configuracion de datos.`, {
          type: `danger`,
          placement: `top`,
          duration: 4000,
          animationType: `slide-in`
        });
      }
    });
  };

  return (
    <View>
      {permisos[`SWITCH_INVIT_SIN_AUT`] && permisos[`SWITCH_INVIT_SIN_AUT`][`MODIFICAR`] && (
        <View style={style.prompts}>
          <Text style={style.titles}>¿Puede invitar sin autorización?</Text>

          <WSwitch
            setter={(value) => {
              if (value) {
                setInviteWithAuthorization(false);
              }
              setInviteWithoutAuthorization(value);
            }}
            value={inviteWithoutAuthorization}
          />
        </View>
      )}
      {permisos[`SWITCH_INVIT_CON_AUT`] && permisos[`SWITCH_INVIT_CON_AUT`][`MODIFICAR`] && (
        <View style={style.prompts}>
          <Text style={style.titles}>¿Puede invitar con autorización?</Text>
          <WSwitch
            setter={(value) => {
              if (value) {
                setInviteWithoutAuthorization(false);
              }
              setInviteWithAuthorization(value);
            }}
            value={inviteWithAuthorization}
          />
        </View>
      )}
      {permisos[`SWITCH_INVIT_AUTORIZA`] && permisos[`SWITCH_INVIT_AUTORIZA`][`MODIFICAR`] && (
        <View style={style.prompts}>
          <View style={{marginRight: 100}}>
            <Text style={style.titles}>¿Puede autorizar?</Text>
          </View>
          <WSwitch setter={setCanAuthorize} value={canAuthorize} />
        </View>
      )}
      {permisos[`GRUPO_FAMILIAR`] && permisos[`GRUPO_FAMILIAR`][`MODIFICAR`] && (
        <View
          onTouchEnd={() => {
            putEditUserConfiguration();
          }}
          style={style.button}
        >
          <Text style={style.button.text}>Guardar</Text>
        </View>
      )}
      <View
        onTouchStart={() => {
          navigation.navigate(`support`, {});
        }}
        style={style.button}
      >
        <Text style={style.button.text}>Formulario de</Text>
        <Text style={style.button.text}>contacto</Text>
      </View>
    </View>
  );
};

const IndividualGroupPermissions = ({data}: IIndivPermissions) => {
  return (
    <View>
      <View style={style.mainTitleContainer}>
        <Text style={style.mainTitle}>Permisos</Text>
      </View>
      <View style={style.infoContainer}>
        <PersonalData data={data} />
      </View>
      <View></View>
    </View>
  );
};

const style = StyleSheet.create({
  mainTitleContainer: {
    marginBottom: 5,
    padding: 5,
    paddingBottom: 20
  },
  mainTitle: {
    fontWeight: `300`,
    color: `black`,
    fontSize: 18,
    textAlign: `left`
  },
  infoContainer: {
    width: 300,
    padding: 15,
    backgroundColor: GREY_CONTAINER_BACKGROUND,
    borderRadius: 15,
    shadowColor: `#bebebe`,
    shadowRadius: 20
  },
  dataContainer: {
    width: 300,
    backgroundColor: GREY_CONTAINER_BACKGROUND,
    padding: 10,
    paddingBottom: 0,
    borderRadius: 15,
    shadowColor: `#bebebe`,
    shadowRadius: 20,
    marginBottom: 0
  },
  prompts: {
    display: `flex`,
    flexDirection: `row`,
    justifyContent: `flex-end`,
    marginLeft: 20,
    paddingBottom: 20
  },
  button: {
    display: `flex`,
    alignSelf: `center`,
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

export default IndividualGroupPermissions;
