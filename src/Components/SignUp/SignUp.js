import React from "react";
import styled from "styled-components";
import { Controller, useForm } from "react-hook-form";
import ReactDaumPost from "react-daumpost-hook";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { signUpApi } from "../../instance.js";
import { useState } from "react";

const SignUp = () => {
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
    defaultValues: { birth: "5" },
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

  const postConfig = {
    ref: ref, //팝업창으로 사용시 해당 파라메터를 없애면 된다.
    onComplete: (data) => {
      // 데이터를 받아와서 set해주는 부분
      setValue("address", data.address);
      // 검색후 해당 컴포넌트를 다시 안보이게 하는 부분
      ref.current.style.display = "none";
    },
  };
  const postCode = ReactDaumPost(postConfig);

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

  return (
    <>
      <SignUpWrap onSubmit={handleSubmit(onSubmit)}>
        <SignUpCtn>
          {" "}
          <SignUpBox>
            <SignUpInput placeholder="아이디" {...register("userId")} />{" "}
            {errors.userId && (
              <small role="alert">{errors.userId.message}</small>
            )}
          </SignUpBox>{" "}
          <SignUpBox>
            <SignUpInput placeholder="닉네임" {...register("nickName")} />
            {errors.nickName && (
              <small role="alert">{errors.nickName.message}</small>
            )}
          </SignUpBox>
          <SignUpBox>
            <SignUpInput
              placeholder="비밀번호"
              id="password"
              type="password"
              {...register("password")}
            />
            {errors.password && (
              <small role="alert">{errors.password.message}</small>
            )}
          </SignUpBox>
          <SignUpBox>
            <SignUpInput
              placeholder="비밀번호확인"
              id="confirm"
              type="password"
              {...register("confirm")}
            />
            {errors.confirm && (
              <small role="alert">{errors.confirm.message}</small>
            )}
          </SignUpBox>
        </SignUpCtn>
        <SignUpCtn>
          {" "}
          <SignUpBox className="BirthGender">
            <Controller
              control={control}
              name="birth"
              format="YYYY-MM-DD"
              render={({ field: { onChange } }) => (
                <InputRangeBox>
                  {" "}
                  <output htmlFor="range" id="output">
                    {Age[birthvalue]}
                  </output>
                  <InputRange
                    id="range"
                    oninput="output"
                    type="range"
                    min="0"
                    max="5"
                    list="tickmarks"
                    onChange={(e) => onChange(e.target.value)}
                  ></InputRange>
                  {/* 유저가 현재 선택하고 있는 값을 보여줌 */}
                  {/* value가 위치하는 곳에 눈금을 표시해주는 곳  */}
                  <datalist id="tickmarks">
                    <option value="0" />
                    <option value="1" />
                    <option value="2" />
                    <option value="3" />
                    <option value="4" />
                    <option value="5" />
                  </datalist>
                </InputRangeBox>
              )}
            />{" "}
            {/* 일단 이렇게 나이랑 성별 붙여만 놓자. */}
            <InputBirth
              type="gender"
              defaultValue="female"
              {...register("gender", { required: true, minLength: 2 })}
            >
              <option value="female">남자</option>
              <option value="male">여자</option>
            </InputBirth>
          </SignUpBox>
          <SignUpBox>
            <SignUpInput
              placeholder="거주하시는 주소를 입력"
              type="text"
              onClick={postCode}
              {...register("address")}
            />
          </SignUpBox>
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
        <SignUpBtn>가입하기</SignUpBtn>
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
`;

const SignUpCtn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const SignUpBox = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
  &.BirthGender {
    width: 62%;
    flex-direction: row;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 20px;
  }
`;
const InputRangeBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const InputRange = styled.input`
  width: 100%;
`;
const InputBirth = styled.select`
  border-radius: 5px;
  width: 40%;
  padding: 10px;
  border: 2px solid #9747ff;
`;

const SignUpInput = styled.input`
  display: block;
  width: 90%;
  padding: 0 20px;
  margin-bottom: 5px;
  height: 40px;
  border: 2px solid #9747ff;
  border-radius: 10px;
  cursor: pointer;
  &:focus-within {
    border: 3px solid #8c37ff;
  }
`;

const DaumPostBox = styled.div`
  position: relative;
  box-shadow: 0px 3px 3px 0px gray;
  width: 400px;
`;

const SignUpBtn = styled.button`
  position: fixed;
  bottom: 50px;
  font-weight: 600;
  margin-top: 90px;
  width: 80%;
  max-width: 500px;
  height: 3em;
  border: none;
  border-radius: 20px;
  box-shadow: 0px 3px 3px 0px gray;
  cursor: pointer;
  background-color: #bc8aff;
  :hover {
    background-color: #8c37ff;
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
  border: 2px solid #8c37ff;
  border-radius: 10px;
  &:focus-within {
    border: 3px solid #8c37ff;
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

export default SignUp;
