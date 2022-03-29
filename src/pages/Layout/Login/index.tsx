import {Avatar, Badge, Button, Card, Checkbox, Form, Input, message, Modal} from "antd";
import React, {useEffect, useState} from "react";
import {UserOutlined} from "@ant-design/icons";
import {toLogin} from "@/services/Login";
import {useModel} from "@@/plugin-model/useModel";


export default () => {
  const { initialState,refresh} = useModel("@@initialState");

  const [dot,setDot] = useState(false);
  const [isLogin,setIsLogin] = useState<boolean>(false);
  const [isVisible,setIsVisible] = useState<boolean>(false);
  const [isRegister,setIsRegister] = useState<boolean>(false);
  const [form] = Form.useForm();

  useEffect(()=>{
    setIsLogin(initialState.result)
  },[initialState])
  useEffect(()=>{
  },[isVisible])
  const news = ()=>{
    setDot(true);
  };

  const onClickLogin = ()=>{
    if(!isLogin){
      setIsRegister(false);
      setIsVisible(true);
    }
  };

  const onSubmit = async (values: any) => {
    const res = await toLogin(values)
    if(res.data.result){
      if (values.remember){
        localStorage.setItem('Ring',JSON.stringify(res.data))
      }else {
        sessionStorage.setItem("Ring",JSON.stringify(res.data))
      }
      setIsVisible(false);//还是写一下吧
      //当我刷新之后refresh();整个modal都不存在了 visible就无所谓啦
      refresh();
      message.success(res.data.message)
    }else {
      message.error(res.data.message)
    }
  }



  return(<>
      <div onClick={onClickLogin} style={{cursor: 'pointer'}}>
        <Badge dot={dot} >
          {
            isLogin  ? (
              <Avatar size="large" style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
            ) : (
              <Avatar  size="large" icon={<UserOutlined />} />
            )
          }
        </Badge>
      </div>
      {
        isLogin ? null : (
          <Modal visible={isVisible}
                 onCancel={()=>setIsVisible(false)}
                 footer={null}
                 destroyOnClose={true}
          >
            <Card  bordered={false} style={{paddingTop:20}}>
              <Form
                form={form}
                // name="basic"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 17 }}
                initialValues={{ remember: true }}
                autoComplete="off"
                onFinish={onSubmit}
              >
                <Form.Item
                  label="账号"
                  name="uid"
                  rules={[{ required: true, message: '请输入账号！' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="密码"
                  name="password"
                  rules={[{ required: true, message: '请输入密码！' }]}
                >
                  <Input.Password />
                </Form.Item>
                {
                  isRegister ? (
                    <Form.Item
                      label="确认密码"
                      name="okpwd"
                      rules={[{ required: true, message: '请确认你的密码!' }]}
                    >
                      <Input.Password />
                    </Form.Item>
                  ) : (
                    <Form.Item name="remember"
                               valuePropName="checked"
                               wrapperCol={{ offset: 5, span: 17 }}>
                      <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                  )
                }

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary"
                          style={{width:150,marginRight:10}}
                          ghost={isRegister}
                          htmlType="submit"
                  >
                    {isRegister ? '注册' : '登录'}
                  </Button>
                  <Button type="link"
                          onClick={()=>setIsRegister(!isRegister)}>
                    {isRegister ? '返回登录' : '注册'}
                  </Button>
                </Form.Item>
              </Form>
            </Card>

          </Modal>
        )
      }
    </>)
}
