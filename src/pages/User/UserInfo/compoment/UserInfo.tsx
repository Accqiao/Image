import { Button, Col, Form, Input, message, Modal, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { UPDATE_Password } from '@/services/Login';
import { useModel } from '@@/plugin-model/useModel';
import { UPDATE_UserInfo } from '@/services/UserRequest';

export default () => {
  const { initialState, refresh } = useModel('@@initialState');
  const userInfo = initialState.data;
  const [form] = Form.useForm();
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setLoading(false);
      form.resetFields();
      form.setFieldsValue({
        name: userInfo.name,
        gender: userInfo.gender,
        email: userInfo.email,
        introduction: userInfo.introduction,
      });
    }
  }, [isVisible]);

  const onShow = () => setIsVisible(true);
  const onCancel = () => setIsVisible(false);
  //
  // const onSubmit = async (values: any) => {
  //   setLoading(true);
  //   values.uid = initialState.data.uid;
  //   const res = await UPDATE_Password(values);
  //   if (res.data.result) {
  //     setIsVisible(false);
  //     message.success(res.data.message);
  //   } else {
  //     message.error(res.data.message);
  //   }
  //   setLoading(false);
  //   form.resetFields();
  // };

  const onUpdate = async (values: any) => {
    setLoading(true);
    values.uid = userInfo.uid;
    const res = await UPDATE_UserInfo(values);
    if (res.data && res.data.result) {
      refresh();
      message.success('更新成功!');
      setIsVisible(false);
    } else {
      message.error('操作失败！请稍后再试。');
    }
    setLoading(false);
  };

  return (
    <>
      <Button type="link" onClick={onShow}>
        修改信息
      </Button>

      <Modal
        onCancel={onCancel}
        destroyOnClose={true}
        visible={isVisible}
        confirmLoading={isVisible && loading}
        title="修改密码"
        width={500}
        onOk={() => {
          form
            .validateFields()
            .then(onUpdate)
            .catch((info) => {
              console.log('form Failed:', info);
            });
        }}
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
            <Col span={12}>
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
            <Col span={12}></Col>
          </Row>
          <Form.Item label="邮箱" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="简介" name="introduction">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
