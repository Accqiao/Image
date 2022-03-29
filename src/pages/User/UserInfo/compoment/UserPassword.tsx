import {Button, Form, Input, message, Modal} from "antd";
import {useEffect, useState} from "react";
import {updatePWD} from "@/services/Login";
import {useModel} from "@@/plugin-model/useModel";


export default ()=>{
  const { initialState } = useModel("@@initialState");
  const [form] = Form.useForm();
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    if(isVisible){
      setLoading(false)
    }

  },[isVisible])

  const onShow = ()=>setIsVisible(true);
  const onCancel = ()=>setIsVisible(false);

  const onSubmit = async (values: any) => {
    setLoading(true);
    values.uid = initialState.data.uid;
    const res = await updatePWD(values)
    if(res.data.result){
      setIsVisible(false);
      message.success(res.data.message)
    }else {
      message.error(res.data.message)
    }
    setLoading(false);
    form.resetFields();
  }

  return(
    <>
      <Button
        type="link"
        onClick={onShow}>
        修改密码
      </Button>

      <Modal
        onCancel={onCancel}
        destroyOnClose={true}
        visible={isVisible}
        confirmLoading={isVisible && loading}
        title="修改密码"
        width={500}
        onOk={()=>{

          form
            .validateFields()
            .then(onSubmit)
            .catch(info => {
              console.log('form Failed:', info);
            });
        }}

      >
        <Form form={form}
        >
          <Form.Item name="password"
                     label="旧密码"
                     rules={[{required: true, message: "不能为空!"}]}>
            <Input.Password />
          </Form.Item>
          <Form.Item name="newPassword"
                     label="新密码"
                     rules={[{required: true, message: "不能为空!"}]}>
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>

  )
}
