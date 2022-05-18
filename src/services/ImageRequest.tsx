import axios from 'axios';
import ex from 'umi/dist';

export const GET_ImageByRandom = async (uid?: string) => {
  return axios.get('http://localhost:8088/image/random/' + uid);
};
export const GET_ImageByCreateTime = async (params: {
  uid?: string;
  begin: number;
  rows: number;
}) => {
  return axios.get('http://localhost:8088/image/createtime', {
    params,
  });
};
export const GET_ImageByTags = async (params: {
  uid?: string;
  tag: string;
  begin: number;
  rows: number;
}) => {
  return axios.get('http://localhost:8088/image/select', {
    params,
  });
};

export const NUM_TRAIL_Image = async (data: any) => {
  return axios.post('http://localhost:8088/image/onetrail', data);
};
export const IMAGE_TRAIL = async (data: any) => {
  return axios.post('http://localhost:8088/image/trail', data);
};

export const GET_ImageByScore = async (params: {
  uid?: string;
  begin: number;
  rows: number;
}) => {
  return axios.get('http://localhost:8088/image/score', { params });
};
export const GET_ImageByTrail = async (params: {
  uid?: string;
  begin: number;
  rows: number;
}) => {
  return axios.get('http://localhost:8088/image/trail', { params });
};
export const GET_ImageByLike = async (params: {
  uid?: string;
  begin: number;
  rows: number;
}) => {
  return axios.get('http://localhost:8088/image/like', { params });
};

export const GET_ImageHistory = async (params: {
  uid: string;
  begin?: number;
  rows?: number;
}) => {
  return axios.get('http://localhost:8088/image/userhistory', {
    params,
  });
};
export const GET_ImageCarousel = async () => {
  return axios.get('http://localhost:8088/image/carousel');
};
export const GET_ImageByRecommend = async (params: {
  uid: string;
  CFbegin: number;
  Tagbegin: number;
}) => {
  return axios.get('http://localhost:8088/image/byRecommend', { params });
};

export const GET_OnlyImageInfo = async (params: { hid: string }) => {
  return axios.get('http://localhost:8088/image/getOnlyImageInfo', {
    params,
  });
};
