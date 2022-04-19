import {Tabs} from "antd";
import RandomImage from "./RandomImage"

export default ()=>{

  function callback(key: string) {
    console.log(key);
  }

  return(
    <div>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <Tabs.TabPane tab="发现" key="1">
          <RandomImage />
        </Tabs.TabPane>
        <Tabs.TabPane tab="推荐" key="2">
          Content of Tab Pane 2
        </Tabs.TabPane>
        <Tabs.TabPane tab="筛选" key="3">
          Content of Tab Pane 3
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}
