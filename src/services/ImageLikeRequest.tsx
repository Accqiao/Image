import axios from 'axios';

export const GET_ImageLikeHistory = async (params: {
  uid: string;
  begin: number;
  rows: number;
}) => {
  return axios.get('http://localhost:8088/like/userhistory', {
    params,
  });
};

export const GET_ImageLikeHistory_Limit = async (params: {
  uid: string;
  begin: number;
  rows: number;
}) => {
  return axios.get('http://localhost:8088/like/historyList', {
    params,
  });
};
