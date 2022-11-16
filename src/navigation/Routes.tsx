import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import HomeDrawer from './HomeDrawer';
import {useAuthContext} from './AuthProvider';

export default function Routes() {
  const {isSignedIn} = useAuthContext();

  console.log(`HERE IS SIGNED IN`);
  console.log(isSignedIn);

  return (
    <>
      <NavigationContainer>{isSignedIn ? <HomeDrawer /> : <AuthStack />}</NavigationContainer>
    </>
  );
}
