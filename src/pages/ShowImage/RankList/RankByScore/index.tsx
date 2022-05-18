import { Col, Row, Skeleton } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { GET_ImageByScore } from '@/services/ImageRequest';
import { TypeImageInfo, TypeImageRank } from '@/types/types';
import ImageCard from '@/pages/ShowImage/ImageCard/index';
import { useModel } from '@@/plugin-model/useModel';
import InfiniteScroll from 'react-infinite-scroll-component';
import RankImageCard from '@/pages/ShowImage/RankList/RankImageCard';

export default () => {
  const { initialState } = useModel('@@initialState');
  const divOne = useRef();
  const divTwo = useRef();
  const divThree = useRef();
  const divFour = useRef();
  const [oneList, setOneList] = useState<TypeImageRank[]>([]);
  const [twoList, setTwoList] = useState<TypeImageRank[]>([]);
  const [threeList, setThreeList] = useState<TypeImageRank[]>([]);
  const [fourList, setFourList] = useState<TypeImageRank[]>([]);

  const [imageInfoList, setImageInfoList] = useState<TypeImageRank[]>([]);
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
    }
  }, [imageInfoList]);
  useEffect(() => {
    GETIMAGE();
  }, []); //初始化
  const GETIMAGE = () => {
    const params = {
      uid: initialState ? initialState.data.uid : '',
      begin: begin,
      rows: 10,
    };
    GET_ImageByScore(params)
      .then((res) => {
        if (res.data.result) {
          setImageInfoList(res.data.data);
          setBegin(begin + res.data.data.length);
          // console.log(begin,res.data.data);
        } else {
          setImageInfoList([]);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <InfiniteScroll
        dataLength={begin} //This is important field to render the next data
        next={GETIMAGE}
        hasMore={begin < 50} //为false时next不会触发
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
                    <RankImageCard
                      key={imgInfo.image.href}
                      imageInfo={imgInfo}
                      type={'score'}
                    />
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
                    <RankImageCard
                      key={imgInfo.image.href}
                      imageInfo={imgInfo}
                      type={'score'}
                    />
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
                    <RankImageCard
                      key={imgInfo.image.href}
                      imageInfo={imgInfo}
                      type={'score'}
                    />
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
                    <RankImageCard
                      key={imgInfo.image.href}
                      imageInfo={imgInfo}
                      type={'score'}
                    />
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
