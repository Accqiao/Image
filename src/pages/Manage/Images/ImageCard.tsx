import {
  Avatar,
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Spin,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { TypeImage, TypeTag, TypeUser } from '@/types/types';
import { useModel } from '@@/plugin-model/useModel';
import {
  CHANGE_ImageTags,
  GET_ImageInfo,
  UPDATE_Image,
} from '@/services/ManageImageRequest';

interface Prop {
  image: TypeImage;
  handleRefresh: () => void;
}
export default (props: Prop) => {
  const { handleRefresh } = props;
  const [image, setImage] = useState<TypeImage>(props.image);
  const [user, setUser] = useState<TypeUser>();
  const [tags, setTags] = useState<TypeTag[]>([]);
  const [allTags, setAllTags] = useState<TypeTag[]>([]);
  const [oldTags, setOldTags] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  //为什么会有visible，解释请见onCancel()函数
  const [visible, setVisible] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [titleForm] = Form.useForm();

  useEffect(() => {
    //为什么会有这个监听，解释请见onCancel()函数
    if (!visible) {
      setIsVisible(false);
    }
  }, [visible]);

  const onCancel = () => {
    //为什么我不用setIsVisible(false)?
    //应为这玩意无效，天杀的为什么没反应，跟modal无关，就是setIsVisible(false)无法设置，
    //但是换一个就行，曲线救国，md；离谱，离大谱，
    setVisible(false);
  };
  const onShow = () => setIsVisible(true);

  useEffect(() => {
    setImage(props.image);
  }, [props.image]);
  useEffect(() => {
    if (isVisible) {
      setVisible(true);
      GET_ImageInfo({ hid: image.hid, uid: image.uid }).then((res) => {
        console.log(res);
        setTags(res.data.tags);
        setOldTags(res.data.tags.map((tag: TypeTag) => tag.tag));
        setUser(res.data.user);
        setAllTags(res.data.alltags);
        console.log('user', res.data.user);
        console.log('tags', res.data.tags);
        console.log('tags', res.data.alltags);
      });
    } else {
      handleRefresh();
    }
    console.log('isVisible', isVisible, image.href);
  }, [isVisible]);
  useEffect(() => {
    if (user && tags.length > 0) {
      titleForm.resetFields();
      titleForm.setFieldsValue({
        title: image.title,
        description: image.description,
      });
    }
  }, [user, tags]);
  const onSubmitTitle = async () => {
    const values = await titleForm.validateFields();
    values.hid = image.hid;
    const res = await UPDATE_Image(values);
    if (res.data && res.data.result) {
      setIsVisible(false);
      handleRefresh();
      message.success('操作完成！');
    } else {
      message.error('操作失败！');
    }
  };
  const onChangeTag = async (values: string[]) => {
    // setLoading(true);
    if (values.length == 0) {
      message.warn('至少保留一个标签！');
      return;
    }

    let type = 'add';
    let select = '';

    if (values.length > oldTags.length) {
      select = values[values.length - 1];
    } else {
      type = 'sub';
      select = values
        .concat(oldTags)
        .filter(
          (tag, index, arr) => arr.lastIndexOf(tag) == arr.indexOf(tag),
        )[0];
    }
    const res = await CHANGE_ImageTags({
      type: type,
      hid: image.hid,
      tag: select,
    });
    if (res.data && res.data.result) {
      setOldTags(values);
      message.success('操作成功！');
    } else {
      message.error('操作失败！');
    }
    // setLoading(false);
  };

  return (
    <div onClick={onShow} style={{ cursor: 'pointer' }}>
      <Avatar
        size={64}
        shape="square"
        src={'http://localhost:8088/image/' + image.href}
      />
      {user ? (
        <Modal
          visible={isVisible}
          title={'上传用户：' + user.name + '(' + user.uid + ')'}
          width={image.type == 'Phone' ? 600 : 850}
          footer={null}
          onCancel={onCancel}
        >
          <Row>
            <Col style={{ overflow: 'hidden' }}>
              <img
                alt="example"
                style={{
                  maxWidth: 500,
                  maxHeight: 450,
                }}
                src={'http://localhost:8088/image/' + image.href}
              />
            </Col>
            <Col>
              <Spin spinning={loading}>
                <Card
                  bordered={false}
                  title={'标题描述'}
                  extra={
                    <Button type={'link'} onClick={onSubmitTitle}>
                      保存修改
                    </Button>
                  }
                  style={{ width: '100%' }}
                >
                  <Form
                    form={titleForm}
                    // onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                  >
                    <Form.Item label="标题" name="title">
                      <Input />
                    </Form.Item>

                    <Form.Item label="描述" name="description">
                      <Input.TextArea />
                    </Form.Item>
                  </Form>
                </Card>
                <Card bordered={false} title={'标签'} style={{ width: '100%' }}>
                  <Select
                    mode="multiple"
                    value={oldTags}
                    style={{ width: '240px' }}
                    onChange={onChangeTag}
                  >
                    {allTags.map((tag) => {
                      return (
                        <Select.Option key={tag.tag} value={tag.tag}>
                          {tag.tag}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Card>
              </Spin>
            </Col>
          </Row>
        </Modal>
      ) : null}
    </div>
  );
};
