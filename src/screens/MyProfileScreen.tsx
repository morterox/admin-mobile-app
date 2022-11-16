import React from 'react';
import {useEffect} from 'react';
import {useContext} from 'react';
import {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import ProfileBanner from '../components/MyProfile/ProfileBanner';
import ProfileData from '../components/MyProfile/ProfileData';
import ProfileFooter from '../components/MyProfile/ProfileFooter';
import {AuthContext} from '../navigation/AuthProvider';
import {apiGetSocio} from '../services/api';
import {BACKGROUND_COLOUR, THIRD_COLOR} from '../styles/common';

export default function MyProfileScreen({navigation}: any) {
  const {tokenId} = useContext(AuthContext);
  const [bannerData, setBannerData] = useState<any>();
  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiGetSocio(tokenId!);
      if (response.data) {
        const {direccion, socio_nombre, socio_apellido, tel_celular, unidades, documento_nro, fecha_nacimiento} =
          response.data;
        const fullName =
          socio_nombre[0].toUpperCase() +
          socio_nombre.substring(1) +
          ` ` +
          socio_apellido[0].toUpperCase() +
          socio_apellido.substring(1);
        setBannerData({
          name: fullName
        });
        setUserData({
          name: fullName,
          id: documento_nro,
          birthdate: fecha_nacimiento,
          phone: tel_celular,
          address: direccion,
          functionalUnit: unidades
        });
      }
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <ScrollView>
      <View style={style.container}>
        {bannerData && userData ? (
          <>
            <ProfileBanner data={bannerData} />
            <ProfileData data={userData} />
            <ProfileFooter />
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
    flex: 1,
    alignItems: `center`,
    justifyContent: `flex-start`,
    backgroundColor: BACKGROUND_COLOUR
  }
});
