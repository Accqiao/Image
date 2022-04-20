import axios from 'axios';

export const GET_TrailHistory = async (uid: string) => {
  return axios.get('http://localhost:8088/history/userhistory', {
    params: {
      uid: uid,
    },
  });
};
