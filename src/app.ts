import { GET_UserInfo } from '@/services/UserRequest';

const UserInfo = async () => {
  const userLocalStorage = localStorage.getItem('Ring');
  const userSessionStorage = sessionStorage.getItem('Ring');
  const userId = userLocalStorage || userSessionStorage;
  if (userId) {
    const res = await GET_UserInfo(userId);
    console.log('【InitialState】获取初始化状态：', res.data);
    if (res.data && res.data.result) {
      // data: {uid: '10086', name:...}
      // message: null
      // result: true
      // tanken: null
      return res.data;
    } else {
      return false;
    }
  }
};

export async function getInitialState() {
  const data = await UserInfo();
  return data;
}
