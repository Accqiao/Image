import './index.less';
import { Layout, Menu, Breadcrumb, Card, Row, Col } from 'antd';
import {
  CrownOutlined,
  HomeOutlined,
  PictureOutlined,
  SearchOutlined,
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
import { useModel } from '@@/plugin-model/useModel';

export default function IndexPage(prpos: any) {
  const { initialState } = useModel('@@initialState');
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <div className="logo" />
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <Row>
            <Col span={20}>
              <Menu
                // theme="dark"
                defaultSelectedKeys={['1']}
                mode="horizontal"
              >
                <Menu.Item key="search" icon={<SearchOutlined />}>
                  <Link to="/search">发现</Link>
                </Menu.Item>
                <Menu.Item key="rank" icon={<CrownOutlined />}>
                  <Link to="/rank">排行榜</Link>
                </Menu.Item>
                <Menu.Item key="home" icon={<TagOutlined />}>
                  <Link to="/recommend">推荐</Link>
                </Menu.Item>
                <Menu.Item key="upload" icon={<PictureOutlined />}>
                  <Link to="/user/upload">图片上传</Link>
                </Menu.Item>
                <SubMenu key="look" icon={<SmileOutlined />} title="关注">
                  <Menu.Item key="users" icon={<UsergroupAddOutlined />}>
                    <Link to="/concern/user">我的订阅</Link>
                  </Menu.Item>
                  <Menu.Item key="collect" icon={<StarOutlined />}>
                    <Link to="/concern/like">我的收藏</Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu key="user" icon={<HomeOutlined />} title="个人中心">
                  <Menu.Item key="record" icon={<SoundOutlined />}>
                    <Link to="/user/record">足迹</Link>
                  </Menu.Item>
                  <Menu.Item key="info" icon={<UserOutlined />}>
                    <Link to="/user/info">个人中心</Link>
                  </Menu.Item>
                </SubMenu>

                {/*{initialState && initialState.data.role === 'admin' ? (*/}
                {/*  <SubMenu key="manage" icon={<HomeOutlined />} title="管理中心">*/}
                {/*    <Menu.Item key="manage-image" icon={<PictureOutlined />}>*/}
                {/*      <Link to="/manage/image">图片管理</Link>*/}
                {/*    </Menu.Item>*/}
                {/*    <Menu.Item key="manage-user" icon={<SoundOutlined />}>*/}
                {/*      <Link to="/manage/user">用户管理</Link>*/}
                {/*    </Menu.Item>*/}
                {/*  </SubMenu>*/}
                {/*) : null}*/}
              </Menu>
            </Col>
            <Col span={3}>
              <div style={{ float: 'right', padding: '0 15px' }}>
                <UserLogin />
              </div>
            </Col>
            <Col span={1}></Col>
          </Row>
        </Header>
        <Content
          style={{
            margin: '0 16px',
            overflow: 'hidden',
            minHeight: 630,
          }}
        >
          <Breadcrumb style={{ margin: '16px 0' }} />
          {/*</Breadcrumb>*/}
          <div
            className="site-layout-background"
            style={{ padding: 24, height: '100%', minHeight: 600 }}
          >
            {prpos.children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
            height: 24,
            padding: 0,
          }}
        >
          Image Website by Accqiao on 2022
        </Footer>
      </Layout>
    </Layout>
  );
}

// import Layout from './Layout/layout'
// export default function IndexPage() {
//   return (<Layout />);
// }
