import {Badge, Button, Col, Descriptions, Drawer, Row, Tag} from "antd";
import {BarsOutlined, EyeOutlined, HeartTwoTone} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {TypeImageInfo} from "@/types/types";
import {ONE_HISTORY} from "@/services/RecordRequest";
import {useModel} from "@@/plugin-model/useModel";

interface Prop{
  imageInfo: TypeImageInfo;
}

export default (props: Prop)=>{
  const { initialState,} = useModel("@@initialState");
  let uid = '';
  if(initialState && initialState.data)
    uid = initialState.data.uid

  const {image,user,tags,record} = props.imageInfo

  const [visible, setVisible] = useState(false);

  const getNumByImage = (width: number,height: number)=>{
    if(width/height > 3/4){
      return 3;
    }else if(height/width > 3/4){
      return 6;
    }else {
      return 4;
    }
  }
  const isPhone = getNumByImage(image.width,image.height) == 6
  const isPC = getNumByImage(image.width,image.height) == 3

  const showDrawer = async () => {
    const trail = {
      hid: image.hid,
      uid: uid,
    }
    ONE_HISTORY(trail)
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const DescriptionInfo = ()=> (
    <Descriptions title={" "} bordered column={1}>
      <Descriptions.Item label="标题">{image.title}</Descriptions.Item>
      <Descriptions.Item label="描述">{image.description}</Descriptions.Item>
      <Descriptions.Item label="浏览量"><EyeOutlined />{image.trialnum}</Descriptions.Item>
      <Descriptions.Item label="收藏量">
        <HeartTwoTone twoToneColor="red" />{image.likenum}
      </Descriptions.Item>
      <Descriptions.Item label="标签们" >
        {tags.map((tag)=>{
          return (<Tag key={tag.tag} color="blue"> {tag.tag} </Tag>)
        })}
      </Descriptions.Item>
    </Descriptions>
  )


  return(
    <div>
      <BarsOutlined onClick={showDrawer} />
      <Drawer
        title={image.title}
        placement="right"
        width={`${isPhone ? "50%" : "35%"}`}
        onClose={onClose} visible={visible}>
        {
           isPhone ? (
             <Row>
               <Col span={11}>
                 <img width={'100%'}
                      style={{maxHeight:635,
                        // maxWidth:`${image.width * 300 / image.height}px`
                      }}
                      src={"http://localhost:8088/image/" + image.href}
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
                  height:'100%',
                  display:'flex',
                  // alignItems:'center',
                  justifyContent:'center',
                }}>
                <img width={`${isPC ? "100%" : '' }`}
                     style={{maxHeight:300,maxWidth:`${image.width * 300 / image.height}px`}}
                     src={"http://localhost:8088/image/" + image.href}
                />
              </div>
              <div>
                <DescriptionInfo />
              </div>
            </div>

          )
        }
      </Drawer>
    </div>
  )
}
