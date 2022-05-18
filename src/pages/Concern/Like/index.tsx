import {
  Avatar,
  Skeleton,
  Col,
  Descriptions,
  Image,
  Row,
  Tabs,
  Tag,
  Timeline,
} from 'antd';
import {
  ClockCircleOutlined,
  EyeOutlined,
  FireOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useModel } from '@@/plugin-model/useModel';
import { TypeImageInfo } from '@/types/types';
import { GET_ImageLikeHistory } from '@/services/ImageLikeRequest';
import TrailHistory from '@/pages/User/Record/TrailHistory';
import NotLogin from '@/pages/Layout/Empty/NotLogin';
import InfiniteScroll from 'react-infinite-scroll-component';

export default () => {
  const { initialState } = useModel('@@initialState');
  let uid = '';
  if (initialState && initialState.data) uid = initialState.data.uid;
  const [recordData, setRecordData] = useState<any[]>([]);
  const [previewImage, setPreviewImage] = useState<TypeImageInfo>();
  const [begin, setBegin] = useState<number>(0);
  const [next, setNext] = useState<boolean>(true);

  useEffect(() => {
    if (uid) {
      NextData();
    }
  }, []);
  const onClickImg = (prop: TypeImageInfo) => {
    setPreviewImage(prop);
  };

  const NextData = () => {
    console.log('请求数据！gogo');
    GET_ImageLikeHistory({
      uid,
      begin,
      rows: 8,
    })
      .then((res) => {
        const temp = res.data.data;
        setRecordData([...recordData, ...temp]);
        if (recordData.length == 0) {
          setPreviewImage(res.data.data[0]);
        }
        if (temp.length < 8) {
          setNext(false);
        }
        setBegin(begin + temp.length);
        console.log('请求数据Back:', temp.length);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {initialState && initialState.result ? (
        <div>
          <Row>
            <Col
              span={5}
              style={{
                overflowX: 'hidden',
                overflowY: 'scroll',
                height: 565,
              }}
              id="scrollableDiv"
            >
              <InfiniteScroll
                scrollableTarget="scrollableDiv"
                dataLength={begin} //This is important field to render the next data
                next={NextData}
                hasMore={next} //为false时next不会触发
                loader={
                  <>
                    <Skeleton.Input active={true} size={'small'} block={true} />
                  </>
                }
                endMessage={
                  <p style={{ textAlign: 'center' }}>
                    <b>已经没有更多记录了</b>
                  </p>
                }
                style={{ overflowX: 'hidden' }}
              >
                <Timeline mode={'left'} style={{ paddingTop: 10 }}>
                  {recordData.length > 0 &&
                    recordData.map((re) => {
                      const tempTime =
                        re.record.updatetime.substring(0, 10) +
                        ' ' +
                        re.record.updatetime.substring(11, 16);
                      return (
                        <Timeline.Item
                          key={re.record.uid + re.record.hid}
                          label={
                            <>
                              {tempTime}
                              <Tag style={{ marginLeft: 5 }} color={'blue'}>
                                {re.record.num}
                              </Tag>
                              <p style={{ marginRight: 10 }}>
                                {re.image.title}
                              </p>
                            </>
                          }
                          dot={
                            <ClockCircleOutlined style={{ fontSize: '16px' }} />
                          }
                        >
                          <div
                            onClick={() =>
                              onClickImg({
                                image: re.image,
                                user: re.user,
                                tags: re.tags,
                                record: re.record,
                              })
                            }
                            style={{ cursor: 'pointer' }}
                          >
                            <Avatar
                              shape="square"
                              size={64}
                              src={
                                'http://localhost:8088/image/' + re.image.href
                              }
                            />

                            {/*<InfoDrawer*/}
                            {/*  imageInfo={{image, user, tags, record}}*/}
                            {/*  visible={visible}*/}
                            {/*  onClose={()=>setVisible(false)}*/}
                            {/*/>*/}
                          </div>
                          {/*<ImageLittleCard  imageInfo={{*/}
                          {/*  image: re.image,*/}
                          {/*  user: re.user,*/}
                          {/*  tags: re.tags,*/}
                          {/*  record: re.record*/}
                          {/*}}/>*/}
                        </Timeline.Item>
                      );
                    })}
                </Timeline>
              </InfiniteScroll>
            </Col>
            <Col span={7}>
              <Descriptions
                // labelStyle={{
                //   height:50,
                //   width: 80,
                //   fontWeight: 'bold',
                //   fontSize: 'larger'
                // }}
                style={{ margin: ' 0 10px' }}
                title={' '}
                bordered
              >
                <Descriptions.Item label="标题" span={3}>
                  {previewImage && previewImage.image.title}
                </Descriptions.Item>
                <Descriptions.Item label="描述" span={3}>
                  {previewImage && previewImage.image.description}
                </Descriptions.Item>
                <Descriptions.Item label="浏览">
                  <EyeOutlined style={{ color: 'blue', marginRight: 10 }} />
                  {previewImage && previewImage.image.trailnum}
                </Descriptions.Item>
                <Descriptions.Item>
                  <HeartOutlined style={{ color: 'red', marginRight: 10 }} />
                  {previewImage && previewImage.image.likenum}
                </Descriptions.Item>
                <Descriptions.Item>
                  <FireOutlined style={{ color: 'red', marginRight: 10 }} />
                  {previewImage && previewImage.image.score}
                </Descriptions.Item>

                <Descriptions.Item label="标签们" span={3}>
                  {previewImage &&
                    previewImage.tags.map((tag) => {
                      return (
                        <Tag key={tag.tag} color="blue">
                          {' '}
                          {tag.tag}{' '}
                        </Tag>
                      );
                    })}
                </Descriptions.Item>
                <Descriptions.Item label="上传用户" span={3}>
                  {previewImage && previewImage.user.name}
                </Descriptions.Item>
              </Descriptions>
            </Col>
            <Col
              span={12}
              style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {previewImage ? (
                <div
                  style={{
                    marginTop: previewImage.image.type == 'PC' ? 80 : 0,
                  }}
                >
                  <Image
                    // @ts-ignore
                    // width={'100%'}
                    width={
                      previewImage.image.width >= previewImage.image.height
                        ? '100%'
                        : null
                    }
                    // height={'100%'}
                    style={{
                      maxHeight: 565,
                      // maxWidth:460,
                    }}
                    src={
                      'http://localhost:8088/image/' + previewImage.image.href
                    }
                  />
                </div>
              ) : (
                <Image
                  width={565}
                  height={565}
                  src="error"
                  fallback="data:image/png;base64,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"
                />
              )}
            </Col>
          </Row>
        </div>
      ) : (
        <NotLogin />
      )}
    </>
  );
};
