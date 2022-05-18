import {
  Avatar,
  Badge,
  Button,
  Col,
  Descriptions,
  Drawer,
  Row,
  Tag,
} from 'antd';
import {
  BarsOutlined,
  EyeOutlined,
  FireOutlined,
  HeartOutlined,
  HeartTwoTone,
} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { TypeImage, TypeImageCard, TypeImageInfo } from '@/types/types';
import { ONE_HISTORY } from '@/services/RecordRequest';
import { useModel } from '@@/plugin-model/useModel';
import { GET_OnlyImageInfo } from '@/services/ImageRequest';
import { Link } from 'umi';

interface Prop {
  image: TypeImage;
}

export default (props: Prop) => {
  const { initialState } = useModel('@@initialState');
  const { image } = props;
  const [visible, setVisible] = useState(false);
  const [imageInfo, setImageInfo] = useState<TypeImageCard>({ image: image });

  useEffect(() => {
    if (visible) {
      GET_OnlyImageInfo({ hid: image.hid }).then((res) => {
        setImageInfo(res.data);
      });
    }
  }, [visible]);

  const isPhone = image.type == 'Phone';
  const isPC = image.type == 'PC';

  const onClose = () => {
    setVisible(false);
  };
  const showDrawer = async () => {
    // console.log(image);
    //足迹加1
    ONE_HISTORY({
      hid: image.hid,
      uid: initialState ? initialState.data.uid : '',
    });
    setVisible(true);
  };

  const DescriptionInfo = () => (
    <Descriptions title={' '} bordered column={1}>
      <Descriptions.Item label="标题">
        {imageInfo?.image.title}
      </Descriptions.Item>
      <Descriptions.Item label="描述">
        {imageInfo?.image.description}
      </Descriptions.Item>
      <Descriptions.Item label="浏览量">
        <EyeOutlined style={{ color: 'blue', marginRight: 10 }} />
        {imageInfo?.image.trailnum}
      </Descriptions.Item>
      <Descriptions.Item label="收藏量">
        <HeartOutlined style={{ color: 'red', marginRight: 10 }} />
        {imageInfo?.image.likenum}
      </Descriptions.Item>
      <Descriptions.Item label="流行度">
        <FireOutlined style={{ color: 'red', marginRight: 10 }} />
        {imageInfo?.image.score}
      </Descriptions.Item>
      <Descriptions.Item label="标签们">
        {imageInfo?.tags?.map((tag) => {
          return (
            <Tag key={tag.tag} color="blue">
              {' '}
              {tag.tag}{' '}
            </Tag>
          );
        })}
      </Descriptions.Item>
      <Descriptions.Item label="上传用户">
        <Link
          to={
            imageInfo?.user?.uid != initialState.data.uid
              ? '/concern/other/' + imageInfo?.user?.uid
              : '/user/info'
          }
        >
          <Avatar
            size={'large'}
            src={'http://localhost:8088/image/' + imageInfo?.user?.head}
          />
          {imageInfo?.user?.name}
        </Link>
      </Descriptions.Item>
    </Descriptions>
  );
  const DescriptionInfoToPC = () => (
    <Descriptions title={' '} bordered>
      <Descriptions.Item label="标题" span={3}>
        {imageInfo?.image.title}
      </Descriptions.Item>
      <Descriptions.Item label="描述" span={3}>
        {imageInfo?.image.description}
      </Descriptions.Item>
      <Descriptions.Item label="浏览">
        <EyeOutlined style={{ color: 'blue', marginRight: 10 }} />
        {imageInfo?.image.trailnum}
      </Descriptions.Item>
      <Descriptions.Item>
        <HeartOutlined style={{ color: 'red', marginRight: 10 }} />
        {imageInfo?.image.likenum}
      </Descriptions.Item>
      <Descriptions.Item>
        <FireOutlined style={{ color: 'red', marginRight: 10 }} />
        {imageInfo?.image.score}
      </Descriptions.Item>
      {imageInfo.tags && (
        <Descriptions.Item label="标签们" span={3}>
          {imageInfo.tags.map((tag) => {
            return (
              <Tag key={tag.tag} color="blue">
                {' '}
                {tag.tag}{' '}
              </Tag>
            );
          })}
        </Descriptions.Item>
      )}
      {imageInfo.user && (
        <Descriptions.Item label="上传用户" span={3}>
          <Link
            to={
              imageInfo.user.uid != initialState.data.uid
                ? '/concern/other/' + imageInfo.user.uid
                : '/user/info'
            }
          >
            <Avatar
              size={'large'}
              src={'http://localhost:8088/image/' + imageInfo.user.head}
            />
            {imageInfo.user.name}
          </Link>
        </Descriptions.Item>
      )}
    </Descriptions>
  );

  return (
    <div>
      <BarsOutlined onClick={showDrawer} />
      {imageInfo && (
        <Drawer
          title={image.title}
          placement="right"
          width={`${isPhone ? '50%' : '35%'}`}
          onClose={onClose}
          visible={visible}
        >
          {isPhone ? (
            <Row>
              <Col span={11}>
                <img
                  width={'100%'}
                  style={{ maxHeight: 635 }}
                  src={'http://localhost:8088/image/' + image.href}
                />
              </Col>
              <Col span={1}></Col>
              <Col span={12}>
                <DescriptionInfo />
              </Col>
            </Row>
          ) : (
            <div>
              <div
                style={{
                  height: '100%',
                  display: 'flex',
                  // alignItems:'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  width={`${isPC ? '100%' : ''}`}
                  style={{
                    maxHeight: 300,
                    maxWidth: `${(image.width * 300) / image.height}px`,
                  }}
                  src={'http://localhost:8088/image/' + image.href}
                />
              </div>
              <div>
                <DescriptionInfoToPC />
              </div>
            </div>
          )}
        </Drawer>
      )}
    </div>
  );
};
