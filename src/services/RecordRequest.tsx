import axios from "axios";
import request from '@/utils/request';

export const NEW_LIKE_DISLIKE = async (data: any)=>{
  return axios.post('http://localhost:8088/like/new',
    data
  )
}
export const NOT_LIKE_DISLIKE = async (data: any)=>{
  return axios.post('http://localhost:8088/like/cancel',
    data
  )
};

export const ONE_HISTORY = async (data: any)=>{
  return axios.post('http://localhost:8088/history/one',
    {...data}
  )
};






export const GET_Record = async (params: any)=>{

  return request('http://localhost:8088/record/', {
    params,
  });
};
