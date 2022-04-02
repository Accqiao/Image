
import axios from "axios";
import ex from "umi/dist";


export const getImageByRandom = async (uid: string)=>{

  return axios.get('http://localhost:8088/image/random/'+uid)
};

export const NUM_TRAIL_Image = async (data: any)=>{
  return axios.post('http://localhost:8088/image/onetrail',
    data
  )
};
