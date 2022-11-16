export const BACKEND_URI = process.env.REACT_APP_BACKEND_URI ?? `http://190.106.131.51:9658/api`;
export const PUBLIC_URL = process.env.PUBLIC_URL;
export const BACKEND_URI_2 = "http://localhost:8080";

/** COMMON COLLORS **/
export const identificationTypes = [`DNI`, `CI`];

export const relationTypes = [
  {id: 1 /*`T` */, label: `Titular`},
  {id: 1 /*`Y` */, label: `Conyuge`},
  {id: 1 /*`JO` */, label: `Hijo`},
  {id: 1 /*`P` */, label: `Padre`},
  {id: 1 /*`M` */, label: `Madre`},
  {id: 1 /*`NO` */, label: `Nieto`},
  {id: 1 /*`HO` */, label: `Hermano`},
  {id: 1 /*`NA` */, label: `Nuera`},
  {id: 1 /*`O` */, label: `Otros`}
];

export const invitationTypes = [`Por un dia`, `Permanente`];

export const supportQuestionTypes = [`Duda`, `Consulta`];
