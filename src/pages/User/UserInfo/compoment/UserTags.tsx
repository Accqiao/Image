import {Input, Tag} from "antd";
import {useEffect, useRef, useState} from "react";
import { TweenOneGroup } from 'rc-tween-one';
import { PlusOutlined } from '@ant-design/icons';
import styles from '../index.less';


export default () => {
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [tags, setTags] = useState<string[]>(['Tag 1', 'Tag 2', 'Tag 3'],);
  const inputRef = useRef(null);
  const handleInputChange = (e: any) => {
    setInputValue(e.target.value)
  };
  useEffect(()=>{
    if(inputVisible){
      // @ts-ignore
      inputRef.current!.focus();
    }

  },[inputVisible])
  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue])
    }

    console.log(tags);
    // setTags(tags);
    setInputValue('');
    setInputVisible(false)
  };
  const showInput = () => {
    setInputVisible(true);

    // this.setState({ inputVisible: true },
    //   () => this.input.focus());
  };
  const handleClose = (removedTag: string) => {
    const tempTags = tags.filter(tag => tag !== removedTag);
    console.log(tempTags);
    setTags(tempTags)
  };

  return(
    <>
      <div style={{ marginBottom: 16 }}>
        <TweenOneGroup
          enter={{
            scale: 0.8,
            opacity: 0,
            type: 'from',
            duration: 100,
          }}
          onEnd={e => {
            if (e.type === 'appear' || e.type === 'enter') {
              e.target.style = 'display: inline-block';
            }
          }}
          leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
          appear={false}
        >
          {tags.map((tag)=>{
            return (
              <span key={tag} style={{ display: 'inline-block' }}>
                <Tag
                  closable
                  onClose={e => {
                    e.preventDefault();
                    handleClose(tag);
                  }}
                >
                  {tag}
                </Tag>
              </span>
            )
          })}
        </TweenOneGroup>
      </div>
      {inputVisible && (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          style={{ width: 78 }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag className={styles.siteTagPlus} onClick={showInput}>
          <PlusOutlined /> New Tag
        </Tag>
      )}
    </>
  )
}
