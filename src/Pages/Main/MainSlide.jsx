import styled from "styled-components";
import MainCard from "./MainCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { acyncGetPosts } from "../../redux/modules/postsSlice";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

const MainSlide = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [Posts, SetPosts] = useState();
  const [Myaddress, SetMyaddress] = useState();
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  //내 위치를 불러오는 것에 성공했을 때 , 실행되는 함수
  function success(position) {
    //현재 위치를 state값으로
    SetMyaddress({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  }
  //불러오지 못했을 때 실행되는 함수.
  function error(err) {
    console.warn("ERROR(" + err.code + "): " + err.message);
  }

  const getPosts = async () => {
    try {
      const { data } = await axios.get("https://www.iceflower.shop/posts");
      SetPosts(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(acyncGetPosts());
    // if (!Myaddress) alert("위치기반을 누르시면, 위치기반 매칭이 가능합니다.");
    // getPosts();
    //로딩화면을 보여주고, 메인페이지를 불러오자. (로고도 보여줄겸)
    setTimeout(() => setLoading(false), 5000);
    SetPosts([
      {
        title: "보드게임 괴고수 모집합니다",
        content: "3232131",
        location: { x: "127.034757121285", y: "37.4849665053325" },
        cafe: "서울 강남구 강남대로 238",
        date: "Thu Nov 10 2022 00:00:00 GMT+0900 (한국 표준시)",
        time: "새벽3시",
        map: "강남구",
        partyMember: 4,
      },
      {
        title: "보드게임 괴고수 모집합니다",
        content: "321dssds",
        location: { x: "128.034757121285", y: "37.4849665053325" },
        cafe: "서울 강남구 강남대로 238",
        date: "Thu Nov 10 2022 00:00:00 GMT+0900 (한국 표준시)",
        time: "새벽3시",
        map: "강남구",
        partyMember: 4,
      },
      {
        title: "보드게임 괴고수 모집합니다",
        content: "32saaa1",
        location: { x: "127.054757121285", y: "37.4849665053325" },
        cafe: "서울 강남구 강남대로 238",
        date: "Thu Nov 10 2022 00:00:00 GMT+0900 (한국 표준시)",
        time: "새벽3시",
        map: "강남구",
        partyMember: 4,
      },
    ]);
    //내 위치를 좌표값으로 알려주는 카카오 MAP API
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  console.log(Posts);
  console.log(Myaddress);

  //newcardData는 기존 배열에 distance값이 추가된 배열입니다.
  const newcardData = useSelector((state) => state.posts.distance);
  //복사를 해주지않으면, 첫 랜더링시에 아래 sort함수가 작동하지않습니다. (이유는 좀 더 찾아봐야함)
  const new2 = [...newcardData];

  //이건 가장 가까운순으로 정렬한 배열 => 사용자가 버튼을 누르면 이 배열로 map이 돌아가야함.
  const neardata = new2.sort((a, b) => a.distance - b.distance);
  console.log(newcardData);
  console.log(neardata);

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
          {Posts?.map((item) => {
            return <MainCard key={item._id} item={item}></MainCard>;
          })}
        </Slider>
      </div>
    );
  };

  return (
    <>
      <>
        {loading ? (
          <div>로딩중</div>
        ) : (
          <>
            {Posts?.length < 6 ? (
              <Container>
                {Posts?.map((item, index) => {
                  return (
                    <MainCard
                      key={item._id}
                      item={item}
                      Myaddress={Myaddress}
                    ></MainCard>
                  );
                })}
              </Container>
            ) : (
              <Carousel />
            )}
            <button
              onClick={() => {
                SetPosts(neardata);
              }}
            >
              가까운순으로
            </button>
          </>
        )}
      </>
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
