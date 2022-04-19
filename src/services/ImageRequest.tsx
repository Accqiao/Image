
import axios from "axios";
import ex from "umi/dist";




export const NUM_TRAIL_Image = async (data: any)=>{
  return axios.post('http://localhost:8088/image/onetrail',
    data
  )
};

export const IMAGE_TRAIL = async (data: any)=>{
  return axios.post('http://localhost:8088/image/trail',
    data
  )
};
export const GET_ImageByRandom = async (uid: string)=>{

  return axios.get('http://localhost:8088/image/random/'+uid)
};


export const GET_ImageByScore = async (data: any)=>{
  return axios.post('http://localhost:8088/image/score',
    data
  )
};
export const GET_ImageByTrail = async (data: any)=>{
  return axios.post('http://localhost:8088/image/score',
    data
  )
};

export const GET_ImageHistory = async (uid: string)=>{

  return axios.get('http://localhost:8088/image/userhistory',
    {
      params:{
        uid: uid,
      }
    }
  )
};

export const GET_ImageCarousel = async ()=>{

  return axios.get('http://localhost:8088/image/carousel')
};

