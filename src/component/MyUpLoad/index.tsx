import {Col, message, Row, Upload} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {RcFile} from "antd/es/upload";
import {useEffect, useState} from "react";
import './index.less'

export default ()=>{

  const [previewVisible ,setPreviewVisible] = useState(false);
  const [previewImage ,setPreviewImage] = useState('');
  const [previewTitle ,setPreviewTitle] = useState('');
  const [fileList ,setFileList] = useState<any[]>([]);

  useEffect(()=>{
    const tempList = [
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-2',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-xxx',
        percent: 50,
        name: 'image.png',
        status: 'uploading',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-5',
        name: 'image.png',
        status: 'error',
      },
    ];
    setFileList(tempList)
  },[])

  const onBeforeUpload = (file: RcFile)=>{
    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      message.error("仅支持上传jpg/png格式的文件");
      return false;
    }
    if (file.size / 1024 / 1024 > 8) {
      message.error('上传图片不能超过8M!');
      return false;
    }
  }

  const handleChange = (obj: any) => {
    const {file ,fileList ,event} = obj;

    if(file.status == 'done'){
      console.log(file.response);
      console.log("http://localhost:8088/image/"+ file.response.data[1])
      setPreviewImage("http://localhost:8088/image/"+ file.response.data[1])
    }
    console.log("onChange: " ,file,fileList,event)
    setFileList(fileList)
  };


  return(
    <div>
      <Row>
        <Col span={16}>
          <Upload.Dragger
            action="http://localhost:8088/upload/image"

            accept={".png,.jpeg,.jpg"}
            // fileList={fileList}
            beforeUpload={onBeforeUpload}
            onChange={handleChange}
          >
            {
              previewImage && previewImage.length > 0 ? (
                  <img alt="example" style={{ width: '50%' }} src={previewImage} />
              ) : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )
            }

          </Upload.Dragger>
        </Col>
        <Col span={8}>


        </Col>

      </Row>

    </div>
  )
}
