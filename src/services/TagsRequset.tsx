import axios from "axios";


export const updateUserInfo = async (values: any )=>{

  return axios.get('http://localhost:8088/tags/list')
};
