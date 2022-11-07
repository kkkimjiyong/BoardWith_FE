import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../../style/Layout";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useInput from "../../hooks/UseInput";
import { acyncCreatePosts } from "../../redux/modules/postsSlice";
import { useRef } from "react";
import ReactDaumPost from "react-daumpost-hook";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Calender from "../../tools/datePicker";

function Form() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formSchema = yup.object({
    title: yup.string(),
    content: yup.string(),
    location: yup.string(),
    cafe: yup.string(),
    date: yup.string(),
    map: yup.string(),
    partyMember: yup.number(),
  });

  const onSubmit = (data) => {
    console.log(data);
    dispatch(acyncCreatePosts(data));
  };
  //useForm 설정
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });

  const ref = useRef(null);
  const postConfig = {
    ref: ref, //팝업창으로 사용시 해당 파라메터를 없애면 된다.
    onComplete: (data) => {
      // 데이터를 받아와서 set해주는 부분
      setValue("map", data.address);
      // 검색후 해당 컴포넌트를 다시 안보이게 하는 부분
      ref.current.style.display = "none";
    },
  };

  const postCode = ReactDaumPost(postConfig);

  // const [calenderDate, setCalenderDate] = useState("");

  // const parentFunction = (x) => {
  //   setCalenderDate(x);
  // };
  // useEffect(() => {
  //   setFiltered({ ...filtered, date: calenderDate });
  // }, [calenderDate]);

  return (
    <>
      <Wrap>
        <Formbox onSubmit={handleSubmit(onSubmit)}>
          <Inputbox>
            <FlexBox>
              <LabelBox>제목</LabelBox>
              <InputBox {...register("title")} />
            </FlexBox>
            <FlexBox>
              <LabelBox>내용</LabelBox>
              <InputBox {...register("content")} />
            </FlexBox>
            <FlexBox>
              <LabelBox>지역</LabelBox>
              <InputBox {...register("location")} />
            </FlexBox>
            <FlexBox>
              <LabelBox>카페</LabelBox>
              <InputBox {...register("cafe")} />
            </FlexBox>
            <FlexBox>
              <LabelBox>날짜</LabelBox>
              <Calender register={register} {...register("date")} />
            </FlexBox>
            <FlexBox>
              <LabelBox>시간</LabelBox>
              <InputBox {...register("time")} />
            </FlexBox>
            <FlexBox>
              <LabelBox>지도</LabelBox>
              <InputBox onClick={postCode} {...register("map")} />

              <DaumPostBox ref={ref}></DaumPostBox>
            </FlexBox>{" "}
            <FlexBox>
              <LabelBox>인원</LabelBox>
              <InputBox {...register("partyMember")} />
            </FlexBox>
          </Inputbox>{" "}
          <Buttonbox>
            <Button
              onClick={() => {
                reset();
              }}
            >
              초기화하기
            </Button>
            <Button
            // onClick={() => {
            //   onclickSubmitHandler();
            // }}
            // disabled={inputs.content === "" || inputs.title === ""}
            >
              작성완료
            </Button>
          </Buttonbox>
        </Formbox>
      </Wrap>
    </>
  );
}
export default Form;

const Wrap = styled.div`
  width: 640px;
  margin: 30px auto;
  border: 2px solid black;
  border-radius: 15px;
  background-color: wheat;
`;

const Formbox = styled.form`
  padding: 20px;
  background: transparent;
  border-radius: 10px;
  display: flex;
`;

const LabelBox = styled.label`
  margin-bottom: 10px;
  font-weight: bold;
  font-size: larger;
`;

const Inputbox = styled.div`
  padding: 10px;
  background: transparent;
  border-radius: 10px;
  display: flex;
  width: 80%;
  flex-direction: column;
`;

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

const InputBox = styled.input`
  padding: 20px;
  background: ghostwhite;
  border-radius: 10px;
  border: 1px solid #666;
  background-color: white;
`;

const Buttonbox = styled.div`
  display: flex;
`;
const Button = styled.button`
  display: flex;
  margin: 0 auto;
`;

const DaumPostBox = styled.div`
  position: absolute;
  box-shadow: 0px 3px 3px 0px gray;
  top: 450px;
  left: 940px;
  width: 400px;
`;
