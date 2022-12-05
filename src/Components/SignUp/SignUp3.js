import React, { useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import ReactDaumPost from "react-daumpost-hook";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { signUpApi } from "../../instance.js";
import { useState } from "react";
import axios from "axios";
import useInput from "../../hooks/UseInput.js";
import Layout from "../../style/Layout.js";
import { useSelector } from "react-redux";
import AlertModal from "../AlertModal.js";

const SignUp3 = () => {
  const initialState = { phoneNumber: "", verifyCode: "" };
  const [user, setUser, onChange] = useInput(initialState);
  const userInfo = useSelector((state) => state.posts.user);

  const [alert, setAlert] = useState(false);
  const [content, setContent] = useState();
  const [address, setAddress] = useState();
  const navigate = useNavigate();

  //yup을 이용한 유효섬겅증방식
  const formSchema = yup.object({
    age: yup
      .string()
      .required("나이를 입력해주세요")
      .max(2, "최대 99살까지만 가능합니다"),
    address: yup.string().required("주소를 입력해주세요!"),
    gender: yup.string().required("성별을 선택해주세요!"),
  });

  const postSignUp = async (payload) => {
    try {
      const data = await signUpApi.postSingup(payload);
      console.log(data);
      setAlert(true);
      setContent("회원가입을 축하드립니다!");
      setAddress("/");
    } catch (error) {
      alert(error.response.data.err);
      setValue("nickName", "");
    }
  };

  //useForm 설정
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: { gender: "male" },
    resolver: yupResolver(formSchema),
  });

  const ref = useRef(null);
  console.log(errors);
  //submit 핸들러
  const onSubmit = (data) => {
    console.log(data);

    console.log({
      ...userInfo,
      age: data.age,
      likeGame: tagList,
      myPlace: data.address.split(" ").slice(0, 2),
    });

    //선호지역은 자동적으로 나의 집주소에서 구단위 까지만으로 적용
    postSignUp({
      ...userInfo,
      ...data,
      age: data.age,
      likeGame: tagList,
      myPlace: data.address.split(" ").slice(0, 2),
    });
    console.log(errors);
    reset();
  };

  //* --------------------  다음 주소창  ----------------------------

  const postConfig = {
    //팝업창으로 사용시 해당 파라메터를 없애면 된다.
    onComplete: (data) => {
      // 데이터를 받아와서 set해주는 부분
      setValue("address", data.address);
      // 검색후 해당 컴포넌트를 다시 안보이게 하는 부분
      ref.current.style.display = "none";
    },
  };
  const postCode = ReactDaumPost(postConfig);

  //* --------------------  선호게임 태그인풋창  ---------------------------

  const [tagItem, setTagItem] = useState("");
  const [tagList, setTagList] = useState([]);

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

  //* ---------------------  빈칸 따로 정의  ---------------------------
  console.log(watch());

  return (
    <Layout>
      <SignUpWrap>
        {alert && (
          <AlertModal setAlert={setAlert} address={address} content={content} />
        )}
        <>
          <SignUpCtn>
            <SignUpHeader>
              <Arrow onClick={() => navigate("/signup2")} />
              <div>회원가입</div>
            </SignUpHeader>
            <RowBox className="column">
              <h3>추가정보를 입력해주세요</h3> <div>성별</div>
            </RowBox>

            <RowBox>
              <label htmlFor="male">남자</label>
              <InputBirth
                id="male"
                type="radio"
                value={"male"}
                {...register("gender")}
              ></InputBirth>

              <label htmlFor="female">여자</label>
              <InputBirth
                id="female"
                type="radio"
                value={"female"}
                {...register("gender")}
              ></InputBirth>
            </RowBox>
            {errors.gender && (
              <AlertError role="alert">{errors.gender.message}</AlertError>
            )}
            <SignUpInput
              className="Birth1"
              placeholder="나이를 입력해주세요"
              {...register("age")}
            />
            {errors.age && (
              <AlertError role="alert">{errors.age.message}</AlertError>
            )}
            <SignUpInput
              placeholder="클릭하면, 주소창이 뜹니다."
              type="text"
              onClick={postCode}
              {...register("address")}
            />
            {errors.address && (
              <AlertError role="alert">{errors.address.message}</AlertError>
            )}
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
                placeholder="엔터로 태그를 만들어주세요. ( 선호게임 )"
                tabIndex={2}
                onChange={(e) => setTagItem(e.target.value)}
                value={tagItem}
                onKeyPress={onKeyPress}
              />
            </TagBox>
          </WholeBox>
          <NextBtn onClick={handleSubmit(onSubmit)}>완료</NextBtn>
        </>
      </SignUpWrap>{" "}
    </Layout>
  );
};
const SignUpWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  width: 100%;
  height: 100vh;
  color: white;
`;

const SignUpCtn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 20px;
`;

const SignUpHeader = styled.div`
  position: relative;
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

const VerfiyBtn = styled.div`
  font-size: 15px;
  color: var(--white);
  width: 35%;
  background-color: var(--primary);
  display: flex;
  justify-content: center;
  border-radius: 15px;
  padding: 5px 10px;
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
  color: var(--white);
  position: absolute;
  bottom: 50px;
  font-weight: 600;
  width: 80%;
  max-width: 500px;
  height: 3em;
  border: none;
  border-radius: 20px;
  box-shadow: 0px 3px 3px 0px gray;
  cursor: pointer;
  background-color: var(--primary);
  :hover {
    background-color: gray;
  }
`;

const WholeBox = styled.div`
  width: 90%;
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
  background-color: var(--primary);
  border-radius: 5px;
  color: white;
  font-size: 13px;
`;

const Text = styled.span``;

const TagButton = styled.button`
  background-color: transparent;
  text-shadow: 0px 1px 1px 0px var(--black);
  border: none;
  color: var(--red);
`;

const TagInput = styled.input`
  color: white;
  display: inline-flex;
  min-width: 270px;
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

const AlertError = styled.div`
  font-size: 14px;
  color: red;
`;

export default SignUp3;
