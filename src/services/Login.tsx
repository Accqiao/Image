import axios from 'axios';

export const ToLogin = async (values: any) => {
  return axios.post('http://localhost:8088/safe/login', {
    uid: values.uid,
    password: values.password,
  });
};

export const UPDATE_Password = async (values: any) => {
  return axios.post('http://localhost:8088/safe/update', {
    uid: values.uid,
    password: values.password,
    newPassword: values.newPassword,
  });
};
