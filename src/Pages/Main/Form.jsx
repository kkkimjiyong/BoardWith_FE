import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../../style/Layout";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useInput from "../../hooks/UseInput";
import { acyncCreatePosts } from "../../redux/modules/postsSlice";
import { useRef } from "react";
import ReactDaumPost from "react-daumpost-hook";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Controller } from "react-hook-form";
import { Datepicker, setOptions } from "@mobiscroll/react";
import axios from "axios";
import { getCookie } from "../../hooks/CookieHook";
import { useForm } from "react-hook-form";
import Slider from "@mui/material/Slider";

const { kakao } = window;
function Form() {
  setOptions({
    theme: "ios",
    themeVariant: "light",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [location, Setlocation] = useState();
  //카카오 Map API
  var geocoder = new kakao.maps.services.Geocoder();

  const formSchema = yup.object({
    title: yup.string(),
    content: yup.string(),
    location: yup.string(),
    cafe: yup.string(),
    date: yup.string(),
    map: yup.string(),
    partyMember: yup.number(),
  });

  setOptions({
    theme: "ios",
    themeVariant: "light",
  });

  const onSubmit = (data) => {
    // console.log({
    //   ...data,
    //   location: JSON.stringify(location),
    //   map: data.cafe.split(" ")[1],
    // });
    const aaa = data.time.value;

    console.log("submit", {
      ...data,
      location: location,
      map: data.cafe.split(" ")[1],
      time: [data.time.value[0].getTime(), data.time.value[1].getTime()],
    });
    console.log("time", data.time.value);
    //사용자가 검색한 값의 두번째 추출 => 지역구
    //location 키값으로 좌표값을 객체로 전송
    creatPost({
      ...data,
      location: location,
      map: data.cafe.split(" ")[1],
      time: [data.time.value[0].getTime(), data.time.value[1].getTime()],
    });
  };

  //useForm 설정

  const creatPost = async (payload) => {
    try {
      const { data } = await axios.post(
        "https://www.iceflower.shop/posts",
        payload,
        {
          headers: {
            Authorization: `${getCookie("accessToken")}`,
          },
        }
      );
      console.log(payload);
      console.log(data);
    } catch (error) {}
  };

  const {
    control,
    register,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: { partyMember: "10" },
  });

  console.log(location);
  console.log(errors);
  //사용자가 검색한 값을 좌표값으로 넘겨준다.
  var callback = function (result, status) {
    if (status === kakao.maps.services.Status.OK) {
      console.log(result[0].x, result[0].y);
      Setlocation({ x: result[0].x, y: result[0].y });
    }
  };

  const ref = useRef(null);
  const postConfig = {
    onComplete: (data) => {
      // 데이터를 받아와서 set해주는 부분
      setValue("cafe", data.address);
      //받은 데이터를 좌표값으로 바꿔주는 함수도 실행
      geocoder.addressSearch(data.address, callback);
      // 검색후 해당 컴포넌트를 다시 안보이게 하는 부분
      ref.current.style.display = "none";
    },
  };

  const postCode = ReactDaumPost(postConfig);
  console.log(watch());

  return (
    <Layout>
      <Wrap>
        <Formbox onSubmit={handleSubmit(onSubmit)}>
          <Inputbox>
            <FlexBox>
              <LabelBox>제목</LabelBox>
              <InputBox {...register("title")} />
            </FlexBox>
            <FlexBox>
              <LabelBox>날짜</LabelBox>

              <Controller
                control={control}
                name="time"
                format="YYYY-MM-DD"
                render={({ field: { onChange } }) => (
                  <Datepicker
                    select="range"
                    controls={["date", "time"]}
                    onChange={(value) => {
                      onChange(value);
                    }}
                  />
                )}
              />
            </FlexBox>{" "}
            <FlexBox>
              <LabelBox>인원</LabelBox>
              {/* <Controller
                control={control}
                name="partyMember"
                format="YYYY-MM-DD"
                render={({ field: { onChange } }) => (
                  <input
                    type="range"
                    min="1"
                    max="10"
                    onChange={(e) => onChange(e.target.value)}
                  ></input>
                )}
              /> */}
              <Controller
                control={control}
                name="partyMember"
                render={({ field: { onChange } }) => (
                  <MemberSlider
                    defaultValue={10}
                    onChange={(e) => {
                      onChange(e.target.value);
                    }}
                    valueLabelDisplay="on"
                    // getAriaValueText={valuetext}
                    disableSwap
                    min={1}
                    max={10}
                    marks
                    sx={{ color: "black" }}
                  />
                )}
              />
            </FlexBox>
            <FlexBox>
              <LabelBox>지도</LabelBox>
              <InputBox onClick={postCode} {...register("cafe")} />
            </FlexBox>{" "}
            <DaumPostBox></DaumPostBox>
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
    </Layout>
  );
}
export default Form;

const MemberSlider = styled(Slider)({
  color: "black",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 15,
    width: 15,
    backgroundColor: "black",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "black",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

const Wrap = styled.div`
  width: 100%;
  margin: 30px auto;
  border-radius: 15px;
  background-color: gray;
`;

const Formbox = styled.form`
  width: 100%;
  padding: 20px;
  background: transparent;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const LabelBox = styled.label`
  margin-bottom: 10px;
  font-weight: 800;
  font-size: larger;
`;

const Inputbox = styled.div`
  padding: 10px;
  background: transparent;
  border-radius: 10px;
  display: flex;
  width: 100%;
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
  width: 100%;
  display: inline-flex;
`;
const Button = styled.button`
  width: 30%;
  display: flex;

  justify-content: center;
  margin: 0 auto;
  padding: 10px;
  border-radius: 10px;
  border: none;
`;

const DaumPostBox = styled.div`
  position: relative;
  box-shadow: 0px 3px 3px 0px gray;
  width: 400px;
`;
