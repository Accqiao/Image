import {Col, Row, Skeleton, Tabs} from "antd";
import {useEffect, useState} from "react";
import {getImageByRandom} from "@/services/ImageRequest";
import {TypeImageInfo, TypeRes} from "@/types/types";
import RandomImage from "./RandomImage"
import {useModel} from "@@/plugin-model/useModel";

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
