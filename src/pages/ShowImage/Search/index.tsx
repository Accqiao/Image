import { Tabs } from 'antd';
import RandomImage from './RandomImage';
import CreateTimeImage from './CreateTimeImage';
export default () => {
  function callback(key: string) {
    console.log(key);
  }

  return (
    <div>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <Tabs.TabPane tab="发现" key="1">
          <RandomImage />
        </Tabs.TabPane>
        <Tabs.TabPane tab="最新" key="2">
          <CreateTimeImage />
        </Tabs.TabPane>
        <Tabs.TabPane tab="筛选" key="3">
          Content of Tab Pane 3
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};
