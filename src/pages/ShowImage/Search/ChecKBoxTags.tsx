import { Checkbox, Divider, message, Row } from 'antd';
import { useEffect, useState } from 'react';
import { TypeTag } from '@/types/types';

interface Prop {
  tagList: TypeTag[];
  setValues: (list: string[]) => void;
}
export default (props: Prop) => {
  const { tagList, setValues } = props;
  const tagLv0 = ['PC', 'Phone', 'Square'];
  const tagLv1 = [
    '红色',
    '橙色',
    '黄色',
    '绿色',
    '青色',
    '蓝色',
    '紫色',
    '粉色',
    '棕色',
    '黑白',
  ];
  const tagLv2 = tagList.map((tag) => tag.tag);
  const tagAll = [...tagLv0, ...tagLv1, ...tagLv2];

  useEffect(() => {
    setValues(tagAll); //初始化全部
  }, []);

  const [checkedList, setCheckedList] = useState<string[]>(tagAll);

  const [indeterminate, setIndeterminate] = useState<boolean>(false);
  const [checkAll, setCheckAll] = useState<boolean>(true);
  const onChange = (list: any) => {
    setCheckedList(list);
    setValues(list);
    setIndeterminate(!!list.length && list.length < tagAll.length);
    setCheckAll(list.length === tagAll.length);
  };

  const onCheckAllChange = (e: any) => {
    // setCheckedList(e.target.checked ? tagAll : []);
    setCheckedList(tagAll);
    setIndeterminate(false);
    // setCheckAll(e.target.checked);
    setCheckAll(true);
  };

  return (
    <>
      <Checkbox
        onChange={onCheckAllChange}
        indeterminate={indeterminate}
        checked={checkAll}
      >
        全部
      </Checkbox>
      <Divider />
      <Checkbox.Group value={checkedList} onChange={onChange}>
        <Row>
          <Checkbox value={'PC'} key={'PC'}>
            {' '}
            PC{' '}
          </Checkbox>
          <Checkbox value={'Phone'} key={'Phone'}>
            {' '}
            Phone{' '}
          </Checkbox>
          <Checkbox value={'Square'} key={'Square'}>
            {' '}
            Square{' '}
          </Checkbox>
        </Row>
        <Divider />
        <Row>
          <Checkbox value={'红色'} key={'红色'}>
            {' '}
            红色{' '}
          </Checkbox>
          <Checkbox value={'橙色'} key={'橙色'}>
            {' '}
            橙色{' '}
          </Checkbox>
          <Checkbox value={'黄色'} key={'黄色'}>
            {' '}
            黄色{' '}
          </Checkbox>
          <Checkbox value={'绿色'} key={'绿色'}>
            {' '}
            绿色{' '}
          </Checkbox>
          <Checkbox value={'青色'} key={'青色'}>
            {' '}
            青色{' '}
          </Checkbox>
        </Row>
        <Row>
          <Checkbox value={'蓝色'} key={'蓝色'}>
            {' '}
            蓝色{' '}
          </Checkbox>
          <Checkbox value={'紫色'} key={'紫色'}>
            {' '}
            紫色{' '}
          </Checkbox>
          <Checkbox value={'粉色'} key={'粉色'}>
            {' '}
            粉色{' '}
          </Checkbox>
          <Checkbox value={'棕色'} key={'棕色'}>
            {' '}
            棕色{' '}
          </Checkbox>
          <Checkbox value={'黑白'} key={'黑白'}>
            {' '}
            黑白{' '}
          </Checkbox>
        </Row>
        <Divider />
        <Row>
          {tagLv2.map((tag, index) => {
            return (
              <>
                <Checkbox value={tag} key={tag}>
                  {' '}
                  {tag}{' '}
                </Checkbox>
              </>
            );
          })}
        </Row>
      </Checkbox.Group>
      <Divider />
    </>
  );
};
