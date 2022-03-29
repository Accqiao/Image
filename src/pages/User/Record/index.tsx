import {Timeline} from "antd";

export default () => {

  return(
    <Timeline mode={"left"}>
      <Timeline.Item label="2015-09-01">Create a services</Timeline.Item>
      <Timeline.Item label="2015-09-01 09:12:11">Solve initial network problems</Timeline.Item>
      <Timeline.Item>Technical testing</Timeline.Item>
      <Timeline.Item label="2015-09-01 09:12:11">Network problems being solved</Timeline.Item>
    </Timeline>
  )
}
