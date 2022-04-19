import {Carousel, Image} from "antd";
import React, {useEffect, useState} from "react";
import {TypeImage, TypeImageInfo} from "@/types/types";
import {GET_ImageLikeHistory} from "@/services/ImageLikeRequest";
import {GET_ImageCarousel} from "@/services/ImageRequest";

export default ()=>{

  const [imageList ,setImageList] = useState<TypeImage[]>([]);
  useEffect(()=>{
    GET_ImageCarousel()
      .then(res=>{
        console.log(res)
        setImageList(res.data.data);
      }).catch((err) => console.log(err))
  },[]);

  return (
    <div style={{margin:"0 auto ", width:1000}}>
      <Carousel
        effect="fade"
        autoplay

      >
        {
          imageList.map((img)=>{
            return (
              <div key={img.hid}>
                <Image
                  height={500}
                  src={"http://localhost:8088/image/"+img.href} />
              </div>
            )
          })
        }

      </Carousel>
    </div>

  )
}
