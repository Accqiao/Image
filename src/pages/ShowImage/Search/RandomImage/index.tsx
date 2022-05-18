import { Col, Row, Skeleton } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { GET_ImageByRandom } from '@/services/ImageRequest';
import { TypeImageInfo, TypeRes } from '@/types/types';
import ImageCard from '@/pages/ShowImage/ImageCard/index';
import { useModel } from '@@/plugin-model/useModel';
import InfiniteScroll from 'react-infinite-scroll-component';

export default () => {
  const { initialState } = useModel('@@initialState');
  const divOne = useRef();
  const divTwo = useRef();
  const divThree = useRef();
  const divFour = useRef();
  const [imageInfoList, setImageInfoList] = useState<TypeImageInfo[]>([]);
  const [oneList, setOneList] = useState<TypeImageInfo[]>([]);
  const [oneNum, setOneNum] = useState<number>(0);
  const [twoList, setTwoList] = useState<TypeImageInfo[]>([]);
  const [twoNum, setTwoNum] = useState<number>(0);
  const [threeList, setThreeList] = useState<TypeImageInfo[]>([]);
  const [threeNum, setThreeNum] = useState<number>(0);
  const [fourList, setFourList] = useState<TypeImageInfo[]>([]);
  const [fourNum, setFourNum] = useState<number>(0);
  const [begin, setBegin] = useState<number>(0);

  const selectList = (
    one: number,
    two: number,
    three: number,
    four: number,
  ) => {
    let tempNum = one;
    if (tempNum > two) {
      tempNum = two;
    }
    if (tempNum > three) {
      tempNum = three;
    }
    if (tempNum > four) {
      tempNum = four;
    }
    if (tempNum == one) return 1;
    if (tempNum == two) return 2;
    if (tempNum == three) return 3;
    if (tempNum == four) return 4;
  };
  useEffect(() => {
    if (imageInfoList.length > 0) {
      const tempOne = [...oneList];
      const tempTwo = [...twoList];
      const tempThree = [...threeList];
      const tempFour = [...fourList];
      let one = divOne.current?.clientHeight;
      let two = divTwo.current?.clientHeight;
      let three = divThree.current?.clientHeight;
      let four = divFour.current?.clientHeight;

      imageInfoList.forEach((imgInfo) => {
        const img = imgInfo.image;
        const num = (img.height / img.width) * 265.2;
        const next = selectList(one, two, three, four);
        if (next == 1) {
          one += num;
          tempOne.push(imgInfo);
        } else if (next == 2) {
          two += num;
          tempTwo.push(imgInfo);
        } else if (next == 3) {
          three += num;
          tempThree.push(imgInfo);
        } else if (next == 4) {
          four += num;
          tempFour.push(imgInfo);
        }
      });
      setOneList(tempOne);
      setTwoList(tempTwo);
      setThreeList(tempThree);
      setFourList(tempFour);
      setImageInfoList([]); //为空
    } else {
      console.log(1, oneNum);
      console.log(2, twoNum);
      console.log(3, threeNum);
      console.log(4, fourNum);
    }
  }, [imageInfoList]);
  useEffect(() => {
    GETIMAGE();
  }, []); //初始化
  const GETIMAGE = () => {
    GET_ImageByRandom(initialState ? initialState.data.uid : '')
      .then((res) => {
        if (res.data.result) {
          setImageInfoList(res.data.data);
          setBegin(begin + 10);
        } else {
          setImageInfoList([]);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {});
  };

  return (
    <div>
      <InfiniteScroll
        dataLength={begin} //This is important field to render the next data
        next={GETIMAGE}
        hasMore={begin < 80} //为false时next不会触发
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>已经很多了~仔细浏览一下吧</b>
          </p>
        }
      >
        <Row>
          <Col span={6}>
            <div ref={divOne} style={{ width: 'fit-content' }}>
              {oneList.length > 0 ? (
                oneList.map((imgInfo) => {
                  return (
                    <ImageCard key={imgInfo.image.href} imageInfo={imgInfo} />
                  );
                })
              ) : (
                <Skeleton />
              )}
            </div>
          </Col>
          <Col span={6}>
            <div ref={divTwo} style={{ width: 'fit-content' }}>
              {twoList.length > 0 ? (
                twoList.map((imgInfo) => {
                  return (
                    <ImageCard key={imgInfo.image.href} imageInfo={imgInfo} />
                  );
                })
              ) : (
                <Skeleton />
              )}
            </div>
          </Col>
          <Col span={6}>
            <div ref={divThree} style={{ width: 'fit-content' }}>
              {threeList.length > 0 ? (
                threeList.map((imgInfo) => {
                  return (
                    <ImageCard key={imgInfo.image.href} imageInfo={imgInfo} />
                  );
                })
              ) : (
                <Skeleton />
              )}
            </div>
          </Col>
          <Col span={6}>
            <div ref={divFour} style={{ width: 'fit-content' }}>
              {fourList.length > 0 ? (
                fourList.map((imgInfo) => {
                  return (
                    <ImageCard key={imgInfo.image.href} imageInfo={imgInfo} />
                  );
                })
              ) : (
                <Skeleton />
              )}
            </div>
          </Col>
        </Row>
      </InfiniteScroll>
    </div>
  );
};
