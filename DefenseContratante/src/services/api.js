import axios from 'axios';
import * as auth from './auth';
import { dateFrom } from '../utils/converters/date';

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
    data.birthDate = dateFrom(data.birthDate);

    console.log(data.birthDate)

    const res = await api.post(`/auth/1/register`, data);

    if (res.data.isSuccess) {
      await auth.setToken(res.data.body.accessToken);
    }

    return Promise.resolve(res);
  } catch (err) {
    throw err.response.data.errors[0].description;
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
    throw err.response.data.errors[0].description;
  }
};

export const findCityIdByName = async (name) => {
  try {
    const res = await api.get(`/geographic/cities/name/Curitiba`);
    return Promise.resolve(res.data.id);
  } catch (err) {
    throw err.response.data.errors[0].description;
  }
};

export const findAttendedModalityProviders = async ({ modalityType }) => {
  try {
    console.log('type', modalityType)
    const res = await api.get(`/contracting/attended-modalities/all/${modalityType}`);
    console.log('res', res.data)
    return Promise.resolve(res.data);
  } catch (err) {
    throw err.response.data.errors[0].description;
  }
};

export const saveSolicitation = async (solicitation) => {
  try {
    solicitation.startDateTime = dateFrom(solicitation.startDateTime);
    solicitation.endDateTime = (solicitation.endDateTime && dateFrom(solicitation.endDateTime)) || null; 
    solicitation.turnOver = solicitation.turnOver || null; 
    solicitation.providerId = solicitation.providerUserId; 
    solicitation.attendedModalityId = solicitation.id; 

    console.log('solicitation', solicitation)
    
    const res = await api.post(`/contracting/solicitations`, solicitation);
    console.log(res)
    return Promise.resolve(res.data);
  } catch (err) {
    console.log(JSON.stringify(err))
    throw err.response.data.errors[0].description;
  }
};