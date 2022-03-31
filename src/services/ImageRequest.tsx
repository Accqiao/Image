
import axios from "axios";


export const getImageByRandom = async (uid: string)=>{

  return axios.get('http://localhost:8088/image/random/'+uid)
};

