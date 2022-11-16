import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {BACKGROUND_COLOUR} from '../../styles/common';
import LogoApp from '../LogoApp';
import FAQAccordion from './FAQAccordion';
import FAQFooter from './FAQFooter';

const FAQ = ({faqs}) => {
  return (
    <View style={style.container}>
      <View style={style.logoApp}>
        <LogoApp />
      </View>
      <View>{faqs ? <FAQAccordion faqs={faqs} /> : <></>}</View>
      <View style={style.footer}>
        <FAQFooter />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    display: `flex`,
    flexDirection: `column`,
    minHeight: `100%`,
    width: `100%`,
    backgroundColor: BACKGROUND_COLOUR
  },
  logoApp: {
    alignSelf: `flex-end`,
    paddingBottom: 50
  },
  footer: {
    //position: `absolute`,
    marginBottom: 50,
    //bottom: 0,
    width: `100%`
  }
});

export default FAQ;
