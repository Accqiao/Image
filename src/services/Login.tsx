import axios from "axios";
import {message} from "antd";
import {useModel} from "@@/plugin-model/useModel";
// const { initialState,refresh} = useModel("@@initialState");

export const toLogin = async (values: any )=>{
  return axios.post('http://localhost:8088/safe/login', {
    uid : values.uid,
    password: values.password,
  })
};

export const updatePWD = async (values: any )=>{
  return axios.post('http://localhost:8088/safe/update', {
    uid: values.uid,
    password: values.password,
    newPassword: values.newPassword,
  })
};


