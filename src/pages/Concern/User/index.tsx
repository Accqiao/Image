import { useModel } from '@@/plugin-model/useModel';

import NotLogin from '@/pages/Layout/Empty/NotLogin';
import { Avatar, Button, Card, Col, List, message, Row, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  DEL_Concern,
  GET_ConcernAllList,
  GET_ConcernList,
} from '@/services/ConcernRequest';
import { TypeUser } from '@/types/types';
import { Link } from 'umi';

export default () => {
  const { initialState } = useModel('@@initialState');
  const [userList, setUserList] = useState<TypeUser[]>([]);
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  const GET_DATA = () => {
    GET_ConcernAllList({ uid: initialState.data.uid }).then((res) => {
      console.log('GET_ConcernAllList', res.data);
      setUserList(res.data);
      setInitLoading(false);
    });
  };

  useEffect(() => {
    if (initialState && initialState.result) {
      GET_DATA();
    }
  }, [initialState]);

  const handleCancel = async (uuid: string) => {
    const res = await DEL_Concern({ uid: initialState.data.uid, uuid: uuid });
    if (res.data.result) {
      message.success(res.data.message);
      GET_DATA();
    } else {
      message.error(res.data.message);
    }
  };

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        {/*<Button*/}
        {/*  // onClick={onLoadMore}*/}
        {/*>loading more</Button>*/}
      </div>
    ) : null;
  return (
    <>
      {initialState && initialState.result ? (
        <div>
          <Row>
            <Col span={5}></Col>
            <Col span={14}>
              <Card title={'我的关注'} style={{ minHeight: 565 }}>
                <List
                  className="demo-loadmore-list"
                  loading={initLoading}
                  itemLayout="horizontal"
                  loadMore={loadMore}
                  dataSource={userList}
                  renderItem={(item) => (
                    <List.Item
                      actions={[
                        <Button
                          type="primary"
                          onClick={() => handleCancel(item.uid)}
                        >
                          已关注
                        </Button>,
                      ]}
                    >
                      <Skeleton avatar title={false} loading={false} active>
                        <List.Item.Meta
                          avatar={
                            <Link to={'/concern/other/' + item.uid}>
                              <Avatar
                                size={'large'}
                                src={'http://localhost:8088/image/' + item.head}
                              />
                            </Link>
                          }
                          title={
                            <Link to={'/concern/other/' + item.uid}>
                              {item.name}
                            </Link>
                          }
                          description={item.introduction}
                        />
                        {/*<div>content</div>*/}
                      </Skeleton>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
            <Col span={5}></Col>
          </Row>
        </div>
      ) : (
        <NotLogin />
      )}
    </>
  );
};
