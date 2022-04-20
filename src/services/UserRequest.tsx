import axios from 'axios';

export const UPDATE_UserInfo = async (values: any) => {
  return axios.post('http://localhost:8088/user/update', {
    ...values,
  });
};

export const GET_UserInfo = async (uid: string) => {
  return axios.get('http://localhost:8088/user/getUserInfo', {
    params: {
      uid: uid,
    },
  });
};
