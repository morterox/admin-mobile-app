import axios, {AxiosResponse} from 'axios';
import {useContext} from 'react';
import {BACKEND_URI, BACKEND_URI_2} from '../config/constants';
import {AuthContext} from '../navigation/AuthProvider';
import {IAuthtenticate, IPasswordChange, IPasswordReset, ISupportRequest} from './types';

export const STATUS_SUCCESS = 200 | 201 | 204;
export const STATUS_ERROR = 400 | 401 | 403 | 404 | 500;

/***************************** LOGIN  ******************************/

export const apiLogIn = async (user: IAuthtenticate): Promise<AxiosResponse> => {
  const {identificationType, identification, password, email} = user;
  try {
    const response = await axios.post(`${BACKEND_URI}/Login/authenticate`, {
      documento_tipo_cod: identificationType,
      documento_nro: identification,
      clave_app: password,
      email
    });
    return response;
  } catch (error) {
    console.log(`ERROR ON AUTHENTICATE REQUEST`);
    console.log(error);
    return {} as AxiosResponse;
  }
};

export const crearCancha = async (payload): Promise<AxiosResponse> => {
  try {
    const response = await axios({
      method: `post`,
      url: `${BACKEND_URI_2}/canchas`,
      data: payload
    });
    console.log(response, `RESPO`);
    return response;
  } catch (error) {
    console.log(`ERROR ON CREATE INVITATION REQUEST`);
    console.log(error);
    return {} as AxiosResponse;
  }
};

export const getCanchaById = async (id): Promise<AxiosResponse> => {
  try {
    const response = await axios({
      method: `get`,
      url: `${BACKEND_URI_2}/canchas/${id}`
    });
    return response;
  } catch (error) {
    console.log(`ERROR ON GET CANCHA REQUEST`);
    console.log(error);
    return {} as AxiosResponse;
  }
};

export const crearPedido = async (payload): Promise<AxiosResponse> => {
  try {
    const response = await axios({
      method: `post`,
      url: `${BACKEND_URI_2}/pedidos`,
      data: payload
    });
    console.log(response, `RESPO`);
    return response;
  } catch (error) {
    console.log(`ERROR ON CREATE INVITATION REQUEST`);
    console.log(error);
    return {} as AxiosResponse;
  }
};

export const getPedidoById = async (id): Promise<AxiosResponse> => {
  try {
    const response = await axios({
      method: `get`,
      url: `${BACKEND_URI_2}/pedidos/${id}`
    });
    return response;
  } catch (error) {
    console.log(`ERROR ON GET PEDIDO REQUEST`);
    console.log(error);
    return {} as AxiosResponse;
  }
};

export const postInvitation = async (payload, tokenId): Promise<AxiosResponse> => {
  console.log(`LLEGO ACA`);
  console.log(payload, `payyload`);
  console.log(payload.invitados, `payyload`);
  try {
    const response = await axios({
      method: `post`,
      headers: {
        sToken: tokenId
      },
      url: `${BACKEND_URI}/Invitacion/CrearInvitacion`,
      data: payload
    });
    return response;
  } catch (error) {
    console.log(`ERROR ON CREATE INVITATION REQUEST`);
    console.log(error);
    return {} as AxiosResponse;
  }
};

export const editarPedido = async (id, payload) => {
  try {
    const response = await axios({
      method: `put`,
      url: `${BACKEND_URI_2}/pedidos/${id}`,
      data: payload
    });
    return response;
  } catch (error) {
    console.log(`ERROR ON EDIT INVITATION REQUEST`);
    console.log(error);
    return {} as AxiosResponse;
  }
};

export const editarCancha = async (id, payload) => {
  try {
    const response = await axios({
      method: `put`,
      url: `${BACKEND_URI_2}/canchas/${id}`,
      data: payload
    });
    return response;
  } catch (error) {
    console.log(`ERROR ON EDIT INVITATION REQUEST`);
    console.log(error);
    return {} as AxiosResponse;
  }
};

export const putEditUserConfigurationApi = async (token, payload) => {
  try {
    console.log(payload, token);
    const response = await axios({
      method: `put`,
      headers: {
        sToken: token
      },
      url: `${BACKEND_URI}/Socio/ActualizarConfiguracion`,
      data: payload
    });
    return response;
  } catch (error) {
    console.log(`ERROR ON CREATE INVITATION REQUEST`);
    console.log(error);
    return {} as AxiosResponse;
  }
};

export const putInvitation = async (payload, tokenId): Promise<AxiosResponse> => {
  try {
    console.log(payload);
    const response = await axios({
      method: `put`,
      headers: {
        sToken: tokenId
      },
      url: `${BACKEND_URI}/Invitacion/ActualizarInvitacion`,
      data: payload
    });
    return response;
  } catch (error) {
    console.log(`ERROR ON CREATE INVITATION REQUEST`);
    console.log(error);
    return {} as AxiosResponse;
  }
};

