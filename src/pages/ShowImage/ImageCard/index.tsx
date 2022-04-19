import {Avatar, Card, Image, message} from "antd";
import Icon,{
  BarsOutlined,
  DislikeOutlined,
  EditOutlined,
  EllipsisOutlined,
  HeartOutlined,
  SettingOutlined
} from "@ant-design/icons";
import {Meta} from "antd/es/list/Item";
import {TypeImageInfo, TypeRes} from "@/types/types";
import {useEffect, useState} from "react";
import InfoDrawer from "@/pages/ShowImage/ImageCard/InfoDrawer";
import HeartIcon from "@/pages/Layout/Icon/HeartIcon";
import {NEW_LIKE_DISLIKE, NOT_LIKE_DISLIKE} from "@/services/RecordRequest";
import {useModel} from "@@/plugin-model/useModel";
interface Prop{
  imageInfo: TypeImageInfo;
}

export default (props: Prop)=>{
  const { initialState,} = useModel("@@initialState");
  let uid = '';
  if(initialState && initialState.data)
    uid = initialState.data.uid

  const {imageInfo} = props;
  const {image,user,tags,record} = props.imageInfo
  const [isLike,setIsLike] = useState<boolean>(false);
  const [imgInfo,setImgInfo] = useState(image);
  const [recordInfo,setRecoedInfo] = useState(record);
  useEffect(()=>{
    if(record && record.type == "like"){
      setIsLike(true);
    }
  },[record])


  const onLikeIt = async ()=>{
    const like = {
      hid: image.hid,
      uid: uid,
      type: "like",//trail
    }

    if(isLike){//该变成不喜欢了
      const res = await NOT_LIKE_DISLIKE(like);
      console.log('res',res)
      if(res.data.result){
        setImgInfo(res.data.data.image);
        setRecoedInfo(res.data.data.record);
        setIsLike(false);
      }else {
        message.error(res.data.message);
      }


    }else {//该变成喜欢了
      // console.log("onLike:  false => like")
      const res = await NEW_LIKE_DISLIKE(like)
      console.log('res',res)
      if(res.data.result){
        setImgInfo(res.data.data.image);
        setRecoedInfo(res.data.data.record);
        setIsLike(true);
      }else {
        message.error(res.data.message);
      }
    }

  }



  const getNumByImage = (width: number,height: number)=>{
    if(width/height > 3/4){
      return 3;
    }else if(height/width > 3/4){
      return 6;
    }else {
      return 4;
    }
  }


  return(
    <div>
      <Card
        hoverable
        bordered={false}
        style={{
          // height: `${100 * getNumByImage(image.width,image.height)}px`,
          // overflow: 'hidden'
        }}
        actions={[
          <InfoDrawer imageInfo={{image:imgInfo,user,tags,record}} />,
          <span onClick={onLikeIt}>
            {
              isLike ? (
                <HeartIcon
                  // style={{color: `${ isLike ? "red" : 'black'}`,
                  style={{color: "red", fontSize: '16px' }}/>
              ) : (
                <HeartOutlined />)
            }
          </span>
          ,
          <EllipsisOutlined key="ellipsis" />,
          // <DislikeOutlined />,
        ]}
      >
        <Image
          // width={'100%'}
          style={{maxHeight:500,
            // maxWidth:`${image.width * 300 / image.height}px`
          }}
          // height={`${100 * (getNumByImage(image.width,image.height) -1)}`}
          src={"http://localhost:8088/image/" + image.href}
        />
      </Card>
    </div>

  )
}
