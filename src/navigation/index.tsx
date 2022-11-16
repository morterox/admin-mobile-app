import React from 'react';
import {AuthProvider} from './AuthProvider';
import Routes from './Routes';
import {ToastProvider} from 'react-native-toast-notifications';

export default function AppNavigation() {
  return (
    <>
      <ToastProvider>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ToastProvider>
    </>
  );
}