export const authorizeInvitation = async (id, status, token): Promise<AxiosResponse> => {
  console.log(token, `TOKEN EN AUTHORIZATION`);
  try {
    const response = await axios({
      method: `put`,
      headers: {
        sToken: token,
        'Content-Type': `application/json`,
        'Content-Length': id.length
      },
      url: `${BACKEND_URI}/Invitacion/${status ? `DesautorizarInvitacionByNro` : `AutorizarInvitacionByNro`}`,
      data: `"${id}"`
    });
    return response;
  } catch (error) {
    console.log(`ERROR ON CREATE INVITATION REQUEST`, error);
    return {} as AxiosResponse;
  }
};

export const deletePedido = async (id): Promise<AxiosResponse> => {
  try {
    console.log(`${BACKEND_URI_2}/pedidos/${id}`);
    const response = await axios({
      method: `delete`,
      url: `${BACKEND_URI_2}/pedidos/${id}`
    });
    return response;
  } catch (error) {
    console.log(`ERROR ON DELTE GUEST REQUEST`, error);
    return {} as AxiosResponse;
  }
};

export const deleteCancha = async (id): Promise<AxiosResponse> => {
  try {
    console.log(`${BACKEND_URI_2}/canchas/${id}`);
    const response = await axios({
      method: `delete`,
      url: `${BACKEND_URI_2}/canchas/${id}`
    });
    return response;
  } catch (error) {
    console.log(`ERROR ON DELTE CANCHA REQUEST`, error);
    return {} as AxiosResponse;
  }
};

export const deleteGuestId = async (id, token): Promise<AxiosResponse> => {
  try {
    const response = await axios({
      method: `delete`,
      headers: {
        sToken: token,
        'Content-Type': `application/json`,
        'Content-Length': id.length
      },
      url: `${BACKEND_URI}/Invitacion/EliminarInvitadoInvitacion?sId=${id}`,
      data: id
    });
    return response;
  } catch (error) {
    console.log(`ERROR ON DELTE GUEST REQUEST`, error);
    return {} as AxiosResponse;
  }
};

export const deleteInvitation = async (id, token): Promise<AxiosResponse> => {
  console.log(id, `IDDD`, token, `ELIMINACION`);
  try {
    const response = await axios({
      method: `delete`,
      headers: {
        sToken: token,
        'Content-Type': `application/json`,
        'Content-Length': id.length
      },
      url: `${BACKEND_URI}/Invitacion/EliminarInvitacionByNro`,
      data: id
    });
    return response;
  } catch (error) {
    console.log(`ERROR ON CREATE INVITATION REQUEST`, error);
    return {} as AxiosResponse;
  }
};

export const getInvitationTypes = async (): Promise<any> => {
  const response = await axios({
    method: `get`,
    url: `${BACKEND_URI}/General/GetTiposInvitado`
  });
  return response.data;
};

export const getPedidos = async (socioId): Promise<any> => {
  const response = await axios({
    method: `get`,
    url: `${BACKEND_URI_2}/pedidos?id=${socioId}`
  });
  return response;
};

export const getCanchas = async (): Promise<any> => {
  const response = await axios({
    method: `get`,
    url: `${BACKEND_URI_2}/canchas`
  });
  return response;
};

export const getBoletinUrl = async (): Promise<any> => {
  const response = await axios({
    method: `get`,
    url: `${BACKEND_URI}/General/GetBoletin`
  });
  return response;
};

export const getInvitationRelationsTypes = async (tokenId): Promise<any> => {
  const response = await axios({
    method: `get`,
    url: `${BACKEND_URI}/Invitacion/GetTiposVinculo?sId=${tokenId}`
  });
  return response.data;
};

export const getCurrentMonthAmount = async (): Promise<any> => {
  const response = await axios({
    method: `get`,
    url: `${BACKEND_URI}/Invitacion/GetMaximoMensual`
  });
  return response.data;
};

export const getInvitationsOfUser = async (token_id): Promise<any> => {
  try {
    const response = await axios({
      method: `get`,
      headers: {
        sToken: token_id
      },
      url: `${BACKEND_URI}/Invitacion/GetInvitacionLista?token_id=${token_id}`
    });
    return response.data;
  } catch (e) {
    console.log(`ERROR EN OBTENER INVITACIONES`, e);
    throw e;
  }
};

export const getInvitationData = async (id, token): Promise<any> => {
  try {
    console.log(`${BACKEND_URI}/Invitacion/GetInvitacionByNro?sNumero=${id}`);
    const response = await axios({
      method: `get`,
      headers: {
        sToken: token
      },
      url: `${BACKEND_URI}/Invitacion/GetInvitacionByNro?sNumero=${id}`
    });
    return response;
  } catch (e) {
    console.log(`ERROR EN OBTENER INVITACION ${id}`, e);
    throw e;
  }
};

