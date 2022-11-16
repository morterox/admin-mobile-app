import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {GREY_CONTAINER_BACKGROUND} from '../../styles/common';

interface IProfileData {
  data: {
    name: string;
    id: string;
    birthdate: string;
    phone: string;
    address: string;
    functionalUnit?: string;
  };
}

interface IPersonalData {
  name: string;
  id: string;
  birthdate: string;
}

interface IContactData {
  phone: string;
  address: string;
  functionalUnit?: string;
}

const PersonalData = ({name, id, birthdate}: IPersonalData) => {
  const parsedDate = birthdate.slice(0, 10).split(`-`);
  return (
    <View>
      <View style={style.prompts}>
        <Text style={style.titles}>Nombre y Apellido</Text>
        <Text>{name}</Text>
      </View>
      <View style={style.divider}></View>
      <View style={style.prompts}>
        <Text style={style.titles}>Documento</Text>
        <Text>{id}</Text>
      </View>
      <View style={style.divider}></View>
      <View style={style.prompts}>
        <Text style={style.titles}>Fecha de nacimiento</Text>
        <Text>{`${parsedDate[2]}/${parsedDate[1]}/${parsedDate[0]}`}</Text>
      </View>
      <View style={style.divider}></View>
    </View>
  );
};

const ContactData = ({phone, address, functionalUnit}: IContactData) => {
  return (
    <View>
      <View style={style.prompts}>
        <Text style={style.titles}>Celular</Text>
        <Text>{phone}</Text>
      </View>
      <View style={style.divider}></View>
      <View style={style.prompts}>
        <Text style={style.titles}>Dirección</Text>
        <Text>{address}</Text>
      </View>
      <View style={style.divider}></View>
      <View style={style.prompts}>
        <Text style={style.titles}>Unidad Funcional</Text>
        <Text>{functionalUnit ? functionalUnit : ``}</Text>
      </View>
      <View style={style.divider}></View>
    </View>
  );
};

const ProfileData = ({data}: IProfileData) => {
  return (
    <View>
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
        <ContactData phone={data.phone} address={data.address} functionalUnit={data?.functionalUnit} />
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
    display: `flex`,
    flexDirection: `column`,
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

export default ProfileData;
