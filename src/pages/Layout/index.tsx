import './index.less';
import { Layout, Menu, Breadcrumb, Card, Row, Col } from 'antd';
import {
  CrownOutlined,
  DownloadOutlined,
  EyeOutlined,
  FlagOutlined,
  HeartOutlined,
  HomeOutlined,
  MessageOutlined,
  PictureOutlined,
  PoweroffOutlined,
  ReloadOutlined,
  SearchOutlined,
  SettingOutlined,
  SmileOutlined,
  SoundOutlined,
  StarOutlined,
  TagOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Link } from 'umi';
import React, { useState } from 'react';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
import UserLogin from '@/pages/Layout/Login';

export default function IndexPage(prpos: any) {
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        style={
          {
            // width:'fix'
            // overflow: 'auto',
            // height: '100vh',
            // position: 'fixed',
            // left: 0,
            // top: 0,
            // bottom: 0,
          }
        }
      >
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="home" icon={<TagOutlined />}>
            <Link to="/home">首页推荐</Link>
          </Menu.Item>
          <Menu.Item key="rank" icon={<CrownOutlined />}>
            <Link to="/rank">排行榜</Link>
          </Menu.Item>
          <Menu.Item key="search" icon={<SearchOutlined />}>
            <Link to="/search">发现</Link>
          </Menu.Item>

          <SubMenu key="look" icon={<SmileOutlined />} title="关注">
            <Menu.Item key="users" icon={<UsergroupAddOutlined />}>
              <Link to="/concern/user">订阅</Link>
            </Menu.Item>
            <Menu.Item key="collect" icon={<StarOutlined />}>
              <Link to="/concern/like">收藏</Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu key="user" icon={<HomeOutlined />} title="个人中心">
            <Menu.Item key="upload" icon={<PictureOutlined />}>
              <Link to="/user/upload">上传/发布</Link>
            </Menu.Item>
            <Menu.Item key="record" icon={<SoundOutlined />}>
              <Link to="/user/record">动态/足迹/消息</Link>
            </Menu.Item>
            <Menu.Item key="info" icon={<UserOutlined />}>
              <Link to="/user/info">个人信息/偏好密码</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <Row>
            <Col span={20}></Col>
            <Col span={3}>
              <div style={{ float: 'right', padding: '0 15px' }}>
                <UserLogin />
              </div>
            </Col>
            <Col span={1}></Col>
          </Row>
        </Header>
        <Content style={{ margin: '0 16px', overflow: 'hidden' }}>
          <Breadcrumb style={{ margin: '16px 0' }} />
          {/*</Breadcrumb>*/}
          <div
            className="site-layout-background"
            style={{ padding: 24, height: '100%' }}
          >
            {prpos.children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}

// import Layout from './Layout/layout'
// export default function IndexPage() {
//   return (<Layout />);
// }
