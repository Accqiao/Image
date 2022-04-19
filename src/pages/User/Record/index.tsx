import {Col, Row, Skeleton, Tabs} from "antd";
import TrailHistory from './TrailHistory/index'
import LikeHistory from './LikeHistory'
import UploadHistory from './UpLoadHistory'
export default ()=>{

  function callback(key: string) {
    console.log(key);
  }

  return(
    <div>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <Tabs.TabPane tab="浏览记录" key="1">
          <TrailHistory />
        </Tabs.TabPane>
        {/*<Tabs.TabPane tab="收藏记录" key="2">*/}
        {/*  <LikeHistory />*/}
        {/*</Tabs.TabPane>*/}
        {/*<Tabs.TabPane tab="上传记录" key="3">*/}
        {/*  <UploadHistory />*/}
        {/*</Tabs.TabPane>*/}
      </Tabs>
    </div>
  )
}
