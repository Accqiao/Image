import axios from 'axios';

export const GET_TrailHistory = async (params: {
  uid: string;
  begin?: number;
  rows?: number;
}) => {
  return axios.get('http://localhost:8088/history/historyList', {
    params,
  });
};
