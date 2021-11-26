import axios, { AxiosInstance, AxiosResponse } from 'axios';
import qs from 'qs';

// const BASE_URL = 'http://3.38.152.22:8081'

class HTTP {
  axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: 'https://api.github.com/users/',
      headers: { 'Content-Type': 'application/json' },
    });
    this.axios.defaults.paramsSerializer = (params) => {
      return qs.stringify(params);
    };
  }

  async getAxios(
    url: string,
    // requestParams: Partial<T>,
  ): Promise<AxiosResponse> {
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
