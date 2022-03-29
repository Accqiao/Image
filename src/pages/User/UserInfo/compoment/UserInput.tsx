import {useEffect, useRef, useState} from "react";
import {Input, message, Spin} from "antd";
import {useModel} from "@@/plugin-model/useModel";
import {updateUserInfo} from "@/services/UserRequest";
import {CheckOutlined} from "@ant-design/icons";


export default (params: {thekey: string ,value: string})=>{
  const { initialState ,setInitialState } = useModel("@@initialState");
  const {thekey,value} = params;
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState<string>();
  const [inputVisible, setInputVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  //
  // useEffect(()=>{
  //   console.log("initialStateChange",initialState)
  // },[initialState])

  useEffect(()=>{//
    if(inputVisible){
      // @ts-ignore
      inputRef.current!.focus();//设置焦点
    }else {
      setInputValue(value)//设置初始化默认值
      console.log("初始化value",thekey,value)
    }
  },[inputVisible])
  //点击转换成input
  const onClickDiv = () =>setInputVisible(true);
  //改变输入得值
  const handleInputChange = (e: any) => setInputValue(e.target.value);


  const onCancel = () => {
    console.log("cancel")
    setInputValue(value)
    setInputVisible(false);
  };

  const changeInfo = async (value: any) =>{
    console.log("changeInfo1",value)
    const userLocalStorage = localStorage.getItem("Ring");
    if(userLocalStorage){
      localStorage.setItem('Ring',JSON.stringify(value))
    }else {
      sessionStorage.setItem("Ring",JSON.stringify(value))
    }
    setInitialState(value);
    console.log("changeInfo2",initialState)

  }

  const onSubmit = async (values: any) => {
    values.uid = initialState.data.uid;
    console.log(values)
    const res = await updateUserInfo(values)
    if(res.data.result){
      changeInfo(res.data)
      setInputVisible(false)
      message.success(res.data.message)
    }else {
      // setInputVisible(false)
      message.error(res.data.message)
    }
    setLoading(false);
  }

  const handleInputConfirm = () => {
    if(value == inputValue){
      setInputVisible(false)
    }else {
      setLoading(true)
      const tempValue = {[thekey]: inputValue}
      onSubmit(tempValue);
    }
  };

  return(
    <>
      {
        inputVisible ? (
          <Spin spinning={loading}>
            <Input
              suffix={
                <CheckOutlined
                  onClick={(e)=>{
                    e.stopPropagation()
                    handleInputConfirm();
                  }}
                />
              }
              // suffix={<CloseOutlined onClick={onCancel} />}
              type="text"
              ref={inputRef}
              disabled={loading}
              value={inputValue}
              onChange={handleInputChange}
              // onBlur={()=>{
              //   setTimeout(onCancel,700);
              //   //给对号一点时间，不然，直接换成div就出发不了对号了
              // }}
              onPressEnter={handleInputConfirm}
            />
          </Spin>

        ) : (
          <div onClick={onClickDiv}
               style={{
                 margin: 0,
                 padding: '5px 12px',
                 fontSize: '14px',
                 lineHeight: 1.5715,
                 height: 32,
                 width: '100%',
                 minWidth: 30,
                 display: 'inline-block',
               }}>
            {inputValue}
          </div>
        )
      }

    </>

  )
}
