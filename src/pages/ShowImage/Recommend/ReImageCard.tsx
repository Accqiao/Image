import { Avatar, Card, Image, message, Tag } from 'antd';
import Icon, {
  BarsOutlined,
  DislikeOutlined,
  EditOutlined,
  EllipsisOutlined,
  HeartOutlined,
  SettingOutlined,
} from '@ant-design/icons';

import { TypeImageInfo, TypeImageRecom, TypeRes } from '@/types/types';
import { useEffect, useState } from 'react';
import InfoDrawer from '@/pages/ShowImage/ImageCard/InfoDrawer';
import HeartIcon from '@/pages/Layout/Icon/HeartIcon';
import { NEW_LIKE_DISLIKE, NOT_LIKE_DISLIKE } from '@/services/RecordRequest';
import { useModel } from '@@/plugin-model/useModel';
interface Prop {
  imageInfo: TypeImageRecom;
}
export default (props: Prop) => {
  const { initialState } = useModel('@@initialState');
  const { image, record, type, recommend, belongTag } = props.imageInfo;
  const [isLike, setIsLike] = useState<boolean>(false);
  let remNum = recommend && String(recommend).slice(2, 4);
  if (Number(remNum) < 40) {
    remNum = '100';
  }
  useEffect(() => {
    if (record && record.type == 'like') {
      setIsLike(true);
    }
  }, [record]);
  const onLikeIt = async () => {
    const like = {
      hid: image.hid,
      uid: initialState ? initialState.data.uid : '',
      type: 'like', //trail
    };
    if (isLike) {
      //该变成不喜欢了
      const res = await NOT_LIKE_DISLIKE(like);
      console.log('res', res);
      if (res.data.result) {
        // setImgInfo(res.data.data.image);
        // setRecoedInfo(res.data.data.record);
        setIsLike(false);
      } else {
        message.error(res.data.message);
      }
    } else {
      //该变成喜欢了
      // console.log("onLike:  false => like")
      const res = await NEW_LIKE_DISLIKE(like);
      console.log('res', res);
      if (res.data.result) {
        // setImgInfo(res.data.data.image);
        // setRecoedInfo(res.data.data.record);
        setIsLike(true);
      } else {
        message.error(res.data.message);
      }
    }
  };
  return (
    <div>
      <Card
        hoverable
        bordered={false}
        actions={[
          <InfoDrawer image={image} />,
          <span onClick={onLikeIt}>
            {isLike ? (
              <HeartIcon
                // style={{color: `${ isLike ? "red" : 'black'}`,
                style={{ color: 'red', fontSize: '16px' }}
              />
            ) : (
              <HeartOutlined />
            )}
          </span>,
          <>
            {type == 'random' ? (
              <Tag>随机</Tag>
            ) : (
              <>
                {type == 'tag' ? (
                  <Tag color={'blue'}>{belongTag}</Tag>
                ) : (
                  <Tag color={'orange'}>{remNum + '%'}</Tag>
                )}
              </>
            )}
          </>,
          // <EllipsisOutlined key="ellipsis" />,
          // <DislikeOutlined />,
        ]}
      >
        <Image
          // width={'100%'}
          style={{
            maxHeight: 500,
            // maxWidth:`${image.width * 300 / image.height}px`
          }}
          // height={`${100 * (getNumByImage(image.width,image.height) -1)}`}
          src={'http://localhost:8088/image/' + image.href}
        />
      </Card>
    </div>
  );
};
