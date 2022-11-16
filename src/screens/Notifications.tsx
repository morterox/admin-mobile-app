import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, Linking, ScrollView} from 'react-native';
import HomeInfo from '../components/Home/HomeInfo';
import {PRIMARY_COLOR, SECONDARY_COLOR} from '../styles/common';
import {useNavigation} from '@react-navigation/native';
import HomeCarousel from '../components/Home/HomeCarousel';
import {useToast} from 'react-native-toast-notifications';
import {getBoletinUrl} from '../services/api';
import {Dimensions} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';

async function getNotifications() {
  return {
    status: 200,
    data: [
      {
        notification: `Se ha confirmado su pedido.`
      },
      {
        notification: `Se alquilo la cancha.`
      },
      {
        notification: `Invitacion autorizada.`
      },
      {
        notification: `Invitacion autorizada.`
      },
      {
        notification: `Invitacion autorizada.`
      },
      {
        notification: `Contraseña actualizada.`
      },
      {
        notification: `Cambio actualizado.`
      }
    ]
  };
}

export default function NotificationsScreen({navigation}) {
  const toast = useToast();
  const navigationDrawer = useNavigation();
  const {tokenId} = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getNotifications().then((response) => {
      if (response.status == 200) {
        setNotifications(response.data);
      }
    });
  }, []);

  return (
    <View style={homeStyle.container}>
      <Text style={{fontSize: 25}}>Notificaciones</Text>
      <Text
        onPress={() => {
          setNotifications([]);
        }}
        style={{fontSize: 15, color: `red`}}
      >
        Limpiar todo
      </Text>
      <ScrollView>
        {notifications.map((notification, index) => {
          return (
            <View style={homeStyle.notificationContainer}>
              <View style={homeStyle.xButton}>
                <Text
                  onPress={() => {
                    const copy = [].concat(notifications);
                    copy.splice(index, 1);
                    setNotifications(copy);
                  }}
                  style={{color: `red`}}
                >
                  X
                </Text>
              </View>
              <Text>{notification.notification}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const homeStyle = StyleSheet.create({
  container: {
    padding: 40
  },
  notificationContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: `gray`,
    padding: 20,
    marginTop: 15
  },
  xButton: {
    width: `100%`,
    display: `flex`,
    flexDirection: `column`,
    alignItems: `flex-end`
  }
});
