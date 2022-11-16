import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {GREY_CONTAINER_BACKGROUND} from '../../styles/common';
import {apiGetSocioById} from '../../services/api';
import {AuthContext} from '../../navigation/AuthProvider';

const GroupMember = ({data}) => {
  const {tokenId} = useContext(AuthContext);
  const navigation = useNavigation();
  const [currentData, setCurrentData] = useState();

  useEffect(() => {
    apiGetSocioById(tokenId, data.socio_id).then((response) => {
      setCurrentData({
        name: `${response.data.socio_nombre[0].toUpperCase()}${response.data.socio_nombre
          .substring(1)
          .toLowerCase()} ${response.data.socio_apellido[0].toUpperCase()}${response.data.socio_apellido
          .substring(1)
          .toLowerCase()}`,
        parentesco: response.data.parentesco_nombre,
        birthdate: response.data.fecha_nacimiento,
        puede_invitar_con_aut: response.data.puede_invitar_con_aut == `Si` ? true : false,
        puede_invitar_sin_aut: response.data.puede_invitar_sin_aut == `Si` ? true : false,
        flag_inv_puede_aut: response.data.flag_inv_puede_aut == `Si` ? true : false,
        phone: response.data.tel_celular,
        id: response.data.documento_nro,
        socio_id: response.data.socio_id
      });
    });
  }, []);

  return (
    <TouchableHighlight
      onPress={() => {
        navigation.navigate(`IndividualGroupMember`, {
          currentData
        });
      }}
    >
      <View style={style.container}>
        <View style={style.prompts}>
          <Text style={style.titles}>{data.name}</Text>
          <Text>{data.parentesco}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: GREY_CONTAINER_BACKGROUND,
    borderRadius: 10,
    margin: 10
  },
  mainTitleContainer: {
    marginBottom: 5,
    padding: 5
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
  titles: {
    fontWeight: `400`,
    color: `black`,
    fontSize: 19,
    textAlign: `left`
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
    height: 50,
    marginLeft: 20,
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `center`
  },
  divider: {
    alignSelf: `center`,
    width: `80%`,
    borderBottomColor: `white`,
    borderBottomWidth: 1
  }
});

export default GroupMember;
