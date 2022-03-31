import axios from "axios";


export const getTags = async ()=>{

  return axios.get('http://localhost:8088/tags/list')
};
