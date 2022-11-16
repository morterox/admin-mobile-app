import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {GREY_CONTAINER_BACKGROUND, RED_COLOR} from '../../styles/common';

interface IPersonalData {
  name: string;
  id: string;
  birthdate: string;
}

const PersonalData = ({name, id, birthdate}: IPersonalData) => {
  return (
    <View>
      <View style={style.prompts}>
        <Text style={style.titles}>Nombre y Apellido</Text>
        <Text>{name}</Text>
      </View>
      <View style={style.divider}></View>
      <View style={style.prompts}>
        <Text style={style.titles}>Documento</Text>
        <Text>{id != null ? id : ``}</Text>
      </View>
      <View style={style.divider}></View>
      <View style={style.prompts}>
        <Text style={style.titles}>Fecha de nacimiento</Text>
        <Text>
          {birthdate != null
            ? `${birthdate.slice(0, 10).split(`-`)[2]}/${birthdate.slice(0, 10).split(`-`)[1]}/${
                birthdate.slice(0, 10).split(`-`)[0]
              }`
            : ``}
        </Text>
      </View>
      <View style={style.divider}></View>
    </View>
  );
};

const ContactData = ({phone}) => {
  return (
    <View>
      <View style={style.prompts}>
        <Text style={style.titles}>Celular</Text>
        <Text>{phone != null ? phone : ``}</Text>
      </View>
      <View style={style.divider}></View>
    </View>
  );
};

const IndividualGroupData = ({data}) => {
  const navigation = useNavigation();
  return (
    <View>
      <Text
        onPress={() => {
          navigation.navigate(`familyGroup`, {});
        }}
        style={{color: RED_COLOR}}
      >
        Volver
      </Text>
      <View style={style.mainTitleContainer}>
        <Text style={style.mainTitle}>Datos personales</Text>
      </View>
      <View style={style.infoContainer}>
        <PersonalData name={data.name} id={data.id} birthdate={data.birthdate} />
      </View>
      <View style={style.mainTitleContainer}>
        <Text style={style.mainTitle}>Datos de contacto</Text>
      </View>
      <View style={style.dataContainer}>
        <ContactData phone={data.phone} />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
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
    marginLeft: 20,
    paddingBottom: 20
  },
  divider: {
    alignSelf: `center`,
    width: `80%`,
    borderBottomColor: `white`,
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 10
  }
});

export default IndividualGroupData;
