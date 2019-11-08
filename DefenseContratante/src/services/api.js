import axios from 'axios';
import * as auth from './auth';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/'
});

api.interceptors.request.use(async function (reqConfig) {
  var token = await auth.getToken();

  if (token) {
    reqConfig.headers.authorization = "Bearer " + token;
  }

  return reqConfig;
});

export const registerUser = async data => {
  try {
    const res = await api.post(`/auth/1/register`, data);

    if (res.data.isSuccess) {
      await auth.setToken(res.data.body.accessToken);
    }

    return Promise.resolve(res);
  } catch (err) {
    throw err.response.data.erros[0].description;
  }
};

export const login = async (documentIdentifier, password) => {
  try {
    function timeout(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    await timeout(10000)
    const res = await api.post(`/auth/sign-in`, {
      documentIdentifier,
      password
    });

    if (res.data.isSuccess) {
      await auth.setToken(res.data.body.accessToken);
    }
    return Promise.resolve(res);
  } catch (err) {
    throw err.response.data.erros[0].description;
  }
};

export const findCityIdByName = async (name) => {
  try {
    console.log('nome', name);
    
    const res = await api.get(`/geographic/cities/name/Curitiba`);
    console.log('eai',res)
    return Promise.resolve(res.data.id);
  } catch (err) {
    throw err.response.data.erros[0].description;
  }
};