import axios from "axios";


export const updateUserInfo = async (values: any )=>{

  return axios.post('http://localhost:8088/user/update', {
    ...values
  })
};