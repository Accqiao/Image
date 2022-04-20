import { Col, Row, Skeleton, Tabs } from 'antd';
import UploadHistory from './UploadHistory';
import UpLoadImage from '@/pages/User/UpLoadImage/UpLoadImage';
import NotLogin from '@/pages/Layout/Empty/NotLogin';
import { useModel } from '@@/plugin-model/useModel';
import { useState } from 'react';
export default () => {
  const { initialState } = useModel('@@initialState');
  function callback(key: string) {
    console.log(key);
  }
  const [sign, setSign] = useState<boolean>(false);

  return (
    <>
      {initialState && initialState.result ? (
        <div>
          <Tabs defaultActiveKey="1" onChange={callback}>
            <Tabs.TabPane tab="上传" key="1">
              <UpLoadImage changeSign={() => setSign(!sign)} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="上传记录" key="2">
              <UploadHistory sign={sign} />
            </Tabs.TabPane>
          </Tabs>
        </div>
      ) : (
        <NotLogin />
      )}
    </>
  );
};
