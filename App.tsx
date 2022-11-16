import React from 'react';

import {setCustomText} from 'react-native-global-props';

const customTextProps = {
  style: {
    fontSize: 16,
    color: `black`
  }
};

// Calling the functions and passing the custom props into their respective params
//setCustomView(customViewProps);
//setCustomTextInput(customTextInputProps);
setCustomText(customTextProps);
//setCustomImage(customImageProps);
//setCustomTouchableOpacity(customTouchableOpacityProps);

import AppNavigation from './src/navigation';

const App = () => {
  return <AppNavigation />;
};

export default App;
