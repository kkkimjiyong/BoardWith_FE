import styled from "styled-components";
import MainCard from "./MainCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { acyncGetPosts } from "../../redux/modules/postsSlice";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import Item from "../Main/MainCard";

const MainSlide = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(acyncGetPosts());
  }, []);

  const cardData = useSelector((state) => state.posts.data);
  console.log(cardData);

  // window.addEventListener("scroll", function () {
  //   return console.log("scroll!");
  // });
  // const Carousel = () => {
  //   // 옵션
  //   const settings = {
  //     dots: false,
  //     infinite: true,
  //     speed: 500,
  //     slidesToShow: 2,
  //     slidesToScroll: 1,
  //     centerMode: true,
  //     rows: 3,
  //     nextArrow: <div>넘기기</div>,
  //   };

  //   return (
  //     <div className="carousel">
  //       <Slider {...settings}>
  //         {cardData?.map((item) => {
  //           return <MainCard key={item._id} item={item}></MainCard>;
  //         })}
  //       </Slider>
  //     </div>
  //   );
  // };
  const [items, setItems] = useState([]); // 추가된 부분
  const [target, setTarget] = useState(null);
  const targetStyle = { width: "100%", height: "200px" };
  const page = 1;

  const fetchData = async () => {
    const response = await fetch(`https://www.iceflower.shop/${page}`);
    const data = await response.json();
    setItems((prev) => prev.concat(data.results));
    page++;
  };

  // 추가된 부분
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let observer;
    if (target) {
      const onIntersect = async ([entry], observer) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          await fetchData();
          observer.observe(entry.target);
        }
      };
      observer = new IntersectionObserver(onIntersect, { threshold: 1 }); // 추가된 부분
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  return (
    <div>
      {items.map((item, idx) => {
        <div>
          <div>{item.title}</div>
        </div>;
      })}
      <div ref={setTarget} style={targetStyle}>
        This is Target.
      </div>
    </div>
  );
};
// return (
// <>
{
  /* {cardData?.length > 6 ? ( */
}
{
  /* <Container>
        {cardData?.map((item) => {
          return <MainCard key={item._id} item={item}></MainCard>;
        })}
      </Container> */
}
{
  /* // ) : (
      //   <Carousel />
      // )} */
}
// </>
// );
// }

export default MainSlide;

const MainBox = styled.div`
  max-width: 540px;
  height: 660px;
`;

const Container = styled.div`
  background-color: #afb4ff;
  display: grid;
  gap: 20px 20px;
  padding: 20px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(3, minmax(100px, auto));
  width: 100%;
  max-width: 540px;
  height: 660px;
`;
const AppWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;

  .Target-Element {
    width: 100vw;
    height: 140px;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
  }
`;
const GlobalStyle = styled.div`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    padding: 0px;
    margin: 0px;
  }

  body {
    background-color: #f2f5f7;
  }
`;
