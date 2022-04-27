import { Tabs } from 'antd';
import ImageCarousel from './ImageCarousel';
import ImageRecommend from './ImageRecommend';
export default () => {
  function callback(key: string) {
    console.log(key);
  }

  return (
    <div>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <Tabs.TabPane tab="首页" key="1">
          <ImageCarousel />
        </Tabs.TabPane>
        <Tabs.TabPane tab="推荐" key="2">
          <ImageRecommend />
        </Tabs.TabPane>
        {/*<Tabs.TabPane tab="每日一图" key="3">*/}
        {/*  Content of Tab Pane 3*/}
        {/*</Tabs.TabPane>*/}
      </Tabs>
    </div>
  );
};
