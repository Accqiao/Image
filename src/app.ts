


const UserInfo = ()=>{
  const userLocalStorage = localStorage.getItem("Ring");
  if(userLocalStorage && userLocalStorage.length > 0) {

    //如果localStorage存在，
    return JSON.parse(userLocalStorage)
  }else {
    //如果localStorage不存在，则就查看是否记住账号
    const userSessionStorage = sessionStorage.getItem("Ring");
    if(userSessionStorage && userSessionStorage.length > 0) {
      //如果sessionStorage存在，
      return JSON.parse(userSessionStorage)
    }else {
      return {
        result: false,
      }
    }
  }
}

export async function getInitialState() {
  const data = await UserInfo();
  console.log("获取LocalStorage",data)
  return data;
}
