import {
  Button,
  Col,
  Descriptions,
  Divider,
  Empty,
  Form,
  Input,
  Row,
} from 'antd';
import { useModel } from '@@/plugin-model/useModel';
import NotLogin from '@/pages/Layout/Empty/NotLogin';
import UserImage from '@/pages/User/UserInfo/compoment/UserImage';
import UserTags from '@/pages/User/UserInfo/compoment/UserTags';
import { useState } from 'react';
import UserPassword from '@/pages/User/UserInfo/compoment/UserPassword';
import styles from './index.less';
import UserInput from '@/pages/User/UserInfo/compoment/UserInput';
import UserInfo from '@/pages/User/UserInfo/compoment/UserInfo';

export default () => {
  const { initialState } = useModel('@@initialState');
  const [form] = Form.useForm();
  const [isEdit, setIsEdit] = useState(false);
  const onEdit = () => {
    setIsEdit(true);
    console.log('userindex', initialState);
  };

  return (
    <>
      {initialState && initialState.result ? (
        <Row style={{ height: '100%' }}>
          <Col span={7}></Col>

          {/*<Col span={1} style={{ textAlign: 'center' }}>*/}
          {/*  <Divider style={{ height: '100%' }} type="vertical" />*/}
          {/*</Col>*/}
          <Col span={10}>
            <Row>
              <Col span={8}>
                <UserImage />
              </Col>
              <Col span={16}>
                <UserTags />
              </Col>
            </Row>

            <Form
              className={styles.fromBottom}
              form={form}
              autoComplete="off"
              initialValues={initialState.data}
            >
              <Descriptions
                title="用户信息"
                bordered
                labelStyle={{
                  width: '15%',
                }}
                contentStyle={{
                  width: '35%',
                }}
                column={{ xxl: 2, xl: 2, lg: 1, md: 1, sm: 1, xs: 1 }}
                extra={
                  <div>
                    <UserInfo />
                    <UserPassword />
                  </div>
                }
              >
                <Descriptions.Item label="昵称">
                  {initialState.data.name}
                </Descriptions.Item>
                <Descriptions.Item label="账号">
                  {initialState.data.uid}
                </Descriptions.Item>
                <Descriptions.Item label="角色类型">
                  {initialState.data.role == 'admin' ? '管理员' : '用户'}
                </Descriptions.Item>
                <Descriptions.Item label="性别">
                  {initialState.data.gender}
                </Descriptions.Item>
                <Descriptions.Item label="邮箱" span={2}>
                  {initialState.data.email}
                </Descriptions.Item>
                <Descriptions.Item label="简介" span={2}>
                  {initialState.data.introduction}
                </Descriptions.Item>
              </Descriptions>
            </Form>
          </Col>
          <Col span={7}></Col>
        </Row>
      ) : (
        <NotLogin />
      )}
    </>
  );
};
