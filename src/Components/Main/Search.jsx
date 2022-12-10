import styled from "styled-components";
import Layout from "../../style/Layout";
import { useEffect, useState } from "react";
import Item from "./MainCard";
import { useNavigate } from "react-router-dom";
import Skeleton from "./Skeleton";
import { postsApi, userApi } from "../../instance";
import MobileHeader from "../../style/MobileHeader";

const Search = () => {
  const navigate = useNavigate();
  const [keyWord, setKeyWord] = useState("");
  const [titleSearch, setTitleSearch] = useState([]);
  const [nicknameSearch, setNicknameSearch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bookmarked, setBookmarked] = useState();
  const [ModalOpen, setModalOpen] = useState();

  const creatTitlePost = async () => {
    setLoading(true);
    try {
      const { data } = await postsApi.getSearchTitle(keyWord);
      console.log(data.data);

      setTitleSearch(data.data);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {}
  };
  const creatNicknamePost = async () => {
    setLoading(true);
    try {
      const { data } = await postsApi.getSearchNickname(keyWord);
      console.log(data.data);
      setNicknameSearch(data.data);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
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

  const getUser = async () => {
    try {
      const { data } = await userApi.getUser();
      setBookmarked(data.findUser.bookmark);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  console.log(bookmarked);

  return (
    <Layout>
      <MobileHeader />
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
        {loading ? (
          <Skeleton />
        ) : (
          titleSearch?.map((items, idx) => {
            return (
              <Item
                userBook={bookmarked}
                setModalOpen={setModalOpen}
                key={idx}
                items={items}
                ModalOpen={ModalOpen}
              ></Item>
            );
          })
        )}
        {loading ? (
          <Skeleton />
        ) : (
          nicknameSearch?.map((items, idx) => {
            return <Item userBook={bookmarked} key={idx} items={items}></Item>;
          })
        )}{" "}
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
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  text-shadow: 0 0 7px #d90368, 0 0 10px #d90368, 0 0 21px #fff,
    0 0 42px #d90368, 0 0 82px #d90368, 0 0 92px #d90368, 0 0 102px #d90368,
    0 0 151px #d90368;
`;

const MainListCtn = styled.div`
  width: 100%;
  padding: 3% 5% 0 5%;
  overflow-y: hidden;
  overflow-y: scroll;
  //? -----모바일에서처럼 스크롤바 디자인---------------
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
  :hover {
    cursor: pointer;
  }
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
