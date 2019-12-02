import axios from 'axios';
import * as auth from './auth';
import { dateFrom } from '../utils/converters/date';
import { PurifyApiKey } from '../Enviroment';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/'
});

const purifyApi = axios.create({
  baseURL: 'http://api1.webpurify.com/'
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
    const res = await api.get(`/geographic/cities/name/${name}`);
    return Promise.resolve(res.data.id);
  } catch (err) {
    throw err.response.data.errors[0].description;
  }
};

export const findAttendedModalityProviders = async ({ modalityType }) => {
  try {
    const res = await api.get(`/contracting/attended-modalities/all/${modalityType}`);
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

    const res = await api.post(`/contracting/solicitations`, solicitation);
    return Promise.resolve(res.data);
  } catch (err) {
    throw err.response.data.errors[0].description;
  }
};

export const findCreatedSolicicitations = async () => {
  try {
    const res = await api.get(`/contracting/solicitations/created`);
    return Promise.resolve(res.data);
  } catch (err) {
    throw err.response.data.errors[0].description;
  }
};

export const findOpenedSolicitations = async () => {
  try {
    const res = await api.get(`/contracting/solicitations/in-progress`);
    return Promise.resolve(res.data);
  } catch (err) {
    throw err.response.data.errors[0].description;
  }
};

export const finishSolicitation = async (values) => {
  try {

    values.speedGrade = values.speedGrade === -1 ? null : values.speedGrade;
    values.efficiencyGrade = values.efficiencyGrade === -1 ? null : values.efficiencyGrade;
    values.experienceGrade = values.experienceGrade === -1 ? null : values.experienceGrade;

    const res = await api.put(`/contracting/solicitations/${values.id}/finish`, values);
    return Promise.resolve(res.data);
  } catch (err) {
    throw err.response.data.errors[0].description;
  }
};

export const findSearchRadiusMeters = async () => {
  try {
    const res = await api.get(`/contracting/contracting-user/search-radius`);
    return Promise.resolve(res.data);
  } catch (err) {
    throw err.response.data.errors[0].description;
  }
};

export const updateSearchRadiusMeters = async (searchRadius) => {
  try {
    const res = await api.put(`/contracting/contracting-user/search-radius`, {
      KiloMetersSearchRadius: searchRadius
    });
    return Promise.resolve(res.data);
  } catch (err) {
    throw err.response.data.errors[0].description;
  }
};

export const findProviderComments = async ({ id }) => {
  try {
    const res = await api.get(`/contracting/contracting-user/provider-comments/${id}`);
    return Promise.resolve(res.data);
  } catch (err) {
    throw err.response.data.errors[0].description;
  }
};

export const checkProfanity = async (commentary) => {
  try {
    const params = new URLSearchParams();
    params.append('lang', 'pt');
    params.append('method', 'webpurify.live.return');
    params.append('format', 'json');
    params.append('api_key', PurifyApiKey);
    params.append('text', commentary);

    const result = await purifyApi.get('/services/rest', {
      params
    });

    return Promise.resolve(result.data.rsp.found == 0);
  } catch (err) {
    return false;
  }
};