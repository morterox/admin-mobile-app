import {apiGetSupportMotives} from '../services/api';

export const getSupportCode = async (questionType: string): Promise<string> => {
  const questionCodes = await apiGetSupportMotives();
  console.log(questionCodes);
  switch (questionType) {
    case `Duda`:
      return ``;
    case `Consulta`:
      return ``;
  }
};
