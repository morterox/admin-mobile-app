import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import GroupMembers from '../components/FamilyGroup/GroupMembers';
import {AuthContext} from '../navigation/AuthProvider';
import {apiGetFamiliarGroup} from '../services/api';
import {BACKGROUND_COLOUR, RED_COLOR, THIRD_COLOR} from '../styles/common';

export default function FamilyGroupScreen({navigation}: any) {
  const {tokenId} = useContext(AuthContext);
  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const response = await apiGetFamiliarGroup(tokenId!);
      if (response) {
        const filteredData = response.map((member: any) => {
          console.log(member, `MEMBER`);
          const {
            socio_nombre,
            socio_apellido,
            parentesco_nombre,
            fecha_nacimiento,
            puede_invitar_con_aut,
            puede_invitar_sin_aut,
            tel_celular,
            documento_nro,
            socio_id
          } = member;
          return {
            socio_id: member.socio_id,
            name:
              socio_nombre[0].toUpperCase() +
              socio_nombre.substring(1).toLowerCase() +
              ` ` +
              socio_apellido[0].toUpperCase() +
              socio_apellido.substring(1).toLowerCase(),
            parentesco: parentesco_nombre,
            birthdate: fecha_nacimiento,
            puede_invitar_con_aut,
            puede_invitar_sin_aut,
            phone: tel_celular,
            id: documento_nro,
            socio_id
          };
        });
        setMembers(filteredData);
      }
    };
    fetchMembers().catch(console.error);
  }, []);

  return (
    <ScrollView>
      <View style={style.container}>
        {members ? (
          <>
            <GroupMembers members={members} />
            <View style={style.container_footer}>
              <View style={style.info}>
                <Text style={style.textInfo}>
                  Si alguno de estos datos se encuentra desactualizado, por favor, hacé click en el botón siguiente
                </Text>
              </View>
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
          </>
        ) : (
          <>
            <Text>...</Text>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    minHeight: 900,
    flex: 1,
    alignItems: `center`,
    justifyContent: `flex-start`,
    backgroundColor: BACKGROUND_COLOUR
  },
  container_footer: {
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