export const getIdentificationTypes = async (): Promise<any> => {
  const response = await axios({
    method: `get`,
    url: `${BACKEND_URI}/General/GetTiposInvitado`
  });
  return response.data;
};

export const apiResetPassword = async (data: IPasswordReset): Promise<any> => {
  const {identificationType, identification, email} = data;
  try {
    const response = await axios({
      method: `post`,
      url: `${BACKEND_URI}/Login/PasswordReset`,
      data: {
        documento_tipo_cod: identificationType,
        documento_nro: identification,
        email
      }
    });
    return response;
  } catch (error) {
    console.log(`ERROR ON PASSWORD RESET`);
    console.log(error);
    return 0;
  }
};

export const apiChangePassword = async (data: IPasswordChange): Promise<any> => {
  const {currentPassword, newPassword, tokenId} = data;
  try {
    const response = await axios({
      method: `post`,
      url: `${BACKEND_URI}/Login/PasswordChange`,
      data: {
        clave_app_actual: currentPassword,
        clave_app_nueva: newPassword,
        token_id: tokenId
      }
    });
    return response;
  } catch (error) {
    console.log(`ERROR ON CHANGE PASSWORD`);
    console.log(error);
    return 0;
  }
};

export const apiLogOut = async (token: string): Promise<any> => {
  try {
    const response = await axios({
      method: `post`,
      headers: {
        'Content-Type': `application/json`,
        'Content-Length': token.length
      },
      url: `${BACKEND_URI}/Login/CerrarSesion`,
      data: token
    });
    console.log(`RESPONSE`);
    console.log(response);
    return response;
  } catch (error) {
    console.log(`ERROR ON LOG OUT REQUEST`);
    console.log(error);
    return {} as AxiosResponse;
  }
};

/***************************** SOCIO  ******************************/

export const apiGetFamiliarGroup = async (token: string): Promise<any> => {
  try {
    const response = await axios({
      method: `get`,
      url: `${BACKEND_URI}/Socio/GetGrupoFamiliar?`,
      headers: {
        sToken: `${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log(`ERROR ON GET FAMILIAR GROUP REQUEST`);
    console.log(error);
    return {} as AxiosResponse;
  }
};

export const apiGetSocioById = async (token: string, id: number): Promise<any> => {
  try {
    const response = await axios({
      method: `get`,
      url: `${BACKEND_URI}/Socio/GetSocioById?sId=${id}`,
      headers: {
        sToken: `${token}`
      }
    });
    console.log(`RESPONSE`);
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(`ERROR ON GET SOCIO BY ID REQUEST`);
    console.log(error);
    return {} as AxiosResponse;
  }
};

export const apiGetSocio = async (token: string): Promise<any> => {
  try {
    const response = await axios({
      method: `get`,
      url: `${BACKEND_URI}/Socio/GetSocio`,
      headers: {
        sToken: `${token}`
      }
    });
    console.log(`RESPONSE`);
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(`ERROR ON GET SOCIO REQUEST`);
    console.log(error);
    return {} as AxiosResponse;
  }
};

export const apiGetSaldoSocio = async (token: string): Promise<any> => {
  try {
    const response = await axios({
      method: `get`,
      headers: {
        sToken: token
      },
      url: `${BACKEND_URI}/Socio/GetSaldo`
    });
    return response;
  } catch (error) {
    return {} as AxiosResponse;
  }
};

export const apiPutSocioUpdateConf = async (): Promise<any> => {};

/***************************** INVITACION  ******************************/

/***************************** GENERAL  ******************************/

export const apiGetFrequentQuestions = async (): Promise<any> => {
  try {
    const response = await axios({
      method: `get`,
      url: `${BACKEND_URI}/General/GetPreguntasFrecuentes`
    });
    if (response.status === 200) {
      return response.data;
    }
    return response;
  } catch (error) {
    console.log(`ERROR ON GET PREGUNTAS FRECUENTES REQUEST`);
    console.log(error);
    return {} as AxiosResponse;
  }
};

export const apiPostSupport = async (data: ISupportRequest): Promise<any> => {
  try {
    const response = await axios({
      method: `post`,
      data,
      url: `${BACKEND_URI}/General/PedidoDeSoporte`
    });
    return response;
  } catch (error) {
    return {} as AxiosResponse;
  }
};

export const apiGetSupportMotives = async (): Promise<any> => {
  const response = await axios({
    method: `get`,
    url: `${BACKEND_URI}/General/GetMotivosAyuda`
  });
  const data = response.data.map((motive: any) => {
    return {
      motivo: motive.valor_desc,
      valor_codigo: motive.valor_codigo
    };
  });
  return data;
};
