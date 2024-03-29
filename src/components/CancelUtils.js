import axios from 'axios';
export const createCancelTokenSource =async () => {
    return axios.CancelToken.source();
  };
export const cancelRequest = (token) => {
  token.cancel('Request canceled by user');
};
