import {Col, Row, Skeleton, Tabs} from "antd";
import UploadHistory from './UploadHistory'
import UpLoadImage from "@/pages/User/UpLoadImage/UpLoadImage";
export default ()=>{

  function callback(key: string) {
    console.log(key);
  }

  return(
    <div>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <Tabs.TabPane tab="上传" key="1">
          <UpLoadImage />
        </Tabs.TabPane>
        <Tabs.TabPane tab="上传记录" key="2">
          <UploadHistory />
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}
