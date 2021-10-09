import axios, { AxiosResponse } from 'axios';

export const test = (): Promise<AxiosResponse> => {
  return axios
    .create({
      method: 'post',
      timeout: 10000,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })
    .request({
      url: 'url',
      data: 'test-data',
    });
};
