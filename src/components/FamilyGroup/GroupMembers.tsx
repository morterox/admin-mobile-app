import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {GREY_CONTAINER_BACKGROUND} from '../../styles/common';
import GroupMember from './GroupMember';

interface IGroupMembers {
  members: [
    {
      name: string;
      parentesco: string;
      birthdate: string | null;
      puede_invitar_con_aut: string | null;
      puede_invitar_sin_aut: string | null;
      phone: string;
      id: string | null;
    }
  ];
}

const GroupMembers = ({members}) => {
  const groupMembersList = members.map((member: any, index: number) => {
    return <GroupMember key={index} data={member} />;
  });

  return (
    <View>
      <View style={style.infoContainer}>{groupMembersList}</View>
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
    display: `flex`,
    flex: 0.5,
    marginTop: 30,
    width: 400,
    padding: 15,
    //backgroundColor: GREY_CONTAINER_BACKGROUND,
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

export default GroupMembers;
