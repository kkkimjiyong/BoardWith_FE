import styled from "styled-components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Item from "../Main/MainCard";
import axios from "axios";
import MainFilter from "./MainFilter";
import { useRef } from "react";
import { BiCurrentLocation } from "@react-icons/all-files/bi/BiCurrentLocation";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FiFilter } from "@react-icons/all-files/fi/FiFilter";
import { DetailModal } from "../../Components/Detail/DetailModal";
import Form from "./Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getCookie } from "../../hooks/CookieHook";
import { postsApi, userApi } from "../../instance";
import { useInView } from "react-intersection-observer";
import { Skeleton } from "@mui/material";
import Tutorial from "../../Components/Tutorial/Tutorial";
import Loading from "../../style/Loading";

import Modify from "./Modify";

import AlertModal from "../../Components/AlertModal";
import MobileHeader from "../../style/MobileHeader";


const MainSlide = () => {
  const navigate = useNavigate();
  const [targetMargin, setTargetMargin] = useState(0);
  const [NearModalOpen, setNearModalOpen] = useState(false);
  const [ModalOpen, setModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [modifyModalOpen, setModifyModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [isTutorial, setIsTutorial] = useState(false);
  const [selfCheck, setSelfCheck] = useState(false);
  const [userBook, setUserBook] = useState([]);
  const scrollHead = useRef();
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(false);
  const [content, setContent] = useState();

  //?---------------  스크롤높이가 0인 지점으로 올라감  -----------------
  const scrollToTop = () => {
    scrollHead.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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
    setTimeout(() => setLoading(false), 1000);
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
      setAlert(true);
      setContent("위치 허용을 누르셔야 이용가능합니다!");
    }
  };
  //? --------------- get User --------------------
  const getUser = async () => {
    try {
      const { data } = await userApi.getUser();
      console.log(data.findUser.bookmarkData);
      setUserBook(data.findUser.bookmark);
      setIsTutorial(data.findUser.tutorial);
      setSelfCheck(data.findUser.loginCheck);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  console.log(userBook);
  //? --------------------------------------------------------------------------

  const [items, setItems] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  let page = useRef(0);
  console.log(page);
  const [target, setTarget] = useState(null);

  const getData = async () => {
    try {
      const response = await postsApi.getPosts(page.current);
      setItems((prev) => prev.concat(response.data.data));
      setHasNextPage(response.data.data.length == 5);
      page.current += 5;
    } catch (error) {}
  };

  const { ref, inView } = useInView({
    // 라이브러리 옵션
    //threshold는 ref타겟의 모습이 0~1만큼의 모습이 보이면 inview가 작동하는 값
    threshold: 0.1,
  });
  useEffect(() => {
    //ref타켓이 보이고, 다음페이지가 있으면 데이터get요청
    if (inView && hasNextPage) {
      getData();
    }
  }, [hasNextPage, inView]);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <>
        {/* getuser로 유저정보 가져와서 출석체크 여부 확인  */}
        {alert && <AlertModal setAlert={setAlert} content={content} />}
        {!isTutorial && (
          <Tutorial setSelfCheck={setSelfCheck} setIsTutorial={setIsTutorial} />
        )}
        <MainBox className="Scroll">
          <MainHeader onClick={() => scrollToTop()}>
            <BiCurrentLocation
              size={"30"}
              onClick={() => nearFilterHandler()}
            />
            <div className="headtxt">파티모집</div>
            <Rowbox>
              <FiFilter size={"24"} onClick={() => setOpen(!open)} />
            </Rowbox>
          </MainHeader>
          <MainListCtn ref={scrollHead}>
            {items?.map((items, idx) => {
              return (
                <Item
                  userBook={userBook}
                  closed={items.closed}
                  setModalOpen={setModalOpen}
                  key={idx}
                  items={items}
                  Myaddress={Myaddress}
                ></Item>
              );
            })}
            <Target ref={ref}>target? </Target>{" "}
          </MainListCtn>{" "}
        </MainBox>{" "}
        <FormButton onClick={() => setFormModalOpen(true)}>
          <FontAwesomeIcon
            style={{
              color: "white",
            }}
            size="2x"
            icon={faPenToSquare}
          />
        </FormButton>
        <MainFilter
          targetMargin={targetMargin}
          setTargetMargin={setTargetMargin}
          items={items}
          setItems={setItems}
          getData={getData}
          open={open}
          setOpen={setOpen}
        />
        {/* //! 가장 가까운 모임 보여주는 모달창 */}
        {NearModalOpen && (
          <DetailModal
            postid={neardata[0]?._id}
            setModalOpen={setNearModalOpen}
            setModifyModalOpen={setModifyModalOpen}
          />
        )}
        {/* 게시글 폼페이지 모달창 */}
        {formModalOpen && (
          <Form setItems={setItems} setFormModalOpen={setFormModalOpen} />
        )}
      </>
    );
  }
};

export default MainSlide;

const Target = styled.div`
  height: 100px;
  color: var(--black);
`;

const MainBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 540px;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
`;

const MainHeader = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  background-color: var(--black);
  box-shadow: 0px 0.5px 15px 0.1px black;
  z-index: 10;
  color: white;
  padding: 2% 5%;
  min-height: 7%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .headtxt {
    font-size: 22px;
    color: #fff;
    text-shadow: 0 0 7px black, 0 0 10px black, 0 0 21px #fff, 0 0 42px #d90368,
      0 0 82px #d90368, 0 0 92px #d90368, 0 0 102px #d90368, 0 0 151px #d90368;
  }
`;

const MainListCtn = styled.div`
  width: 100%;
  padding: 3% 6% 0 6%;
  overflow-y: hidden;
  overflow-y: scroll;
  //? -----모바일에서처럼 스크롤바 디자인---------------
  @media only screen and (min-width: 1200px) {
    ::-webkit-scrollbar {
      width: 15px;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #898989;
      //스크롤바에 마진준것처럼 보이게
      background-clip: padding-box;
      border: 4px solid transparent;
      border-radius: 15px;
    }
  }
`;

const Rowbox = styled.div`
  display: flex;
  gap: 10px;
`;
const FormButton = styled.button`
  position: fixed;
  bottom: 10%;
  left: 72%;
  background-color: var(--primary);
  border: none;
  color: white;
  height: 60px;
  width: 60px;
  border-radius: 50%;
`;
