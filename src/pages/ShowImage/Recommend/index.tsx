import { Col, Row, Skeleton } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { GET_ImageByRecommend } from '@/services/ImageRequest';
import { TypeImageRecom } from '@/types/types';
import ReImageCard from './ReImageCard';
import { useModel } from '@@/plugin-model/useModel';
import NotLogin from '@/pages/Layout/Empty/NotLogin';
import InfiniteScroll from 'react-infinite-scroll-component';

export default () => {
  const { initialState } = useModel('@@initialState');
  const divOne = useRef();
  const divTwo = useRef();
  const divThree = useRef();
  const divFour = useRef();

  const [imageInfoList, setImageInfoList] = useState<TypeImageRecom[]>([]);
  const [oneList, setOneList] = useState<TypeImageRecom[]>([]);
  const [twoList, setTwoList] = useState<TypeImageRecom[]>([]);
  const [threeList, setThreeList] = useState<TypeImageRecom[]>([]);
  const [fourList, setFourList] = useState<TypeImageRecom[]>([]);
  const [CFbegin, setCFbegin] = useState<number>(0);
  const [Tagbegin, setTagbegin] = useState<number>(0);
  const [allNum, setAllNum] = useState<number>(0);

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
      let tempCfNum = CFbegin;
      let tempTagNum = Tagbegin;
      imageInfoList.forEach((imgInfo) => {
        if (imgInfo.type == 'tag') {
          tempTagNum++;
        } else if (imgInfo.type == 'recom') {
          tempCfNum++;
        }
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

      setCFbegin(tempCfNum);
      setTagbegin(tempTagNum);
      setAllNum(allNum + imageInfoList.length); //设置总数据长度
      setImageInfoList([]); //为空
    }
  }, [imageInfoList]);
  useEffect(() => {
    GETIMAGE();
  }, []);

  const GETIMAGE = () => {
    const params = {
      uid: initialState ? initialState.data.uid : '',
      CFbegin: CFbegin, //计算
      Tagbegin: Tagbegin,
    };
    GET_ImageByRecommend(params)
      .then((res) => {
        if (res.data.result) {
          setImageInfoList(res.data.data);
        } else {
          setImageInfoList([]);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      {initialState && initialState.result ? (
        <InfiniteScroll
          dataLength={allNum} //This is important field to render the next data
          next={GETIMAGE}
          hasMore={allNum < 80} //为false时next不会触发
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>太多了~仔细浏览一下吧</b>
            </p>
          }
        >
          <Row>
            <Col span={6}>
              <div ref={divOne} style={{ width: 'fit-content' }}>
                {oneList.length > 0 ? (
                  oneList.map((imgInfo) => {
                    return (
                      <ReImageCard
                        key={imgInfo.image.href}
                        imageInfo={imgInfo}
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
                      <ReImageCard
                        key={imgInfo.image.href}
                        imageInfo={imgInfo}
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
                      <ReImageCard
                        key={imgInfo.image.href}
                        imageInfo={imgInfo}
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
                      <ReImageCard
                        key={imgInfo.image.href}
                        imageInfo={imgInfo}
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
      ) : (
        <NotLogin />
      )}
    </>
  );
};
