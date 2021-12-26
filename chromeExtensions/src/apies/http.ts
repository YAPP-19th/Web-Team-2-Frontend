import axios, { AxiosInstance } from 'axios';
import qs from 'qs';

import { getAccessToken } from '../apies/authAPI';
import ERROR_STATUS_CODE from '../apies/errorStatus';
import { getStorageTokens } from '../helper';
import { setTokens } from '../utils/auth';

export const BASE_URL = 'https://dotoriham.duckdns.org';

class HTTP {
  axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: BASE_URL,
    });
    this.axios.defaults.paramsSerializer = (params: any) => {
      return qs.stringify(params);
    };
  }

  intercept() {
    return this.axios.interceptors;
  }

  async getAxios<T>(url: string): Promise<T> {
    const { data } = await this.axios.get(url);
    return data;
  }

  async postAxios<T, R>(url: string, requestData: T): Promise<R> {
    const { data } = await this.axios.post(url, requestData);
    return data;
  }

  async deleteAxios<T>(url: string): Promise<T> {
    const { data } = await this.axios.delete(url);
    return data;
  }

  async patchAxios<T, R>(url: string, requestData: T): Promise<R> {
    const { data } = await this.axios.patch(url, requestData);
    return data;
  }
}

export const Client = new HTTP();

Client.intercept().request.use((config: any) => {
  const configs = config;
  const { accessToken, refreshToken } = getStorageTokens();
  configs.headers = {
    accessToken: `Bearer ${accessToken}`,
    refreshToken: `Bearer ${refreshToken}`,
    Accept: 'application/json',
  };
  return configs;
});

Client.intercept().response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    const {
      config,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      response: { status, data },
    } = error;
    // const errorMessage = data;
    const requestConfig = config;

    switch (status) {
      case ERROR_STATUS_CODE.BAD_REQUEST:
        throw new Error('Bad Request');
      // @TODO(jekoo): requestConfig 으로 origin request 처리 검토
      case ERROR_STATUS_CODE.UNAUTHORIZED:
        return getAccessToken().then((res) => {
          const { accessToken, refreshToken } = res.data;
          setTokens({ accessToken, refreshToken });
          return axios
            .get(`${BASE_URL}/${requestConfig.url}`, {
              headers: {
                accessToken: `Bearer ${accessToken}`,
                refreshToken: `Bearer ${refreshToken}`,
                Accept: 'application/json',
              },
            })
            .catch(() => new Error('Authorization Error'));
        });
      case ERROR_STATUS_CODE.NOT_FOUND:
        throw new Error('Not Found');
      case ERROR_STATUS_CODE.INTERNAL_SERVER_ERROR:
        throw new Error('Server Error');
      default:
        throw new Error('Unknown Error');
    }
  },
);
