import * as React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import Support from '../components/Support/Support';
import {screen} from '../styles/common';

const SupportScreen = () => {
  return (
    <ScrollView style={screen.container}>
      <Support />
    </ScrollView>
  );
};

export default SupportScreen;
