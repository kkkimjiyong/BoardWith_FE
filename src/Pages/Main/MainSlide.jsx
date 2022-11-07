import styled from "styled-components";
import MainCard from "./MainCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { acyncGetPosts } from "../../redux/modules/postsSlice";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MainSlide = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(acyncGetPosts());
  }, []);

  const cardData = useSelector((state) => state.posts.data);
  console.log(cardData);
  const Carousel = () => {
    // 옵션
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      centerMode: true,
      rows: 3,
      nextArrow: <div>넘기기</div>,
    };

    return (
      <div className="carousel">
        <Slider {...settings}>
          {cardData?.map((item) => {
            return <MainCard key={item._id} item={item}></MainCard>;
          })}
        </Slider>
      </div>
    );
  };

  return (
    <>
      {cardData?.length > 6 ? (
        <Container>
          {cardData?.map((item) => {
            return <MainCard key={item._id} item={item}></MainCard>;
          })}
        </Container>
      ) : (
        <Carousel />
      )}
    </>
  );
};

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
