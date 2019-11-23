import axios from 'axios';
import * as auth from './auth';
import { HubConnection, HubConnectionBuilder, HttpTransportType } from '@aspnet/signalr';

const baseUrl = 'http://localhost:5010';

const api = axios.create({
  baseURL: baseUrl
});

api.interceptors.request.use(async function (reqConfig) {
  var token = await auth.getToken();

  if (token) {
    reqConfig.headers.authorization = "Bearer " + token;
  }

  return reqConfig;
});

export const findMessagesFromUser = async ({ userId }) => {
  try {
    const res = await api.get(`/messages/${userId}`);

    return Promise.resolve(res.data);
  } catch (err) {
    throw err.response.data.errors[0].description;
  }
};

export const findNegociations = async () => {
  try {
    const res = await api.get(`/messages`);

    return Promise.resolve(res.data);
  } catch (err) {
    throw err.response.data.errors[0].description;
  }
};

export const buildHubConnection = async () => {
  const token = await auth.getToken();
  
  return new HubConnectionBuilder()
    .withUrl(`${baseUrl}/chat?access_token=${token}`, {
      skipNegotiation: true,
      transport: HttpTransportType.WebSockets
    })
    .build();
}