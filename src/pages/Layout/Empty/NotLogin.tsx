import {Button, Result} from "antd";

export default () =>{

  return(
    <Result
      status="403"
      title="Not Login"
      subTitle="少年，你好像没有登录啊~~~."
      // extra={<Button type="primary">To Login</Button>}
    />
  )
}
