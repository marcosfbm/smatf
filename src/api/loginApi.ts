import {axiosApi} from './axiosApi';

export const loginRequest = async (email: string, password: string) => {
  const request = await axiosApi.post('/session', {email, senha: password});

  return request.data;
};
