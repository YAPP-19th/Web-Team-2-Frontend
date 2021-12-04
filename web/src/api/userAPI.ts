import { BASE_URL } from 'api/http';
import axios, { AxiosResponse } from 'axios';
import { auth } from 'models/auth';

export const login = (request: auth.ILoginRequest): Promise<AxiosResponse> => {
  return axios.post(`${BASE_URL}/api/v1/user/oauth2Login`, request);
};
