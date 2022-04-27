import axios from 'axios';

export const NEW_InterestTag = async (data: { uid: string; tag: string }) => {
  return axios.post('http://localhost:8088/interest/insert', data);
};

export const DEL_InterestTag = async (data: { id: string }) => {
  return axios.post('http://localhost:8088/interest/del', data);
};
export const GET_InterestByUser = async (params: { uid: string }) => {
  return axios.get('http://localhost:8088/interest/select', { params });
};
