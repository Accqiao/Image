import {
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Dropdown,
  Form,
  Input,
  Menu,
  message,
  Modal,
} from 'antd';
import React, { useEffect, useState } from 'react';
import {
  HomeOutlined,
  ImportOutlined,
  PictureOutlined,
  SoundOutlined,
  StarOutlined,
  TagOutlined,
  UserDeleteOutlined,
  UserOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import { ToLogin } from '@/services/Login';
import { useModel } from '@@/plugin-model/useModel';
import { GET_UserInfo } from '@/services/UserRequest';
import { Link } from 'umi';

export default () => {
  const { initialState, refresh } = useModel('@@initialState');

  const [dot, setDot] = useState(false);
  const [showManage, setShowManage] = useState(true);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialState) setIsLogin(initialState.result);
  }, [initialState]);

  const onClick = (keyObj: { key: string }) => {
    if (keyObj.key == 'exit') {
      localStorage.removeItem('Ring');
      sessionStorage.removeItem('Ring');
      setIsLogin(false);
      refresh();
    }
  };

  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="home" icon={<TagOutlined />}>
        <Link to="/home">首页推荐</Link>
      </Menu.Item>
      <Menu.Item key="collect" icon={<StarOutlined />}>
        <Link to="/concern/like">我的收藏</Link>
      </Menu.Item>
      <Menu.Item key="user" icon={<UserOutlined />}>
        <Link to="/user/info">个人中心</Link>
      </Menu.Item>
      {initialState && initialState.data.role === 'admin' ? (
        <>
          {showManage ? (
            <Menu.Item
              key="manage"
              icon={<WalletOutlined />}
              onClick={() => {
                setShowManage(false);
                // message.info("点击后台管理--set false")
              }}
            >
              <Link to="/manage">后台管理</Link>
            </Menu.Item>
          ) : (
            <Menu.Item
              key="/search"
              icon={<WalletOutlined />}
              onClick={() => {
                setShowManage(true);
                // message.info("点击用户界面--set true")
              }}
            >
              <Link to="/search">用户界面</Link>
            </Menu.Item>
          )}
        </>
      ) : null}
      <Menu.Item key="exit" icon={<ImportOutlined />}>
        退出
      </Menu.Item>
    </Menu>
  );

  const onClickLogin = () => {
    if (isLogin) {
    } else {
      setIsRegister(false);
      setIsVisible(true);
    }
  };

  const onSubmit = async (values: any) => {
    const res = await ToLogin(values);
    if (res.data.result) {
      //请求成功，但true
      if (values.remember) {
        // localStorage.setItem('Ring',JSON.stringify(res.data))
        localStorage.setItem('Ring', res.data.data.uid);
      } else {
        // sessionStorage.setItem("Ring",JSON.stringify(res.data))
        sessionStorage.setItem('Ring', res.data.data.uid);
      }
      //当我刷新之后refresh();整个modal都不存在了 visible就无所谓啦
      setIsVisible(false); //还是写一下吧
      refresh();
      message.success(res.data.message);
    } else {
      //请求成功，但false
      message.error(res.data.message);
    }
  };

  return (
    <>
      <div onClick={onClickLogin} style={{ cursor: 'pointer' }}>
        <Badge dot={dot}>
          {isLogin ? (
            <Dropdown overlay={menu} placement="bottom">
              {/*<a className="ant-dropdown-link" onClick={e => e.preventDefault()}>*/}
              {/*  Hover me, Click menu item*/}
              {/*</a>*/}
              <Avatar
                size="large"
                src={'http://localhost:8088/image/' + initialState.data.head}
              />
            </Dropdown>
          ) : (
            // <Avatar
            //   size="large"
            //   src={"http://localhost:8088/image/"+ initialState.data.head}/>
            <Avatar size="large" icon={<UserOutlined />} />
          )}
        </Badge>
      </div>
      {
        //登录/未登录状态切换
        isLogin ? null : (
          <Modal
            visible={isVisible}
            onCancel={() => setIsVisible(false)}
            footer={null}
            destroyOnClose={true}
          >
            <Card bordered={false} style={{ paddingTop: 20 }}>
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
                {isRegister ? (
                  <Form.Item
                    label="确认密码"
                    name="okpwd"
                    rules={[{ required: true, message: '请确认你的密码!' }]}
                  >
                    <Input.Password />
                  </Form.Item>
                ) : (
                  <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{ offset: 5, span: 17 }}
                  >
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>
                )}

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button
                    type="primary"
                    style={{ width: 150, marginRight: 10 }}
                    ghost={isRegister}
                    htmlType="submit"
                  >
                    {isRegister ? '注册' : '登录'}
                  </Button>
                  <Button
                    type="link"
                    onClick={() => setIsRegister(!isRegister)}
                  >
                    {isRegister ? '返回登录' : '注册'}
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Modal>
        )
      }
    </>
  );
};
