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
import { Controller } from "react-hook-form";
import Datepicker from "react-datepicker";
import axios from "axios";
import { getCookie } from "../../hooks/CookieHook";
import { useForm } from "react-hook-form";
import Slider from "@mui/material/Slider";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TextField } from "@mui/material";
import { timeSelect } from "../../tools/select";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const { kakao } = window;
function Form({ setFormModalOpen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [location, Setlocation] = useState();
  const [ModalOpen, setModalOpen] = useState(false);

  //카카오 Map API
  var geocoder = new kakao.maps.services.Geocoder();

  const formSchema = yup.object({
    title: yup.string().required("제목을 입력해주세요 😰"),
    content: yup.string().max(25, "내용은 25자 이내로 입력해주세요"),
    location: yup.string(),
    cafe: yup.string(),
    date: yup.string(),
    map: yup.string(),
    partyMember: yup.number(),
  });

  const onSubmit = (data) => {
    //사용자가 검색한 값의 두번째 추출 => 지역구
    //location 키값으로 좌표값을 객체로 전송

    data.fullday.setMinutes(0);
    data.fullday.setSeconds(0);
    data.fullday.setMilliseconds(0);
    let startTime = new Date(data.fullday);
    let endTime = new Date(data.fullday);
    startTime.setHours(data.startTime.split(":")[0]);
    endTime.setHours(data.endTime.split(":")[0]);

    // console.log(startTime.toISOString());
    // console.log(endTime.toISOString());
    console.log("submit", {
      title: data.title,
      content: data.content,
      partyMember: data.partyMember,
      date: "임시",
      cafe: data.cafe,
      location: location,
      map: data.cafe.split(" ")[1],
      time: [startTime.toISOString(), endTime.toISOString()],
    });
    creatPost({
      title: data.title,
      content: data.content,
      partyMember: data.partyMember,
      date: "임시",
      cafe: data.cafe,
      location: location,
      map: data.cafe.split(" ")[1],
      time: [startTime.toISOString(), endTime.toISOString()],
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
      alert("파티모집글 작성이 완료되었습니다.");
      navigate("/main");
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
    resolver: yupResolver(formSchema),
    defaultValues: { partyMember: "10" },
  });

  // console.log(location);
  // console.log(errors);
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
  // console.log(watch());

  return (
    <BackGroudModal>
      {/* <Layout> */}
      <Wrap>
        <div>
          <Sth onClick={() => setFormModalOpen(false)}>
            <FontAwesomeIcon
              style={{
                color: "black",
              }}
              size="1x"
              icon={faX}
              cursor="pointer"
            />
          </Sth>{" "}
          <FormHeader>새로운 파티</FormHeader>
        </div>

        <Formbox onSubmit={handleSubmit(onSubmit)}>
          <Inputbox>
            <FlexBox>
              <LabelBox>제목</LabelBox>
              <InputBox {...register("title")} />
            </FlexBox>
            <FlexBox>
              <LabelBox>내용</LabelBox>
              <TextareaBox
                style={{
                  height: "80px",
                }}
                maxLength={50}
                {...register("content")}
              />
              {errors.content && (
                <small role="alert">{errors.content.message}</small>
              )}
            </FlexBox>
            <FlexBox>
              <LabelBox>날짜</LabelBox>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Controller
                  control={control}
                  name="fullday"
                  render={({ field: { onChange, value } }) => (
                    <MobileDatePicker
                      inputFormat={"yyyy-MM-dd"}
                      mask={"____-__-__"}
                      value={value}
                      onChange={onChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  )}
                />
              </LocalizationProvider>
            </FlexBox>{" "}
            <FlexBox>
              <LabelBox>시간</LabelBox>
              <div>
                <TimeSelect
                  name="startTime"
                  size={1}
                  defaultValue={timeSelect[0].value}
                  {...register("startTime")}
                >
                  {timeSelect.map((time) => {
                    return (
                      <option key={time.label} value={time.value}>
                        {time.label}
                      </option>
                    );
                  })}
                </TimeSelect>
                <TimeSelect
                  name="endTime"
                  size={1}
                  // onChange={onChange}
                  defaultValue={timeSelect[23].value}
                  {...register("endTime")}
                >
                  {timeSelect.map((time) => {
                    return (
                      <option key={time.label} value={time.value}>
                        {time.label}
                      </option>
                    );
                  })}
                </TimeSelect>
              </div>
            </FlexBox>
            <FlexBox>
              <LabelBox>인원</LabelBox>

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
            <Button>작성완료</Button>
          </Buttonbox>
        </Formbox>
      </Wrap>
      {/* </Layout> */}
    </BackGroudModal>
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
  height: 100vh;
  margin: 30px auto;
  background-color: white;
  z-index: 999;
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
  font-size: medium;
`;

const Inputbox = styled.div`
  padding: 10px;
  background: transparent;
  border-radius: 10px;
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-top: 10px;
`;

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  :first-child {
    margin-top: 30px;
  }
`;

const InputBox = styled.input`
  padding: 10px;
  background: ghostwhite;
  border-radius: 10px;
  border: 1px solid #666;
  background-color: white;
`;

const TextareaBox = styled.textarea`
  padding: 10px;
  background: ghostwhite;
  border-radius: 10px;
  border: 1px solid #666;
  background-color: white;
`;

const Buttonbox = styled.div`
  width: 100%;
  display: inline-flex;
  background-color: lightgray;
  padding: 10px;
`;
const Button = styled.button`
  width: 90%;
  display: flex;

  background-color: white;
  justify-content: center;
  margin: 0 auto;
  padding: 10px;
  border-radius: 20px;
  border: none;
`;

const DaumPostBox = styled.div`
  position: relative;
  box-shadow: 0px 3px 3px 0px gray;
  width: 400px;
`;
const TimeSelect = styled.select`
  width: 48%;
  padding: 10px;
  border-radius: 10px;
  :first-child {
    margin-right: 4%;
  }
`;

const StContainers = styled.div`
  position: fixed;
  z-index: 20;
  box-sizing: border-box;
  display: block;
  width: 100%;
  height: 100%;
`;
const StBackGroundColor = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10;
`;

const BackGroudModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  /* position: fixed;
  left: 50%;
  top: 50vh;
  transform: translate(-50%, -50%);
  border-radius: 12px;
  z-index: 42;
  display: block; */
`;
const Sth = styled.div`
  z-index: 50;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 4%;
  left: 9%;
  color: white;
  font-size: 20px;
  margin-bottom: 10px;
`;
const FormHeader = styled.div`
  position: absolute;
  left: 50%;
  top: 5%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: space-between;

  align-items: center;
`;
