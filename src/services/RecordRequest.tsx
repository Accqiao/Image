import axios from 'axios';

export const NEW_LIKE_DISLIKE = async (data: any) => {
  return axios.post('http://localhost:8088/like/new', data);
};
export const NOT_LIKE_DISLIKE = async (data: any) => {
  return axios.post('http://localhost:8088/like/cancel', data);
};

export const ONE_HISTORY = async (data: { hid: string; uid: string }) => {
  return axios.post('http://localhost:8088/history/one', data);
};

export const GET_Record = async (params: any) => {
  return axios.get('http://localhost:8088/record/', {
    params,
  });
};
