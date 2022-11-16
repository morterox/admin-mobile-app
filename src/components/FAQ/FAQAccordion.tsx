import React from 'react';
import {StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {List} from 'react-native-paper';
import {BACKGROUND_COLOUR} from '../../styles/common';
import FAQItem from './FAQItem';

const FAQAccordion = ({faqs}) => {
  const items = faqs.map((faq: any) => {
    return <FAQItem key={faq.pregunta} title={faq.pregunta} text={faq.respuesta} />;
  });

  return (
    <SafeAreaView style={style.container}>
      <ScrollView>
        <List.AccordionGroup>{items}</List.AccordionGroup>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: BACKGROUND_COLOUR,
    flex: 1
  }
});

export default FAQAccordion;
