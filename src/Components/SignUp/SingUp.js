import React, { useEffect } from "react";
import styled from "styled-components";
import { Controller, useForm } from "react-hook-form";
import ReactDaumPost from "react-daumpost-hook";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { signUpApi } from "../../instance.js";
import { useState } from "react";
import { getCookie } from "../../hooks/CookieHook.js";

const SignUp = () => {
  const [next, setNext] = useState(0);

  const navigate = useNavigate();
  const Age = [
    "20대 초반",
    "20대 중반",
    "20대 후반",
    "30대 초반",
    "30대 중반",
    "30대 후반",
  ];

  //yup을 이용한 유효섬겅증방식
  const formSchema = yup.object({
    userId: yup
      .string()
      .required("아이디를 입력해주세요")
      .min(4, "최소 4자 이상 가능합니다")
      .max(15, "최대 15자 까지만 가능합니다"),
    password: yup
      .string()
      .required("영문, 숫자포함 8자리를 입력해주세요.")
      .min(8, "최소 8자 이상 가능합니다")
      .max(15, "최대 15자 까지만 가능합니다")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/,
        "영문 숫자포함 8자리를 입력해주세요."
      ),
    confirm: yup
      .string()
      .oneOf([yup.ref("password")], "비밀번호가 다릅니다.")
      .required("영문, 숫자포함 8자리를 입력해주세요."),
    nickName: yup
      .string()
      .required("닉네임을 입력해주세요")
      .min(2, "최소 2자 이상 가능합니다")
      .max(8, "최대 8자 까지만 가능합니다"),
    myPlace: yup.string(),
    //   .required("선호지역을 입력해주세요")
  });

  const postSignUp = async (payload) => {
    try {
      const data = await signUpApi.postSingup(payload);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  //useForm 설정
  const {
    register,
    control,
    setValue,
    getValues,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });

  const birthvalue = watch("birth");
  const ref = useRef(null);

  //submit 핸들러
  const onSubmit = (data) => {
    console.log(data);
    reset();
    console.log({ ...data, birth: Age[birthvalue], likeGame: tagList });
    navigate("/");
    //선호지역은 자동적으로 나의 집주소에서 구단위 까지만으로 적용
    postSignUp({
      ...data,
      birth: Age[birthvalue],
      likeGame: tagList,
      MyPlace: data.address.split(" ").slice(0, 2),
    });
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
    if (e.target.value.length !== 0 && e.charCode === 32) {
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
  console.log(watch());
  useEffect(() => {
    if (getCookie("kakao")) {
      setNext(2);
    }
  }, []);
  return (
    <>
      <SignUpWrap onSubmit={handleSubmit(onSubmit)}>
        {/* 회원가입 첫 페이지 */}

        {next === 0 && (
          <SignUpCtn>
            {" "}
            <SignUpHeader>
              <Arrow onClick={() => navigate("/")} />
              <div>회원가입</div>
            </SignUpHeader>
            <h3>
              아이디와 닉네임을 <br /> 입력해주세요
            </h3>
            <SignUpInput placeholder="아이디" {...register("userId")} />{" "}
            {errors.userId && (
              <small role="alert">{errors.userId.message}</small>
            )}
            <SignUpInput placeholder="닉네임" {...register("nickName")} />
            {errors.nickName && (
              <small role="alert">{errors.nickName.message}</small>
            )}
            <NextBtn onClick={() => setNext(1)}>다음</NextBtn>
          </SignUpCtn>
        )}
        {next === 1 && (
          <SignUpCtn>
            <SignUpHeader>
              <Arrow onClick={() => setNext(0)} />
              <div>회원가입</div>
            </SignUpHeader>
            <h3>비밀번호를 입력해주세요</h3>
            <SignUpInput
              placeholder="비밀번호"
              type="password"
              {...register("password")}
            />
            {errors.password && (
              <small role="alert">{errors.password.message}</small>
            )}

            <SignUpInput
              placeholder="비밀번호확인"
              type="password"
              {...register("confirm")}
            />
            {errors.confirm && (
              <small role="alert">{errors.confirm.message}</small>
            )}

            <NextBtn onClick={() => setNext(2)}>다음</NextBtn>
          </SignUpCtn>
        )}

        {next === 2 && (
          <>
            <SignUpCtn>
              <SignUpHeader>
                <Arrow onClick={() => setNext(1)} />
                <div>회원가입</div>
              </SignUpHeader>
              <RowBox className="column">
                <h3>추가정보를 입력해주세요</h3> <div>성별</div>
              </RowBox>

              <RowBox>
                <label htmlFor="female">남자</label>
                <InputBirth
                  id="female"
                  type="radio"
                  defaultValue="female"
                  value={"female"}
                  {...register("gender")}
                ></InputBirth>

                <label htmlFor="male">여자</label>
                <InputBirth
                  id="male"
                  type="radio"
                  value={"male"}
                  {...register("gender")}
                ></InputBirth>
              </RowBox>
              <SignUpInput
                className="Birth1"
                placeholder="나이를 입력해주세요"
                {...register("birth")}
              />
              <SignUpInput
                placeholder="거주하시는 주소를 입력"
                type="text"
                onClick={postCode}
                {...register("address")}
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
            <NextBtn>완료</NextBtn>
          </>
        )}
      </SignUpWrap>{" "}
    </>
  );
};
const SignUpWrap = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  width: 100%;
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

export default SignUp;
