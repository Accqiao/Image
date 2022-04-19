import axios from "axios";


export const GET_ImageLikeHistory = async (uid: string)=>{

  return axios.get('http://localhost:8088/like/userhistory',
    {
      params:{
        uid: uid,
      }
    }
  )
};
