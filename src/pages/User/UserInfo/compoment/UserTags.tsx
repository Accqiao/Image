import { Input, message, Select, Tag } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { TweenOneGroup } from 'rc-tween-one';
import { PlusOutlined } from '@ant-design/icons';
import styles from '../index.less';
import {
  DEL_InterestTag,
  GET_InterestByUser,
  NEW_InterestTag,
} from '@/services/IntersetRequest';
import { useModel } from '@@/plugin-model/useModel';
import { GET_AllTags, GET_SelectTagsByLevel } from '@/services/TagsRequset';
import { TypeTag } from '@/types/types';
import { CHANGE_ImageTags } from '@/services/ManageImageRequest';

export default () => {
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [tags, setTags] = useState<any[]>([]);
  const [oldTags, setOldTags] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<TypeTag[]>([]);
  const inputRef = useRef(null);
  const { initialState } = useModel('@@initialState');
  const [loading, setLoading] = useState<boolean>(false);
  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    GET_SelectTagsByLevel('2').then((res) => {
      console.log(res.data.data);
      setAllTags(res.data.data);
    });
    getInterestTag();
  }, []);
  const getInterestTag = () => {
    GET_InterestByUser({ uid: initialState.data.uid }).then((res) => {
      setTags(res.data.data);
      setOldTags(res.data.data.map((tag: any) => tag.tag));
    });
  };

  // useEffect(()=>{
  //   if(inputVisible){
  //     // @ts-ignore
  //     inputRef.current!.focus();
  //   }
  //
  // },[inputVisible])

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }

    console.log(tags);
    // setTags(tags);
    setInputValue('');
    setInputVisible(false);
  };
  const showInput = () => {
    setInputVisible(true);

    // this.setState({ inputVisible: true },
    //   () => this.input.focus());
  };
  const handleClose = async (tagId: string) => {
    if (tags.length == 1) {
      message.warn('至少保留一个标签！');
      return;
    }
    setLoading(true);
    const res = await DEL_InterestTag({ id: tagId });
    if (res.data && res.data.result) {
      message.success('操作完成！');
      getInterestTag();
    } else {
      message.error('操作失败！');
    }
    setLoading(false);
  };
  const onChangeTag = async (values: string[]) => {
    if (values.length == 0) {
      message.warn('至少保留一个标签！');
      return;
    }
    setLoading(true);
    if (values.length > oldTags.length) {
      let tag = values[values.length - 1];
      const res = await NEW_InterestTag({
        uid: initialState.data.uid,
        tag: tag,
      });
      if (res.data && res.data.result) {
        message.success('操作完成！');
        getInterestTag();
      } else {
        message.error('操作失败！');
      }
    } else {
      let select = values
        .concat(oldTags)
        .filter(
          (tag, index, arr) => arr.lastIndexOf(tag) == arr.indexOf(tag),
        )[0];
      const tagId = tags.filter((tag) => tag.tag == select)[0].id;
      handleClose(tagId);
    }
    setLoading(false);
  };

  return (
    <>
      <div style={{ marginTop: 30, marginBottom: 16 }}>
        <TweenOneGroup
          enter={{
            scale: 0.8,
            opacity: 0,
            type: 'from',
            duration: 100,
          }}
          // onEnd={e => {
          //   if (e.type === 'appear' || e.type === 'enter') {
          //     e.target.style = 'display: inline-block';
          //   }
          // }}
          leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
          appear={false}
        >
          {tags.map((tag) => {
            return (
              <span key={tag.id} style={{ display: 'inline-block' }}>
                <Tag
                  closable
                  onClose={(e) => {
                    e.preventDefault();
                    handleClose(tag.id);
                  }}
                >
                  {tag.tag}
                </Tag>
              </span>
            );
          })}
        </TweenOneGroup>
      </div>
      {inputVisible ? (
        <Select
          mode="multiple"
          autoFocus={true}
          defaultOpen={true}
          loading={loading}
          value={oldTags}
          style={{ width: '240px' }}
          onChange={onChangeTag}
          onBlur={() => setInputVisible(false)}
        >
          {allTags.map((tag) => {
            return (
              <Select.Option key={tag.tag} value={tag.tag}>
                {tag.tag}
              </Select.Option>
            );
          })}
        </Select>
      ) : (
        <Tag className={styles.siteTagPlus} onClick={showInput}>
          <PlusOutlined /> New Tag
        </Tag>
      )}
    </>
  );
};
