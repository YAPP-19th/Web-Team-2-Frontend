import ERROR_STATUS_CODE from 'api/errorStatus';
import { getAccessToken } from 'api/userAPI';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import qs from 'qs';
import { getTokens, setTokens } from 'utils/auth';

export const BASE_URL = 'http://3.38.152.22:8081';

class HTTP {
  axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: BASE_URL,
    });
    this.axios.defaults.paramsSerializer = (params) => {
      return qs.stringify(params);
    };
  }

  intercept() {
    return this.axios.interceptors;
  }

  async getAxios(
    url: string,
    // requestParams: Partial<T>,
  ): Promise<AxiosResponse> {
    // const params = requestParams
    const params = {};
    const { data } = await this.axios.get(url, { params });
    return data;
  }

  async postAxios<T>(url: string, requestData: T): Promise<AxiosResponse> {
    const { data } = await this.axios.post(url, requestData);
    return data;
  }
}

export const Client = new HTTP();

Client.intercept().request.use((config) => {
  const configs = config;
  const { accessToken, refreshToken } = getTokens();
  configs.headers = {
    accessToken: `Bearer ${accessToken}`,
    refreshToken: `Bearer ${refreshToken}`,
    Accept: 'application/json',
  };
  return configs;
});

Client.intercept().response.use(
  (response) => {
    return response;
  },
  (error) => {
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
