import axios from 'axios';

import {getUserLocalStorage} from '../context/auth_provider/util';

const axiosApi = axios.create({
  //baseURL: 'http://10.0.2.2:3333/',
  // baseURL: 'http://24.152.39.130:3333/', // produção
  baseURL: 'http://10.0.0.79:8083/', // localhost
});

axiosApi.interceptors.request.use(
    async (config) => {
      const user = await getUserLocalStorage();

      if (user && user.token) {
        config.headers.setAuthorization(user.token)
      }
      
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
);

export { axiosApi }
export default axiosApi
