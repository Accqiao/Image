import axios from 'axios';

export const GET_ImageByPage = async (params: {
  page: number;
  row: number;
}) => {
  return axios.get('http://localhost:8088/image/page', {
    params,
  });
};
export const GET_ImageInfo = async (params: { hid: string; uid: string }) => {
  return axios.get('http://localhost:8088/image/getImageInfo', {
    params,
  });
};
export const UPDATE_Image = async (data: any) => {
  return axios.post('http://localhost:8088/image/update', data);
};

export const CHANGE_ImageTags = async (data: any) => {
  return axios.post('http://localhost:8088/imagetags/change', data);
};
