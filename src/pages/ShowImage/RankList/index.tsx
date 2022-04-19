import {Tabs} from "antd";
import RankByScore from "./RankByScore/index";
import RankByTrail from "./RankByTrail/index";


export default ()=>{

  function callback(key: string) {
    console.log(key);
  }

  return(
    <div>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <Tabs.TabPane tab="综合" key="1">
          <RankByScore />
        </Tabs.TabPane>
        <Tabs.TabPane tab="浏览量" key="2">
          <RankByTrail />
        </Tabs.TabPane>
        {/*<Tabs.TabPane tab="筛选" key="3">*/}
        {/*  Content of Tab Pane 3*/}
        {/*</Tabs.TabPane>*/}
      </Tabs>
    </div>
  )
}
