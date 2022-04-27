import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useModel } from '@@/plugin-model/useModel';

import moment from 'moment';
import { TypeUser } from '@/types/types';
import { UPDATE_UserInfo } from '@/services/UserRequest';

interface Prop {
  userInfo: TypeUser;
  handleRefresh: () => void;
}
export default (props: Prop) => {
  const { userInfo, handleRefresh } = props;
  const { initialState } = useModel('@@initialState');

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isVisible)
      //防止异常关闭 再打开之后按钮不停的转
      setIsLoading(false);

    form.resetFields();
    form.setFieldsValue({
      name: userInfo.name,
      gender: userInfo.gender,
      role: userInfo.role,
      email: userInfo.email,
      introduction: userInfo.introduction,
    });
  }, [isVisible]);
  const onCancel = () => setIsVisible(false);
  const onShow = () => setIsVisible(true);

  const onUpdate = async (values: any) => {
    setIsLoading(true);
    values.uid = userInfo.uid;
    const res = await UPDATE_UserInfo(values);
    if (res.data && res.data.result) {
      message.success('更新成功!');
      handleRefresh(); //刷新表格
      setIsVisible(false);
    } else {
      message.error('操作失败！请稍后再试。');
    }
    setIsLoading(false);
  };

  const disabledDate = (current: any) => {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  };
  return (
    <div>
      <Button type={'link'} onClick={onShow}>
        信息修改
      </Button>
      <Modal
        title={'子工作项'}
        confirmLoading={isLoading}
        visible={isVisible}
        onOk={() => {
          form
            .validateFields()
            .then(onUpdate)
            .catch((info) => {
              setIsLoading(false);
              message.error('操作异常，请稍后再试！');
              console.log('form Failed:', info);
            });
        }}
        onCancel={onCancel}
      >
        <Form form={form} autoComplete="off">
          <Row>
            <Col span={8}>
              <Form.Item
                label="姓名"
                name="name"
                rules={[{ required: true, message: '不能为空！' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="性别"
                name="gender"
                rules={[{ required: true, message: '不能为空！' }]}
              >
                <Select>
                  <Select.Option value={'男'}>男</Select.Option>
                  <Select.Option value={'女'}>女</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="角色"
                name="role"
                rules={[{ required: true, message: '不能为空！' }]}
              >
                <Select>
                  <Select.Option value={'admin'}>管理员</Select.Option>
                  {initialState.data.uid == userInfo.uid ? null : (
                    <Select.Option value={'user'}>用户</Select.Option>
                  )}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="邮箱" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="简介" name="introduction">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
