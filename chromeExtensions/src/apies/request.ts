import { of } from 'await-of';
import axios, { AxiosRequestHeaders, AxiosResponse, Method } from 'axios';

import { getStorageTokens } from '../helper/storageHelper';

const api = axios.create({
  baseURL: 'https://dotoriham.duckdns.org/',
});

export async function request<R, P extends unknown>(
  method: Method,
  url: string,
  params?: P,
  headers?: AxiosRequestHeaders,
): Promise<R> {
  const { accessToken = '' } = getStorageTokens();
  const [res, err] = await of(
    api.request<R>({
      method,
      url,
      params,
      headers: {
        accessToken: `Bearer ${accessToken}`,
        ...headers,
      },
    }),
  );
  if (err) {
    throw err;
  }
  const { data } = res as AxiosResponse<R>;
  return data;
}
