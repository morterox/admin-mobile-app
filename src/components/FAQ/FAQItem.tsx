import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {List} from 'react-native-paper';

interface IFAQItem {
  text: string;
  title: string;
}

const FAQItem = ({text, title}: IFAQItem) => {
  return (
    <List.Accordion title={title} id={title} style={style.container}>
      <View style={style.item}>
        <Text style={style.text}>{text}</Text>
      </View>
    </List.Accordion>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: `white`,
    flex: 1
  },
  item: {
    padding: 20
  },
  text: {
    color: `black`,
    fontSize: 16
  }
});

export default FAQItem;
