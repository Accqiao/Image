import {TypeImageInfo} from "@/types/types";
import {useModel} from "@@/plugin-model/useModel";
import {Avatar} from "antd";
import InfoDrawer from "@/pages/User/Record/InfoDrawer";
import {useState} from "react";

interface Prop{
  imageInfo: TypeImageInfo;
}

export default (props: Prop)=>{
  const { initialState,} = useModel("@@initialState");
  let uid = '';
  if(initialState && initialState.data)
    uid = initialState.data.uid

  const {image,user,tags,record} = props.imageInfo;
  const [visible, setVisible] = useState(false);

  const onClickImg = ()=>{
    setVisible(true);
  }

  return (
    <div
      onClick={onClickImg}
      style={{cursor: 'pointer'}}
    >
      <Avatar
        shape="square"
        size={64} src={"http://localhost:8088/image/"+image.href} />

      <InfoDrawer
        imageInfo={{image, user, tags, record}}
        visible={visible}
        onClose={()=>setVisible(false)}
      />

    </div>
  );

}
