import {Avatar, Card, Image} from "antd";
import {
  BarsOutlined,
  DislikeOutlined,
  EditOutlined,
  EllipsisOutlined,
  HeartOutlined,
  SettingOutlined
} from "@ant-design/icons";
import {Meta} from "antd/es/list/Item";
import {TypeImageInfo, TypeRes} from "@/types/types";
import {useState} from "react";
import InfoDrawer from "@/pages/Search/ImageCard/component/InfoDrawer";
interface Prop{
  imageInfo: TypeImageInfo;
}

export default (props: Prop)=>{
  const {imageInfo} = props;
  const {image,user,tags,record} = props.imageInfo
  const [isLike,setIsLike] = useState(false);

  const onLikeIt = ()=>{
    console.log("onLike",isLike)
    setIsLike(!isLike);
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
          <InfoDrawer imageInfo={imageInfo} />,
          // <HeartTwoTone twoToneColor="#eb2f96" /> style={{color: `${ isLike ? "red" : null}`}}
          <HeartOutlined key="like" onClick={onLikeIt}  twoToneColor={`${ isLike ? "red" : null}`} />,

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
