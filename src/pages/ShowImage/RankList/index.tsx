import { Tabs } from 'antd';
import RankByScore from './RankByScore/index';
import RankByTrail from './RankByTrail/index';
import RankByLike from './RankByLike/index';

export default () => {
  function callback(key: string) {
    console.log(key);
  }

  return (
    <div>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <Tabs.TabPane tab="综合" key="1">
          <RankByScore />
        </Tabs.TabPane>
        <Tabs.TabPane tab="浏览量排名" key="2">
          <RankByTrail />
        </Tabs.TabPane>
        <Tabs.TabPane tab="收藏量排名" key="3">
          <RankByLike />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};
