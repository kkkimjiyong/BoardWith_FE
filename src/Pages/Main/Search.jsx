import styled from "styled-components";
import Layout from "../../style/Layout";
import axios from "axios";
import { getCookie } from "../../hooks/CookieHook";
import { useState } from "react";
import Item from "./MainCard";
import { useNavigate } from "react-router-dom";
import Skeleton from "./Skeleton";
import { postsApi } from "../../instance";

const Search = () => {
  const navigate = useNavigate();
  const [keyWord, setKeyWord] = useState("");
  const [titleSearch, setTitleSearch] = useState([]);
  const [nicknameSearch, setNicknameSearch] = useState([]);
  const [loading, setLoading] = useState(false);

  const creatTitlePost = async () => {
    setLoading(true);
    try {
      const { data } = await postsApi.getSearchTitle(keyWord);

      setTitleSearch(data.data);
      setLoading(false);
    } catch (error) {}
  };
  const creatNicknamePost = async () => {
    setLoading(true);
    try {
      const { data } = await postsApi.getSearchNickname(keyWord);
      setNicknameSearch(data.data);
      setLoading(false);
    } catch (error) {}
  };

  const onChange = (e) => {
    setKeyWord(e.target.value);
    console.log(keyWord);
  };
  const onKeyPress = (e) => {
    console.log(e);
    if (e.target.value.length !== 0 && e.charCode === 13) {
      creatNicknamePost();
      creatTitlePost();
      console.log("enter");
    }
  };

  return (
    <Layout>
      <MainHeader>
        <Arrow className="head" onClick={() => navigate("/main")} />
        <div className="headtxt">검색</div>
      </MainHeader>
      <SearchInput
        placeholder="제목 또는 닉네임을 검색해주세요"
        onChange={onChange}
        onKeyPress={onKeyPress}
        value={keyWord}
      ></SearchInput>{" "}
      <MainListCtn>
        {" "}
        {titleSearch?.map((items, idx) => {
          if (items.participant.length < items.partyMember && !items.closed) {
            return (
              <Item
                //   setModalOpen={setModalOpen}
                key={idx}
                item={items}
                //   Myaddress={Myaddress}
              ></Item>
            );
          } else {
            <div>마감되었습니다</div>;
          }
        })}
        {nicknameSearch?.map((items, idx) => {
          if (items.participant.length < items.partyMember && !items.closed) {
            return (
              <Item
                //   setModalOpen={setModalOpen}
                key={idx}
                item={items}
                //   Myaddress={Myaddress}
              ></Item>
            );
          } else {
            <div>마감되었습니다</div>;
          }
        })}{" "}
        {loading ? <Skeleton /> : null}
        {loading ? <Skeleton /> : null}
        {loading ? <Skeleton /> : null}
      </MainListCtn>
    </Layout>
  );
};

export default Search;

const MainHeader = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  background-color: var(--black);
  box-shadow: 0px 0.5px 15px 0.1px black;
  z-index: 10;
  color: white;
  padding: 2% 5%;
  height: 7vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainListCtn = styled.div`
  width: 100%;
  padding: 3% 5% 0 5%;
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

const SearchInput = styled.input`
  width: 90%;
  color: white;
  background-color: var(--gray);
  border: none;
  padding: 10px;
  border-radius: 10px;
  margin-top: 5px;
`;
const Arrow = styled.div`
  position: relative;
  left: -47%;
  display: inline-block;
  border: 7px solid transparent;
  border-top-color: var(--white);
  transform: rotate(90deg);
  &.left {
    transform: rotate(270deg);
  }
  &.open {
    margin-top: 7px;
    transform: rotate(0deg);
  }
  &.head {
    border-top-color: white;
  }
`;
