import {Col, Row, Skeleton} from "antd";
import {useEffect, useState} from "react";
import {getImageByRandom} from "@/services/ImageRequest";
import {TypeImageInfo, TypeRes} from "@/types/types";
import ImageCard from "../ImageCard"
import {useModel} from "@@/plugin-model/useModel";

export default ()=>{
  const { initialState,} = useModel("@@initialState");
  let uid = '';
  if(initialState && initialState.data)
    uid = initialState.data.uid

  const [imageInfoList,setImageInfoList] = useState<TypeImageInfo[]>([]);
  const [oneList,setOneList] = useState<TypeImageInfo[]>([]);
  const [oneNum,setOneNum] = useState<number>(0);
  const [twoList,setTwoList] = useState<TypeImageInfo[]>([]);
  const [twoNum,setTwoNum] = useState<number>(0);
  const [threeList,setThreeList] = useState<TypeImageInfo[]>([]);
  const [threeNum,setThreeNum] = useState<number>(0);
  const [fourList,setFourList] = useState<TypeImageInfo[]>([]);
  const [fourNum,setFourNum] = useState<number>(0);

  const getNumByImage = (width: number,height: number)=>{
    if(width/height > 3/4){
      return 3;//pc高度
    }else if(height/width > 3/4){
      return 6;//phone高度比
    }else {
      return 4;//插画高度
    }
  }
  const selectList = (one: number,two: number,three: number,four: number)=>{
    let tempNum = one;

    if(tempNum > two){
      tempNum = two;
    }
    if(tempNum > three){
      tempNum = three;
    }
    if(tempNum > four){
      tempNum = four;
    }

    if(tempNum == one) return 1;
    if(tempNum == two) return 2;
    if(tempNum == three) return 3;
    if(tempNum == four) return 4;

    // if(oneNum <= twoNum){//排除2
    //   if(oneNum <= threeNum){//排除2排除3
    //     if(oneNum <= fourNum){//排除2排除3排除4
    //       return 1;
    //     }else {//排除1排除2排除3
    //       return 4;
    //     }
    //   }else {//排除1排除2
    //     if(threeNum <= fourNum){//排除1、2 、4
    //       return 3;
    //     }else {////排除1、2、3
    //       return 4;
    //     }
    //   }
    // }else {//排除1
    //   if(twoNum <= threeNum){//排除1排除3
    //     if(twoNum <= fourNum){//排除1排除3排除4
    //       return 2;
    //     }else {//排除1排除2排除3
    //       return 4
    //     }
    //   }else {//排除1排除2
    //     if(threeNum <= fourNum){//排除1、2 、4
    //       return 3;
    //     }else {////排除1、2、3
    //       return 4
    //     }
    //   }
    //
    // }
  }

  useEffect(()=>{
    if(imageInfoList.length > 0){
      const tempOne = [...oneList];
      const tempTwo = [...twoList];
      const tempThree = [...threeList];
      const tempFour = [...fourList];
      let one = oneNum;
      let two = twoNum;
      let three = threeNum;
      let four = fourNum;

      imageInfoList.forEach((imgInfo)=>{
        const img = imgInfo.image;
        const num = getNumByImage(img.width,img.height)
        const next = selectList(one,two,three,four);
        if(next == 1){
          one += num;
          tempOne.push(imgInfo);
        }else if(next == 2){
          two += num;
          tempTwo.push(imgInfo);
        }else if(next == 3){
          three += num;
          tempThree.push(imgInfo);
        }else if(next == 4){
          four += num;
          tempFour.push(imgInfo);
        }
      })
      setOneList(tempOne);setOneNum(one);
      setTwoList(tempTwo);setTwoNum(two);
      setThreeList(tempThree);setThreeNum(three);
      setFourList(tempFour);setFourNum(four);
      setImageInfoList([])//为空

      console.log(1234,tempOne,tempTwo,tempThree,tempFour)
    }
  },[imageInfoList])

  useEffect(()=>{
    getImageByRandom(uid)
      .then((res) => {
        if(res.data.result){
          setImageInfoList(res.data.data);
        }else {
          setImageInfoList([]);
        }
        console.log(11,res);
      })
      .catch((err) => console.log(err))
      .finally(()=> {
        // setLoading(false)
      });

  },[])

  return(
    <Row>
      <Col span={6}>
        {
          oneList.length>0 ? (
            oneList.map((imgInfo)=>{
                return (<ImageCard key={imgInfo.image.href} imageInfo={imgInfo} />)
              }
            )
          ) : (<Skeleton  />)
        }
      </Col>
      <Col span={6}>
        {
          twoList.length>0 ? (
            twoList.map((imgInfo)=>{
                return (<ImageCard key={imgInfo.image.href} imageInfo={imgInfo} />)
              }
            )
          ) : (<Skeleton  />)
        }
      </Col>
      <Col span={6}>
        {
          threeList.length>0 ? (
            threeList.map((imgInfo)=>{
                return (<ImageCard key={imgInfo.image.href} imageInfo={imgInfo} />)
              }
            )
          ) : (<Skeleton  />)
        }
      </Col>
      <Col span={6}>
        {
          fourList.length>0 ? (
            fourList.map((imgInfo)=>{
                return (<ImageCard key={imgInfo.image.href} imageInfo={imgInfo} />)
              }
            )
          ) : (<Skeleton  />)
        }
      </Col>
    </Row>
  )
}
