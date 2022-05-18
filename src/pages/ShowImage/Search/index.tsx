import {
  Affix,
  Button,
  Checkbox,
  Divider,
  message,
  Popconfirm,
  Popover,
  Tabs,
} from 'antd';
import RandomImage from './RandomImage';
import CreateTimeImage from './CreateTimeImage';
import SelectImage from './SelectImage';
import { useEffect, useState } from 'react';
import { GET_AllTags, GET_SelectTagsByLevel } from '@/services/TagsRequset';
import { TypeTag } from '@/types/types';
import CheckboxTags from './ChecKBoxTags';

export default () => {
  const [activeKey, setActiveKey] = useState<string>('random');
  const [top, setTop] = useState(50);
  const [tags, setTags] = useState<TypeTag[]>([]);
  const [values, setValues] = useState<string[]>([]);
  useEffect(() => {
    if (activeKey == 'select' && tags.length == 0) {
      GET_SelectTagsByLevel('2').then((res) => {
        if (res.data.result) {
          setTags(res.data.data);
        } else {
          message.error('系统错误，请稍后再试！');
        }
      });
    }
  }, [activeKey]);

  const onClosePopover = (visible: boolean) => {
    if (!visible) {
      console.log('onClosePopover', values);
    }
  };

  const operations = (
    <Affix offsetTop={top}>
      <Popover
        placement="leftTop"
        trigger="click"
        onVisibleChange={onClosePopover}
        content={<CheckboxTags tagList={tags} setValues={setValues} />}
      >
        <Button type="primary">筛选</Button>
      </Popover>
    </Affix>
  );
  return (
    <div>
      <Tabs
        tabBarExtraContent={activeKey == 'select' ? operations : null}
        // defaultActiveKey="random"
        activeKey={activeKey}
        onChange={setActiveKey}
      >
        <Tabs.TabPane tab="发现" key="random">
          <RandomImage />
        </Tabs.TabPane>
        <Tabs.TabPane tab="最新" key="create">
          <CreateTimeImage />
        </Tabs.TabPane>
        <Tabs.TabPane tab="动漫" key="1">
          <SelectImage type={'动漫'} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="古风" key="2">
          <SelectImage type={'古风'} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="人物" key="3">
          <SelectImage type={'人物'} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="风景" key="4">
          <SelectImage type={'风景'} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="简约" key="5">
          <SelectImage type={'简约'} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="萌宠" key="6">
          <SelectImage type={'萌宠'} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="其他" key="7">
          <SelectImage type={'其他'} />
        </Tabs.TabPane>

        {/*<Tabs.TabPane tab="筛选" key="select">*/}
        {/*  <SelectImage />*/}
        {/*</Tabs.TabPane>*/}
      </Tabs>
    </div>
  );
};
