import * as React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {View, Text} from 'react-native';
import {screen} from '../styles/common';
import FAQ from '../components/FAQ/FAQ';
import {useState} from 'react';
import {useEffect} from 'react';
import {apiGetFrequentQuestions} from '../services/api';

const FAQScreen = () => {
  const [faq, setFAQ] = useState([]);

  useEffect(() => {
    const fetchFAQ = async () => {
      const res = await apiGetFrequentQuestions();
      setFAQ(res);
    };

    fetchFAQ().catch(console.error);
  });

  return <ScrollView style={screen.container}>{faq.length == 0 ? <Text>....</Text> : <FAQ faqs={faq} />}</ScrollView>;
};

export default FAQScreen;
