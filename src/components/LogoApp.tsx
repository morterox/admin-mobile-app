import React from 'react';
import {Image} from 'react-native';

export default function LogoApp() {
  return <Image style={{width: 80, height: 80, marginRight: 40}} source={require(`../assets/logo.png`)} />;
}
