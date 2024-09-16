import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

/*import * as process from 'node:process';
import {config} from 'dotenv';

config()*/

const $host = axios.create({
  //baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/`,
  baseURL: `http://127.0.0.1:8000/api/`,
});

const $authHost = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/`,
});

const serializeInterceptor = (config: InternalAxiosRequestConfig) => {
  if (config.method === 'get') {
    config.paramsSerializer = {
      indexes: null
    };
  }
  
  return config;
};

$host.interceptors.request.use(serializeInterceptor);
$authHost.interceptors.request.use(serializeInterceptor);

$authHost.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

$authHost.interceptors.request.use(async (config: any) => {
  const token = Cookies.get('access_token');
  if (config.headers && token) {
    config.headers.authorization = `JWT ${token}`;
  }
  return config;
});

export { 
  $host,
  $authHost
};
