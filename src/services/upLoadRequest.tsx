
import {request} from "@@/plugin-request/request";
import axios from "axios";


export const upLoad_Finish = async (values: any )=>{

  // return request('http://localhost:8088/upload/finish',{
  //   method: 'POST',
  //   params: values,
  // })
  return axios.post('http://localhost:8088/upload/finish', {
    ...values
  })
};
