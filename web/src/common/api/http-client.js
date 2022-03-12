import axios from 'axios';

const api = axios.create({
  baseURL: '/.api',
});

export const httpClient = {
  get({ url, params }) {
    return api({
      method: 'GET',
      url,
      params,
    });
  },
  post({ url, headers, data }) {
    return api({
      method: 'POST',
      headers,
      url,
      data,
    });
  },
  delete({ url, data }) {
    return api({
      method: 'DELETE',
      url,
      data,
    });
  },
  put({ url, data }) {
    return api({
      method: 'PUT',
      url,
      data,
    });
  },
};
