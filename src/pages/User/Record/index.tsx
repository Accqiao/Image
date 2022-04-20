import { Col, Row, Skeleton, Tabs } from 'antd';
import TrailHistory from './TrailHistory/index';
import NotLogin from '@/pages/Layout/Empty/NotLogin';
import { useModel } from '@@/plugin-model/useModel';
export default () => {
  const { initialState } = useModel('@@initialState');
  function callback(key: string) {
    console.log(key);
  }

  return (
    <>
      {initialState && initialState.result ? (
        <div>
          <Tabs defaultActiveKey="1" onChange={callback}>
            <Tabs.TabPane tab="浏览记录" key="1">
              <TrailHistory />
            </Tabs.TabPane>
          </Tabs>
        </div>
      ) : (
        <NotLogin />
      )}
    </>
  );
};
