import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {BACKGROUND_COLOUR, GREY_CONTAINER_BACKGROUND} from '../../styles/common';
import ProfileBanner from '../MyProfile/ProfileBanner';
import ProfileFooter from '../MyProfile/ProfileFooter';
import IndividualGroupData from './IndividualGroupData';
import IndividualGroupPermissions from './IndividualGroupPermissions';

const IndividualGroupMember = ({route, navigation}) => {
  console.log(route.params, `route params`);
  const {currentData} = route.params;
  const profile = {name: currentData.name};
  console.log(currentData, `DATA ACA`);
  return (
    <ScrollView>
      <View style={style.container}>
        <ProfileBanner data={profile} />
        <IndividualGroupData data={currentData} />
        <IndividualGroupPermissions data={currentData} />
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: BACKGROUND_COLOUR,
    alignItems: `center`,
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

export default IndividualGroupMember;
