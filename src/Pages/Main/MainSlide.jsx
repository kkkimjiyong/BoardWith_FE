import styled from "styled-components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Item from "../Main/MainCard";
import axios from "axios";
import MainFilter from "./MainFilter";
import { useRef } from "react";
import { NearDetailModal } from "../../Components/Detail/NearDetailModal";
import { BiCurrentLocation } from "react-icons/bi";
import { BsPencil } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
import { DetailModal } from "../../Components/Detail/DetailModal";

const MainSlide = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [targetMargin, setTargetMargin] = useState(0);
  const [NearModalOpen, setNearModalOpen] = useState(false);
  const [ModalOpen, setModalOpen] = useState(false);
  const [open, setOpen] = useState(false);

  //?-----------------------------가장 가까운 모임 기능--------------------------
  //초기값은 스파르타코딩클럽 본사위치로
  const [Myaddress, SetMyaddress] = useState();
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  //내 위치를 불러오는 것에 성공했을 때 , 실행되는 함수
  function success(position) {
    SetMyaddress({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  }
  //!불러오지 못했을 때 실행되는 함수.
  function error(err) {
    console.warn("ERROR(" + err.code + "): " + err.message);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error, options);

    //로딩화면을 보여주고, 메인페이지를 불러오자. (로고도 보여줄겸)
    setTimeout(() => setLoading(false), 1500);
  }, []);

  //newcardData는 기존 배열에 distance값이 추가된 배열입니다.
  const newcardData = useSelector((state) => state.posts.distance);
  //!복사를 해주지않으면, 첫 랜더링시에 아래 sort함수가 작동하지않습니다. (이유는 좀 더 찾아봐야함)
  const new2 = [...newcardData];

  // *이건 가장 가까운순으로 정렬한 배열 => 사용자가 버튼을 누르면 이 배열로 map이 돌아가야함.
  const neardata = new2.sort((a, b) => a.distance - b.distance);

  const nearFilterHandler = () => {
    if (Myaddress) {
      setItems(neardata);
      setNearModalOpen(true);
    } else {
      alert("위치 허용을 누르셔야 이용가능합니다!");
    }
  };

  //? --------------------------------------------------------------------------

  const [items, setItems] = useState([]);
  // console.log("items", items);
  const [nextPage, setNextPage] = useState(true);
  let page = 0;

  const target = useRef();

  const getData = async () => {
    const response = await axios.get(
      `https://www.iceflower.shop/posts/?skip=${page}`
    );
    setItems((prev) => prev.concat(response.data.data));
    page += 5;
  };
  console.log(ModalOpen);
  useEffect(() => {
    let observer;
    if (target.current) {
      const onIntersect = async ([entry], observer) => {
        if (entry.isIntersecting && true) {
          observer.unobserve(entry.target);
          await getData();
          observer.observe(entry.target);
        }
      };
      observer = new IntersectionObserver(onIntersect, { threshold: 0.1 }); // 추가된 부분
      observer.observe(target.current);
    }

    return () => observer && observer.disconnect();
  }, [target]);
  //필터 만들 부분~!
  useEffect(() => {
    setItems(items);
  }, []);
  return (
    <>
      {" "}
      <MainBox className="Scroll">
        <MainHeader>
          <BiCurrentLocation size={"30"} onClick={() => nearFilterHandler()} />
          <div className="headtxt">파티모집</div>
          <Rowbox>
            <FiFilter size={"24"} onClick={() => setOpen(!open)} />
            <BsPencil size={"24"} onClick={() => navigate("/form")} />
          </Rowbox>
        </MainHeader>
        <MainListCtn>
          {items?.map((items, idx) => {
            if (items.participant.length < items.partyMember) {
              return (
                <Item
                  setModalOpen={setModalOpen}
                  key={idx}
                  item={items}
                  Myaddress={Myaddress}
                ></Item>
              );
            } else {
              <div>마감되었습니다</div>;
            }
          })}
          <Target ref={target}>This is Target.</Target>{" "}
        </MainListCtn>
      </MainBox>{" "}
      <MainFilter
        targetMargin={targetMargin}
        setTargetMargin={setTargetMargin}
        items={items}
        setItems={setItems}
        getData={getData}
        open={open}
        setOpen={setOpen}
      />{" "}
      {/* //! 가장 가까운 모임 보여주는 모달창 */}
      {NearModalOpen && (
        <NearDetailModal
          postid={newcardData[0]?._id}
          setNearModalOpen={setNearModalOpen}
        />
      )}
    </>
  );
};

export default MainSlide;

const Target = styled.div`
  /* height: 100px; */
`;

const MainBox = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
`;

const MainHeader = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  background-color: #2e294e;
  box-shadow: 0px 0.5px 15px 0.1px black;
  z-index: 10;
  color: white;
  padding: 3.5% 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .headtxt {
    margin-left: 20px;
    color: #fff;
    text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #d90368,
      0 0 82px #d90368, 0 0 92px #d90368, 0 0 102px #d90368, 0 0 151px #d90368;
  }
`;

const MainListCtn = styled.div`
  width: 100%;
  padding: 3% 5% 0 5%;
`;

const Rowbox = styled.div`
  display: flex;
  gap: 10px;
`;
