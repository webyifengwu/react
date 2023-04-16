import React from "react";
import "../../../assets/css/page.scss";
import { Carousel, Image } from "antd";
let imgArr = [
  {
    id: 1,
    src: "http://localhost:8080/CarouselImg/wallhaven-d6827l.jpg",
  },
  {
    id: 2,
    src: "http://localhost:8080/CarouselImg/wallhaven-gpwgpl.png",
  },
  {
    id: 3,
    src: "http://localhost:8080/CarouselImg/wallhaven-gpwxpl.jpg",
  },
  {
    id: 4,
    src: "http://localhost:8080/CarouselImg/wallhaven-qzryz7.png",
  },
  {
    id: 5,
    src: "http://localhost:8080/CarouselImg/wallhaven-x6ewo3.png",
  },
];
export default function Page() {
  let style ={
    width:"100%",
    height:"100%"
  }
  return (
    <>
      <Carousel autoplay effect="fade">
        {imgArr.map((item) => (
          <div key={item.id} className="swipperd">
            <Image  style={style} src={item.src} />
            {/* <img src={item.src} alt="" srcset="" /> */}
          </div>
        ))}
      </Carousel>
    </>
  );
}
