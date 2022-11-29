import GoogleLogin from "react-google-login";
import axios from "axios";
import styled from "styled-components";
import React, { useRef } from "react";
import { useEffect } from "react";
import { getCookie, setCookie } from "../../hooks/CookieHook";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Layout from "../../style/Layout";
import ReactDaumPost from "react-daumpost-hook";
import useInput from "../../hooks/UseInput";

const LoginGoogle = () => {
  // 인가코드 받아오기---------------------------------------------------
  const navigate = useNavigate();
  let href = window.location.href;
  console.log(href);
  let params = new URL(window.location.href).searchParams;
  let code = params.get("code");
  console.log(code);

  const postKaKaoCode = async (signup) => {
    try {
      const { data } = await axios.post(
        "https://www.iceflower.shop/google/callback",
        { ...signup, code, myPlace: signup.address.split(" ").slice(0, 2) }
      );
      console.log(data.accessToken);
      if (data.accessToken)
        setCookie("accessToken", data.accessToken, { path: "/" });
      setCookie("google", true, { path: "/" });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, []);

  //* --------------------  선호게임 태그인풋창  ---------------------------
  const [tagItem, setTagItem] = useState("");
  const [tagList, setTagList] = useState([]);
  const ref = useRef();

  const onKeyPress = (e) => {
    console.log(e);
    if (e.target.value.length !== 0 && e.charCode === 13) {
      submitTagItem();
      console.log("enter");
    }
  };

  const submitTagItem = () => {
    console.log(tagItem);
    let updatedTagList = [...tagList];
    updatedTagList.push(`#${tagItem.trim()}`);
    setTagList(updatedTagList);
    setTagItem("");
    console.log(updatedTagList);
  };

  const deleteTagItem = (e) => {
    console.log(tagList);
    console.log(e.target.parentElement.firstChild.innerText);
    const deleteTagItem = e.target.parentElement.firstChild.innerText;
    const filteredTagList = tagList.filter(
      (tagItem) => tagItem !== deleteTagItem
    );
    setTagList(filteredTagList);
  };

  //* --------------------- 닉네임,주소입력 기능  -----------------------

  const initialState = {
    nickName: "",
    address: "",
    myPlace: "",
    age: "",
    gender: "",
    likeGame: "",
  };

  const [signup, setSignup, onChange] = useInput(initialState);
  const onSubmitHandler = () => {
    if (signup.nickName) {
      postKaKaoCode(signup);
      navigate("/main");
    } else {
      alert("다시 입력해주세요!");
    }
  };

  //? --------------------  다음 주소창  ----------------------------

  const postConfig = {
    //팝업창으로 사용시 해당 파라메터를 없애면 된다.
    onComplete: (data) => {
      // 데이터를 받아와서 set해주는 부분
      setSignup({ ...signup, address: data.address });
      // 검색후 해당 컴포넌트를 다시 안보이게 하는 부분
      ref.current.style.display = "none";
    },
  };
  const postCode = ReactDaumPost(postConfig);
  if (getCookie("kakao")) {
    window.location.replace("/main");
  } else {
    return (
      <Layout>
        <Wrap>
          {" "}
          <SignUpCtn>
            {" "}
            <SignUpHeader>
              <Arrow onClick={() => navigate("/")} />
              <div>추가정보</div>
            </SignUpHeader>
            <RowBox className="column">
              <h3>추가정보를 입력해주세요</h3> <div>성별</div>
            </RowBox>
            <RowBox>
              <label htmlFor="male">남자</label>
              <InputBirth
                id="male"
                type="radio"
                name="gender"
                value="male"
                onChange={onChange}
              />
              <label htmlFor="female">여자</label>
              <InputBirth
                id="female"
                type="radio"
                name="gender"
                value="female"
                onChange={onChange}
              />
            </RowBox>{" "}
            <SignUpInput
              placeholder="닉네임 (필수)"
              value={signup.nickName}
              onChange={onChange}
              name="nickName"
            />
            <SignUpInput
              placeholder="나이"
              value={signup.age}
              onChange={onChange}
              name="age"
            />
            <SignUpInput
              placeholder="주소"
              onClick={postCode}
              value={signup.address}
            />
            <DaumPostBox ref={ref}></DaumPostBox>
          </SignUpCtn>
          {/* 이 부분을 폼안에 넣어버리면, 엔터가 안먹어서 다른방법을 찾아야함 */}
          <WholeBox>
            <TagBox>
              {tagList.map((tagItem, index) => {
                return (
                  <TagItem key={index}>
                    <Text>{tagItem}</Text>
                    <TagButton onClick={deleteTagItem}>X</TagButton>
                  </TagItem>
                );
              })}
              <TagInput
                type="text"
                placeholder="#선호게임"
                tabIndex={2}
                onChange={(e) => setTagItem(e.target.value)}
                value={tagItem}
                onKeyPress={onKeyPress}
              />
            </TagBox>
          </WholeBox>
          <NextBtn onClick={onSubmitHandler}>완료</NextBtn>
        </Wrap>
      </Layout>
    );
  }
};

export default LoginGoogle;

const Wrap = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignUpCtn = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 20px;
  color: white;
`;

const SignUpHeader = styled.div`
  position: absolute;
  top: 0;
  font-size: 1.5rem;
  font-weight: 400;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 20px;
  padding-right: 40%;
`;

const RowBox = styled.div`
  width: 90%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  &.column {
    align-items: flex-start;
    flex-direction: column;
  }
`;

const InputBirth = styled.input`
  border-radius: 5px;
  width: 10%;
  padding: 10px;
  border: 2px solid #9747ff;
`;

const SignUpInput = styled.input`
  color: white;
  display: block;
  width: 90%;
  padding: 0 20px;
  margin-bottom: 5px;
  height: 40px;
  border: none;
  border-bottom: 1px solid #ffffff;
  background-color: transparent;
  cursor: pointer;
  &:focus {
    border: none;
    border-bottom: 2px solid white;
  }
`;

const DaumPostBox = styled.div`
  position: relative;
  box-shadow: 0px 3px 3px 0px gray;
  width: 400px;
`;

const NextBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  position: fixed;
  bottom: 50px;
  font-weight: 600;
  width: 80%;
  max-width: 500px;
  height: 3em;
  border: none;
  border-radius: 20px;
  box-shadow: 0px 3px 3px 0px gray;
  cursor: pointer;
  background-color: white;
  :hover {
    background-color: gray;
  }
`;

const WholeBox = styled.div`
  width: 67%;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const TagBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  min-height: 40px;
  margin: 10px;
  padding: 0 10px;
  border: none;
  border-bottom: 1px solid white;
  &:focus-within {
    border-bottom: 2px solid white;
  }
`;

const TagItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px;
  padding: 5px;
  background-color: #a766ff;
  border-radius: 5px;
  color: white;
  font-size: 13px;
`;

const Text = styled.span``;

const TagButton = styled.button``;

const TagInput = styled.input`
  display: inline-flex;
  min-width: 150px;
  background: transparent;
  border: none;
  outline: none;
  cursor: text;
`;

const Arrow = styled.div`
  border: 7px solid transparent;
  border-top-color: white;
  transform: rotate(90deg);
`;
