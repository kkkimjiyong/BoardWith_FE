import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../../style/Layout";
import { useRef } from "react";
import ReactDaumPost from "react-daumpost-hook";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import Slider from "@mui/material/Slider";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TextField } from "@mui/material";
import { timeSelect } from "../../tools/select";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { postsApi } from "../../instance";
import { postApi } from "../../instance";
import { useParams } from "react-router-dom";

const { kakao } = window;
function Modify({ setModifyModalOpen, setItem, item }) {
  const [location, Setlocation] = useState(item.location);
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

    putPost({
      postId: item._id,
      postPayload: {
        data: {
          ...item,
          title: data.title,
          content: data.content,
          partyMember: data.partyMember,
          date: "임시",
          cafe: data.cafe,
          location: location,
          map: data.cafe.split(" ")[1],
          time: [startTime.toISOString(), endTime.toISOString()],
        },
      },
    });
  };
  //useForm 설정

  const putPost = async (payload) => {
    try {
      console.log(payload);
      const { data } = await postsApi.putPost(payload);
      console.log(data);
      alert("파티모집글 수정이 완료되었습니다.");
      setItem(payload.postPayload.data);
      setModifyModalOpen(false);
      // setModalOpen(false);
    } catch (error) {}
  };

  const timeStart = item.time[0];
  const time1 = new Date(timeStart);

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
    defaultValues: {
      fullday: new Date(item.time[0]),
      partyMember: `${item.partyMember}`,
    },
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
      // 검색후 해당 컴포넌트를 다시 안보이게 하는 부분
      ref.current.style.display = "none";
      //받은 데이터를 좌표값으로 바꿔주는 함수도 실행
      geocoder.addressSearch(data.address, callback);
    },
  };

  const postCode = ReactDaumPost(postConfig);
  console.log(watch());

  return (
    <BackGroudModal>
      <Wrap>
        <div>
          <Sth
            onClick={() => {
              setModifyModalOpen(false);
            }}
          >
            <FontAwesomeIcon
              style={{
                color: "white",
              }}
              size="1x"
              icon={faX}
              cursor="pointer"
            />
          </Sth>{" "}
          <FormHeader>파티 내용 수정</FormHeader>
        </div>

        <Formbox onSubmit={handleSubmit(onSubmit)}>
          <Inputbox>
            <FlexBox>
              <LabelBox>파티명</LabelBox>
              <InputBox defaultValue={item.title} {...register("title")} />
            </FlexBox>
            <FlexBox>
              <LabelBox>내용</LabelBox>
              <TextareaBox
                style={{
                  height: "80px",
                }}
                maxLength={50}
                defaultValue={item.content}
                {...register("content")}
              />
              {errors.content && (
                <small role="alert" style={{ color: "var(--primary)" }}>
                  {errors.content.message}
                </small>
              )}
            </FlexBox>
            <FlexBox>
              <LabelBox>날짜</LabelBox>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Controller
                  control={control}
                  name="fullday"
                  render={({ field: { onChange, value } }) => (
                    <DatePicker
                      defaultValue={`${new Date(item.time[0])}`}
                      inputFormat={"yyyy-MM-dd"}
                      mask={"____-__-__"}
                      value={value}
                      onChange={onChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          inputProps={{
                            ...params.inputProps,
                            placeholder: new Date(),
                          }}
                        />
                      )}
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
                  defaultValue={`${new Date(item.time[0]).getHours()}:00`}
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
                  defaultValue={`${new Date(item.time[1]).getHours()}:00`}
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
                    defaultValue={`${item.partyMember}`}
                    onChange={(e) => {
                      onChange(e.target.value);
                    }}
                    valueLabelDisplay="on"
                    // getAriaValueText={valuetext}
                    disableSwap
                    min={1}
                    max={10}
                    sx={{ color: "var(--gray)" }}
                  />
                )}
              />
            </FlexBox>
            <FlexBox>
              <LabelBox>지도</LabelBox>
              <InputBox
                onClick={postCode}
                defaultValue={item.cafe}
                {...register("cafe")}
              />
            </FlexBox>{" "}
            <DaumPostBox ref={ref}></DaumPostBox>
          </Inputbox>{" "}
          <Buttonbox>
            <Button>수정완료</Button>
          </Buttonbox>
        </Formbox>
      </Wrap>
    </BackGroudModal>
  );
}
export default Modify;

const DatePicker = styled(MobileDatePicker)(({ theme }) => ({
  "& input": {
    padding: "15px",
    color: "white",
    backgroundColor: "var(--gray)",
    borderRadius: "10px",
  },
}));

const MemberSlider = styled(Slider)({
  color: "black",
  height: 8,
  "& .MuiSlider-track": {
    backgroundColor: "var(--primary)",

    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 15,
    width: 15,
    backgroundColor: "var(--primary)",
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
    backgroundColor: "var(--primary)",
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
  position: relative;
  width: 100%;
  height: 100%;
  margin: 30px auto;
  background-color: #212121;
  z-index: 100;
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
  color: white;
  margin-bottom: 10px;
  font-weight: 200;
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
  margin-top: 15px;
  margin-bottom: 10px;
  :first-child {
    margin-top: 30px;
  }
`;

const InputBox = styled.input`
  padding: 10px;
  background: ghostwhite;
  border-radius: 10px;
  border: none;
  color: white;
  background-color: #343434;
`;

const TextareaBox = styled.textarea`
  padding: 10px;
  background: ghostwhite;
  border-radius: 10px;
  border: none;
  color: white;
  background-color: #343434;
  resize: none;
`;

const Buttonbox = styled.div`
  width: 100%;
  display: inline-flex;
  padding: 10px;
`;
const Button = styled.button`
  width: 100%;
  display: flex;
  background-color: var(--primary);
  color: white;
  justify-content: center;
  margin: 0 auto;
  padding: 10px;
  border-radius: 20px;
  border: none;
  font-size: 18px;
`;

const DaumPostBox = styled.div`
  position: relative;
  box-shadow: 0px 3px 3px 0px gray;
  width: 400px;
`;
const TimeSelect = styled.select`
  color: white;
  background-color: #343434;
  border: none;
  width: 48%;
  padding: 15px;
  border-radius: 10px;
  :first-child {
    margin-right: 4%;
  }
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
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 2%;
  left: 5%;
  color: white;
  font-size: 20px;
  margin-bottom: 10px;
`;
const FormHeader = styled.div`
  color: white;
  position: absolute;
  left: 50%;
  top: 5%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: space-between;

  align-items: center;
`;
