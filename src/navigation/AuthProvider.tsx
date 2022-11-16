import React, {createContext, useState} from 'react';
import {apiChangePassword, apiLogIn, apiLogOut, apiResetPassword} from '../services/api';
import {IAuthtenticate, IPasswordChange, IPasswordReset} from '../services/types';

export interface IAuthContext {
  isSignedIn: boolean;
  userId: Maybe<string>;
  fullName: Maybe<string>;
  email: Maybe<string>;
  tokenId: Maybe<string>;
  logIn: (data: IAuthtenticate) => Promise<any>;
  resetPassword: (data: IPasswordReset) => Promise<void>;
  changePassword: (data: IPasswordChange) => Promise<boolean>;
  logOut: (tokenId: string) => Promise<any>;
}

interface Props {
  children: React.ReactNode;
}

export const AUTH_CONTEXT_DEFAULT_VALUE = {
  isSignedIn: false,
  userId: null,
  fullName: null,
  email: null,
  tokenId: null,
  logIn: async () => {
    return;
  },
  resetPassword: async () => {
    return;
  },
  changePassword: async () => {
    return false;
  },
  logOut: async () => {}
};

export const AuthContext = createContext<IAuthContext>(AUTH_CONTEXT_DEFAULT_VALUE);

function processPermisos(permisos) {
  const permisosFormatted = {};
  permisos.forEach((permiso) => {
    permisosFormatted[permiso.modulo_cod] = {};
    permiso.permisos.forEach((permisoTipo) => {
      permisosFormatted[permiso.modulo_cod][permisoTipo.permiso_cod] = true;
    });
  });
  return permisosFormatted;
}

export const AuthProvider = ({children}: Props) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [userId, setUserId] = useState<Maybe<string>>(null);
  const [fullName, setFullName] = useState<Maybe<string>>(null);
  const [socioId, setSocioId] = useState<Maybe<string>>(null);
  const [email, setEmail] = useState<Maybe<string>>(null);
  const [tokenId, setTokenId] = useState<Maybe<string>>(null);
  const [permisos, setPermisos] = useState<Maybe<string>>({});

  const logIn = async (data: IAuthtenticate) => {
    const response = await apiLogIn(data);
    console.log(response.data, `response.dataaaa`);
    if (response.data.resultado === `SI`) {
      setPermisos(processPermisos(response.data.modulos_permisos));
      setIsSignedIn(true);
      setEmail(data.email);
      setSocioId(response.data.socio_id);
      console.log(response.data[`token_id`], `TOKEN DE INGRESO`);
      setTokenId(response.data[`token_id`]);
      return true;
    } else if (response.data.resultado === `NO`) {
      console.log(`CANNOT FOUND USER`);
      return false;
    } else {
      console.log(`LOG IN UNSUCCESSUFL`);
    }
  };

  const logOut = async (tokenId: string) => {
    const response = await apiLogOut(tokenId);
    if (response.status === 200) {
      setIsSignedIn(false);
    } else {
      //THIS SHOULD BE DELETED
      setIsSignedIn(false);
    }
  };

  const resetPassword = async (data: IPasswordReset) => {
    const response = await apiResetPassword(data);
  };

  const changePassword = async (data: IPasswordChange): Promise<boolean> => {
    const response = await apiChangePassword(data);
    if (response.status === 200) {
      await logOut(data.tokenId);
      return true;
    } else {
      return false;
    }
  };

  const cleanValues = async (): Promise<void> => {
    setIsSignedIn(false);
    setTokenId(``);
    setEmail(``);
  };

  const value = {
    isSignedIn,
    socioId,
    userId,
    fullName,
    email,
    tokenId,
    permisos,
    logIn,
    resetPassword,
    changePassword,
    logOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): IAuthContext => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error(`[useAuthContext] Hook not used under auth context provider`);
  }
  return context;
};
