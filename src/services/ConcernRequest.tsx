import axios from 'axios';

export const GET_ConcernList = async (params: {
  uid: string;
  begin: number;
  rows: number;
}) => {
  return axios.get('http://localhost:8088/concern/getUserList', {
    params,
  });
};

export const GET_ConcernAllList = async (params: { uid: string }) => {
  return axios.get('http://localhost:8088/concern/getAllList', {
    params,
  });
};

export const DEL_Concern = async (data: { uid: string; uuid: string }) => {
  return axios.post('http://localhost:8088/concern/cancel', data);
};

export const New_Concern = async (data: { uid: string; uuid: string }) => {
  return axios.post('http://localhost:8088/concern/new', data);
};

export const IS_Concern = async (data: { uid: string; uuid: string }) => {
  return axios.post('http://localhost:8088/concern/isconcern', data);
};
