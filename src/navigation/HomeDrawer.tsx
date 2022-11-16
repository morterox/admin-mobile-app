import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import LogoTitle from '../components/LogoTitle';
/** SCREEENS */
import HomeScreen from '../screens/HomeScreen';
import FAQScreen from '../screens/FAQScreen';
import LogOutScreen from '../screens/LogOutScreen';
import SupportScreen from '../screens/SupportScreen';
import Invitations from '../screens/InvitationsScreen';
import MyProfileScreen from '../screens/MyProfileScreen';
import FamilyGroupScreen from '../screens/FamilyGroupScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
/** SCREENS */
import {BACKGROUND_COLOUR, PRIMARY_COLOR, SECONDARY_COLOR, THIRD_COLOR} from '../styles/common';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {black} from 'react-native-paper/lib/typescript/styles/colors';
import IndividualGroupMember from '../components/FamilyGroup/IndividualGroupMember';
import NotificationsScreen from '../screens/Notifications';
import PedidosScreen from '../screens/ComensalesScreen';
import CanchasScreen from '../screens/CanchasScreen';

const style = StyleSheet.create({
  container: {backgroundColor: BACKGROUND_COLOUR, flex: 1, alignItems: `center`, justifyContent: `center`}
});

const Drawer = createDrawerNavigator();

const HomeDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: SECONDARY_COLOR
        },
        headerTintColor: `#fff`,
        headerTitleStyle: {
          fontWeight: `bold`
        }
      }}
    >
      <Drawer.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: `Inicio`,
          drawerItemStyle: {
            borderBottomWidth: 1,
            borderColor: THIRD_COLOR
          },
          headerRight: () => <LogoTitle backgroundColor={SECONDARY_COLOR} />
        }}
      />

      <Drawer.Screen
        name="invitation"
        options={{
          drawerLabelStyle: {
            fontSize: 20,
            color: `black`
          },
          title: `Invitaciones`
        }}
        component={Invitations}
      />

      <Drawer.Screen
        name="information"
        options={{
          drawerLabelStyle: {
            fontSize: 25,
            color: `black`
          },
          title: `Informacion`
        }}
        component={HomeScreen}
      />

      <Drawer.Screen
        name="perfil"
        options={{
          title: `Mi perfil`,
          drawerIcon: () => <FontAwesome name={`user`} color={PRIMARY_COLOR} size={18} />
        }}
        component={MyProfileScreen}
      />
      <Drawer.Screen
        name="familyGroup"
        options={{
          title: `Grupo Familiar`,
          drawerIcon: () => <FontAwesome name={`users`} color={PRIMARY_COLOR} size={18} />
        }}
        component={FamilyGroupScreen}
      />
      <Drawer.Screen
        name="changePassword"
        options={{
          title: `Cambiar contraseña`,
          drawerItemStyle: {
            borderBottomWidth: 1,
            borderColor: THIRD_COLOR
          },
          drawerIcon: () => <FontAwesome name={`lock`} color={PRIMARY_COLOR} size={18} />
        }}
        component={ChangePasswordScreen}
      />

      <Drawer.Screen
        name="notification"
        options={{
          title: `Notificaciones`,
          drawerIcon: () => <FontAwesome name={`bell`} color={PRIMARY_COLOR} size={18} />
        }}
        component={NotificationsScreen}
      />

      <Drawer.Screen
        name="FAQ"
        options={{
          title: `Preguntas Frecuentes`,
          drawerIcon: () => <FontAwesome name={`question-circle-o`} color={PRIMARY_COLOR} size={18} />
        }}
        component={FAQScreen}
      />
      <Drawer.Screen
        name="support"
        options={{
          title: `Soporte`,
          drawerItemStyle: {
            borderBottomWidth: 1,
            borderColor: THIRD_COLOR
          },
          drawerIcon: () => <FontAwesome name={`headphones`} color={PRIMARY_COLOR} size={18} />
        }}
        component={SupportScreen}
      />
      <Drawer.Screen
        name="logOut"
        options={{
          title: `Cerrar Sesión`,
          drawerIcon: () => <Ionicons name="log-out-outline" size={18} color={`black`} />
        }}
        component={LogOutScreen}
      />

      <Drawer.Screen
        name="IndividualGroupMember"
        options={{
          title: ``
        }}
        component={IndividualGroupMember}
      />

      <Drawer.Screen
        name="pedidos"
        options={{
          title: `Pedidos`
        }}
        component={PedidosScreen}
      />

      <Drawer.Screen
        name="canchas"
        options={{
          title: `Canchas`
        }}
        component={CanchasScreen}
      />
    </Drawer.Navigator>
  );
};

/*
Deberiamos agregar esto bloqueado para mockear lo de Informacion. 

<Drawer.Screen
  name="information"
  options={{
    swipeEnabled: false,
    title: `Informacion`
  }}
  component={NotificationsScreen}
/>
*/

export default HomeDrawer;
