import axios from 'axios';

const ApiRequest = token => {
  return axios.create({
    baseURL: 'https://dev.pondokdigital.pondokqu.id/api',
    headers: {
      Authorization: `bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export default ApiRequest;
