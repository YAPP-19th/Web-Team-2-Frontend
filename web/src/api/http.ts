import ERROR_STATUS_CODE from 'api/errorStatus';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import qs from 'qs';

const BASE_URL = 'http://3.38.152.22:8081';

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
  // @TODO(jekoo): getAccessToken from localstorage
  const accessToken = 'getAccessToken()';
  configs.headers = {
    Authorization: `Bearer ${accessToken}`,
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
      // config,
      response: { status },
    } = error;

    // const requestConfig = config;

    switch (status) {
      case ERROR_STATUS_CODE.BAD_REQUEST:
        throw new Error('Bad Request');
      case ERROR_STATUS_CODE.UNAUTHORIZED:
        /* NOTE
         * Authorization 에러
         * 1. Refresh Token 이 잘못된 경우 새로운 로그인요청
         * 2. Refresh Token 을 통해 AccessToken 을 서버로부터 가져오고, localStorage 갱신 후 요청 무효화,
         * 3. Refresh Token 을 통해 AccessToken 을 서버로부터 가져오고, 요청을 재전송
         */
        throw new Error('Authorization Error');
      case ERROR_STATUS_CODE.NOT_FOUND:
        throw new Error('Not Found');
      case ERROR_STATUS_CODE.INTERNAL_SERVER_ERROR:
        throw new Error('Sever Error');
      default:
        throw new Error('Unknown Error');
    }
  },
);
