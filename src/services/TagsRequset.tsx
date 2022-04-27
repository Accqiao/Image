import axios from 'axios';

export const GET_AllTags = async () => {
  return axios.get('http://localhost:8088/tags/list');
};

export const GET_SelectTagsByLevel = async (level: string) => {
  return axios.get('http://localhost:8088/tags/select', {
    params: {
      level: level,
    },
  });
};
