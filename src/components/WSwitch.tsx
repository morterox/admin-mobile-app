import * as React from 'react';
import {Switch} from 'react-native-paper';
import {RED_COLOR} from '../styles/common';

const WSwitch = ({value, setter}) => {
  const onToggleSwitch = () => setter(!value);

  return <Switch value={value} onValueChange={onToggleSwitch} color={RED_COLOR} />;
};

export default WSwitch;
