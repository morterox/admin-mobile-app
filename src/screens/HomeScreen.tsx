import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image, Linking} from 'react-native';
import HomeInfo from '../components/Home/HomeInfo';
import {PRIMARY_COLOR, SECONDARY_COLOR} from '../styles/common';
import {useNavigation} from '@react-navigation/native';
import HomeCarousel from '../components/Home/HomeCarousel';
import {useToast} from 'react-native-toast-notifications';
import {getBoletinUrl} from '../services/api';
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get(`window`).width;
const windowHeight = Dimensions.get(`window`).height;

export default function HomeScreen({navigation}) {
  const toast = useToast();
  const navigationDrawer = useNavigation();

  useEffect(() => {
    if (navigation.getState().history.length > 1) {
      navigation.getState().history.forEach((nav: any) => {
        if (nav.key.split(`-`)[0] == `notification`) {
          toast.show(`Función en construcción`, {
            type: `warning`,
            placement: `top`,
            duration: 8000,
            animationType: `slide-in`
          });
        }
      });
    }
  });

  const handleInProgressService = () => {
    toast.show(`Función en construcción`, {
      type: `warning`,
      placement: `top`,
      duration: 8000,
      animationType: `slide-in`
    });
  };

  const handleClickBoletin = () => {
    getBoletinUrl().then((response) => {
      if (response.status == 200) {
        Linking.canOpenURL(response.data).then((supported) => {
          if (supported) {
            Linking.openURL(response.data);
          } else {
            toast.show(`Error al abrir ${response.data}`, {
              type: `danger`,
              placement: `top`,
              duration: 8000,
              animationType: `slide-in`
            });
          }
        });
      } else {
        toast.show(`Error al obtener boletin`, {
          type: `danger`,
          placement: `top`,
          duration: 8000,
          animationType: `slide-in`
        });
      }
    });
  };

  return (
    <View style={homeStyle.container}>
      <HomeInfo />
      <View style={homeStyle.mainBanner}>
        <Text style={homeStyle.mainTittle}>Servicios</Text>
      </View>
      <View style={homeStyle.carousel}>
        <View
          onTouchEnd={() => {
            navigationDrawer.navigate(`invitation`, {});
          }}
          style={homeStyle.carouselItem}
        >
          <Image style={homeStyle.logoImage} source={require(`../assets/invitados.png`)} />
          <Text style={{fontSize: 15}}>Invitados</Text>
        </View>
        <View onTouchStart={handleInProgressService} style={homeStyle.carouselItem}>
          <Image style={homeStyle.logoImage} source={require(`../assets/domesticas.png`)} />
          <Text style={{fontSize: 15}}>Domesticas</Text>
        </View>
        <View onTouchStart={handleInProgressService} style={homeStyle.carouselItem}>
          <Image style={homeStyle.logoImage} source={require(`../assets/eventuales.png`)} />
          <Text style={{fontSize: 15}}>Eventuales</Text>
        </View>
        <View
          onTouchEnd={() => {
            navigationDrawer.navigate(`pedidos`, {});
          }}
          style={homeStyle.carouselItem}
        >
          <Image style={homeStyle.logoImage} source={require(`../assets/comensales.png`)} />
          <Text style={{fontSize: 15}}>Comensales</Text>
        </View>
      </View>
      <View style={{...homeStyle.carousel, marginTop: 20}}>
        <View onTouchStart={handleInProgressService} style={homeStyle.carouselItem}>
          <Image style={homeStyle.logoImage} source={require(`../assets/llaves.png`)} />
          <Text style={{fontSize: 15}}>Llaves</Text>
        </View>
        <View onTouchStart={handleInProgressService} style={homeStyle.carouselItem}>
          <Image style={homeStyle.logoImage} source={require(`../assets/alquileres.png`)} />
          <Text style={{fontSize: 15}}>Alquileres</Text>
        </View>
        <View onTouchStart={handleInProgressService} style={homeStyle.carouselItem}>
          <Image style={homeStyle.logoImage} source={require(`../assets/obras.png`)} />
          <Text style={{fontSize: 15}}>Obras</Text>
        </View>
        <View
          onTouchEnd={() => {
            navigationDrawer.navigate(`canchas`, {});
          }}
          style={homeStyle.carouselItem}
        >
          <Image style={homeStyle.logoImage} source={require(`../assets/actividades.png`)} />
          <Text style={{fontSize: 15}}>Actividades</Text>
        </View>
      </View>
      <View style={homeStyle.secondBanner}>
        <Text style={homeStyle.subTitle}>Novedades</Text>
      </View>
      <HomeCarousel />
      <View onTouchStart={() => handleClickBoletin()} style={homeStyle.boletinButton}>
        <Text style={homeStyle.boletinButton.text}>Boletín</Text>
      </View>
    </View>
  );
}

const homeStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: `flex-start`,
    padding: 20,
    backgroundColor: `white`
  },
  logoImage: {width: (windowWidth - 40) / 4, height: (windowWidth - 40) / 4},
  mainBanner: {
    marginTop: 20,
    display: `flex`,
    flexDirection: `row`,
    justifyContent: `space-between`
  },
  secondBanner: {
    marginTop: 20,
    display: `flex`,
    flexDirection: `row`,
    justifyContent: `space-between`
  },
  mainTittle: {
    color: SECONDARY_COLOR,
    fontSize: 26
  },
  seeMoreContainer: {
    flexDirection: `row`
  },
  seeMore: {
    color: SECONDARY_COLOR,
    paddingRight: 10,
    fontSize: 18
  },
  carousel: {
    display: `flex`,
    flexDirection: `row`,
    width: `100%`,
    paddingTop: 20,
    justifyContent: `space-around`,
    flexWrap: `wrap`
  },
  carouselItem: {
    alignSelf: `center`,
    display: `flex`,
    flexDirection: `column`,
    alignItems: `center`
  },
  subTitle: {
    color: SECONDARY_COLOR,
    fontSize: 26,
    alignSelf: `center`
  },
  newsContainer: {
    flex: 0.6,
    margin: 10,
    marginTop: 20,
    paddingTop: 30,
    backgroundColor: `#e0e0e0`,
    borderRadius: 15,
    shadowColor: `#bebebe`,
    shadowRadius: 20,
    width: `80%`,
    marginLeft: `10%`
  },
  boletinButton: {
    alignSelf: `center`,
    display: `flex`,
    justifyContent: `center`,
    marginTop: 5,
    width: 250,
    height: 60,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 10,
    text: {
      textAlign: `center`,
      color: `white`,
      fontWeight: `400`,
      fontSize: 20
    }
  }
});
