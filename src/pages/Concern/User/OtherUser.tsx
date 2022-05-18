import {
  Avatar,
  Button,
  Card,
  Col,
  Descriptions,
  List,
  message,
  Row,
  Skeleton,
} from 'antd';
import { Link } from 'umi';
import NotLogin from '@/pages/Layout/Empty/NotLogin';
import React, { useEffect, useState } from 'react';
import { TypeImageInfo, TypeUser } from '@/types/types';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { GET_UserInfo } from '@/services/UserRequest';
import {
  GET_ImageLikeHistory,
  GET_ImageLikeHistory_Limit,
} from '@/services/ImageLikeRequest';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import UserInfo from '@/pages/User/UserInfo/compoment/UserInfo';
import UserPassword from '@/pages/User/UserInfo/compoment/UserPassword';
import { useModel } from '@@/plugin-model/useModel';
import {
  DEL_Concern,
  IS_Concern,
  New_Concern,
} from '@/services/ConcernRequest';

export default () => {
  const { initialState } = useModel('@@initialState');
  const routeParams = useParams();
  //@ts-ignore
  const uid = routeParams.uid; // 获取ruleId

  const [imageList, setImageList] = useState<any[]>();
  const [isConcern, setIsConcern] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<TypeUser>();

  useEffect(() => {
    if (uid) {
      GET_UserInfo(uid).then((res) => {
        console.log('GET_UserInfo', res.data.data);
        setUserInfo(res.data.data);
      });
      GET_ImageLikeHistory_Limit({ uid: uid, begin: 0, rows: 10 })
        .then((res) => {
          console.log(res);
          setImageList(res.data.data);
          // setPreviewImage(res.data.data[0]);
          console.log(res.data.data, res.data.data[0]);
        })
        .catch((err) => console.log(err));
      IS_Concern({ uid: initialState.data.uid, uuid: uid }).then((res) => {
        if (res.data.result && res.data.data) {
          setIsConcern(true);
        }
      });
    }
  }, [uid]);
  const handleConcern = async () => {
    if (isConcern) {
      const res = await DEL_Concern({ uid: initialState.data.uid, uuid: uid });
      if (res.data.result) {
        setIsConcern(false);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } else {
      const res = await New_Concern({ uid: initialState.data.uid, uuid: uid });
      if (res.data.result) {
        setIsConcern(true);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    }
  };

  return (
    <div>
      {uid && userInfo ? (
        <div>
          <Row>
            <Col span={2}></Col>
            <Col span={6}>
              <Card
                title={'用户主页：' + userInfo.name}
                extra={
                  <Button
                    type={isConcern ? 'text' : 'primary'}
                    onClick={() => handleConcern()}
                  >
                    {isConcern ? '已关注' : '关注'}
                  </Button>
                }
              >
                <Avatar
                  style={{ width: 'fit-content' }}
                  size={128}
                  src={'http://localhost:8088/image/' + userInfo?.head}
                />
                <Descriptions
                  title=" "
                  labelStyle={{
                    width: 60,
                    fontWeight: 'bold',
                  }}
                  contentStyle={
                    {
                      // width: '35%',
                    }
                  }
                  column={1}
                >
                  <Descriptions.Item label="昵称">
                    {userInfo.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="账号">
                    {userInfo.uid}
                  </Descriptions.Item>
                  <Descriptions.Item label="性别">
                    {userInfo.gender}
                  </Descriptions.Item>
                  <Descriptions.Item label="邮箱">
                    {userInfo.email}
                  </Descriptions.Item>
                  <Descriptions.Item label="简介">
                    {userInfo.introduction}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
            <Col span={1}></Col>
            <Col span={12}>
              <List
                itemLayout="vertical"
                size="large"
                pagination={{
                  onChange: (page) => {
                    console.log(page);
                  },
                  pageSize: 3,
                }}
                dataSource={imageList}
                footer={<div>{/*<b>ant design</b> footer part*/}</div>}
                renderItem={(item) => (
                  <List.Item
                    key={item.title}
                    actions={
                      [
                        // <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                        // <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                        // <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                      ]
                    }
                    extra={
                      <img
                        width={300}
                        alt="logo"
                        src={'http://localhost:8088/image/' + item.image.href}
                      />
                    }
                  >
                    <List.Item.Meta
                      avatar={
                        <Link
                          to={
                            item.user.uid != initialState.data.uid
                              ? '/concern/other/' + item.user.uid
                              : '/user/info'
                          }
                        >
                          <Avatar
                            size={'large'}
                            src={
                              'http://localhost:8088/image/' + item.user.head
                            }
                          />
                        </Link>
                      }
                      title={
                        <Link
                          to={
                            item.user.uid != initialState.data.uid
                              ? '/concern/other/' + item.user.uid
                              : '/user/info'
                          }
                        >
                          {item.user.name}
                        </Link>
                      }
                      description={item.user.introduction}
                    />
                    {/*{item.content}*/}
                  </List.Item>
                )}
              />
            </Col>
            <Col span={1}></Col>
          </Row>
        </div>
      ) : (
        <NotLogin />
      )}
    </div>
  );
};
