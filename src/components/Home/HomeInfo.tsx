import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {AuthContext} from '../../navigation/AuthProvider';
import {apiGetSaldoSocio} from '../../services/api';
import {PRIMARY_COLOR} from '../../styles/common';

export default function HomeInfo() {
  const {tokenId} = useContext(AuthContext);
  const [saldo, setSaldo] = useState(`-`);

  useEffect(() => {
    apiGetSaldoSocio(tokenId).then((response) => {
      console.log(response.data, response.status, response);
      if (response.status == 200) {
        setSaldo(response.data);
      }
    });
  }, []);

  return (
    <View style={homeStyle.banner}>
      <Text style={homeStyle.bannerText}>Mi cuenta:</Text>
      <Text style={homeStyle.bannerText}>{saldo}</Text>
    </View>
  );
}

const homeStyle = StyleSheet.create({
  banner: {
    flexDirection: `row`,
    justifyContent: `space-around`,
    alignContent: `center`,
    backgroundColor: PRIMARY_COLOR,
    borderWidth: 5,
    borderRadius: 20,
    borderColor: PRIMARY_COLOR
  },
  divider: {
    borderColor: `white`,
    borderRightWidth: 2,
    marginTop: 5,
    fontSize: 40,
    height: 50
  },
  bannerText: {
    color: `white`,
    fontSize: 25
  }
});
