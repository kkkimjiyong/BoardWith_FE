import styled from "styled-components";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import Slider from "@mui/material/Slider";
import { seoulGu, timeSelect } from "../../tools/select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationPin } from "@fortawesome/free-solid-svg-icons";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TextField } from "@mui/material";
import { date } from "yup";

const MainFilter = ({
  items,
  setItems,
  getData,
  setTargetMargin,
  targetMargin,
}) => {
  const [open, setOpen] = useState();
  //시작 날짜 받기
  const onDateChange = (date) => {
    filtered.date = date;
    filtered.time[0].setFullYear(date.getYear());
    filtered.time[1].setFullYear(date.getYear());
    setFiltered({
      ...filtered,
    });
  };
  //시작 시간 받기
  const onTimeChange1 = (e) => {
    const { value } = e.target;
    filtered.time[0].setHours(value.split(":")[0]);
    setFiltered({
      ...filtered,
    });
  };
  //종료 시간 받기
  const onTimeChange2 = (e) => {
    const { value } = e.target;
    filtered.time[1].setHours(value.split(":")[0]);
    setFiltered({
      ...filtered,
    });
  };
  //map 값 변환
  const onChange = (e) => {
    const { name, value } = e.target;
    setFiltered({
      ...filtered,
      [name]: value,
    });
  };

  const seoulGu = [
    { value: "강남구", label: "강남구" },
    { value: "강동구", label: "강동구" },
    { value: "강북구", label: "강북구" },
    { value: "강서구", label: "강서구" },
    { value: "관악구", label: "관악구" },
    { value: "광진구", label: "광진구" },
    { value: "구로구", label: "구로구" },
    { value: "금천구", label: "금천구" },
    { value: "노원구", label: "노원구" },
    { value: "도봉구", label: "도봉구" },
    { value: "동대문구", label: "동대문구" },
    { value: "동작구", label: "동작구" },
    { value: "마포구", label: "마포구" },
    { value: "서대문구", label: "서대문구" },
    { value: "서초구", label: "서초구" },
    { value: "성동구", label: "성동구" },
    { value: "성북구", label: "성북구" },
    { value: "송파구", label: "송파구" },
    { value: "양천구", label: "양천구" },
    { value: "영등포구", label: "영등포구" },
    { value: "용산구", label: "용산구" },
    { value: "은평구", label: "은평구" },
    { value: "종로구", label: "종로구" },
    { value: "중구", label: "중구" },
    { value: "중랑구", label: "중랑구" },
  ];
  // console.log("timefilter", new Date("1970-01-01"));
  const [filtered, setFiltered] = useState({
    time: [new Date("1970-01-01"), new Date("9999-12-31")],
    date: new Date(),
    partyMember: [2, 4],
    map: "구",
  });

  const filteredItems = items?.filter(
    (item) =>
      filtered.time[0] <= new Date(item.time) &&
      new Date(item.time) <= filtered.time[1] &&
      filtered.partyMember[0] <= item.partyMember &&
      item.partyMember <= filtered.partyMember[1]
    // item.map.includes(filtered.map)
  );
  // console.log(items);
  //필터 선택하기
  const filterhandler = () => {
    setItems(filteredItems);
    if (filteredItems.length < 5) {
      setTargetMargin((5 - filteredItems.length) * 200);
    }
  };

  //양방향 인원 체크
  function valuetext(value) {
    return `${value}`;
  }

  const minDistance = 1;

  const [value2, setValue2] = useState([3, 6]);

  const handleChange2 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 10 - minDistance);
        setValue2([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue2([clamped - minDistance, clamped]);
      }
    } else {
      setValue2(newValue);
      setFiltered({
        ...filtered,
        partyMember: newValue,
      });
    }
  };

  return (
    <Wrap open={open}>
      <div
        className="innerDiv"
        onClick={() => {
          setOpen((open) => !open);
        }}
      ></div>
      <div>
        <Contentbox>
          <ContentLabel>위치</ContentLabel>
          <LocationSelect
            name="map"
            size={1}
            onChange={onChange}
            defaultValue={seoulGu[0]}
            placeholder="지역"
          >
            {seoulGu.map((location) => {
              return (
                <option key={location.label} value={location.value}>
                  {location.label}
                </option>
              );
            })}
          </LocationSelect>

          <ContentLabel>날짜</ContentLabel>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
              name="time"
              inputFormat={"yyyy-MM-dd"}
              mask={"____-__-__"}
              onChange={onDateChange}
              value={filtered.date}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

          <ContentLabel>시간</ContentLabel>
          <div>
            <TimeSelect
              name="time"
              size={1}
              onChange={onTimeChange1}
              defaultValue={timeSelect[0].label}
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
              name="time"
              size={1}
              onChange={onTimeChange2}
              defaultValue={timeSelect[23].label}
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

          <ContentLabel>인원</ContentLabel>

          <InputBox>
            <MemberSlider
              style={{ marginTop: "50px", color: "black" }}
              getAriaLabel={() => "Minimum distance shift"}
              value={value2}
              onChange={handleChange2}
              valueLabelDisplay="on"
              getAriaValueText={valuetext}
              disableSwap
              min={1}
              max={10}
            />
          </InputBox>

          <ContentButton onClick={filterhandler}>파티보기</ContentButton>
        </Contentbox>
      </div>
    </Wrap>
  );
};

export default MainFilter;

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
  display: flex;
  flex-direction: column;
  max-width: 820px;
  padding: 10px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  width: 100%;
  background-color: white;
  height: ${({ open }) => (open ? "600px" : "80px")};
  width: 100vw;
  background-color: #dddddd;

  /* height: ${({ open }) => (open ? "500px" : "80px")}; */

  /* height: ${({ open }) => (open ? "500px" : "0px")}; */

  position: fixed;
  bottom: 0;
  left: 0%;

  transition: height 400ms ease-in-out;
  .innerDiv {
    position: absolute;
    width: 30%;
    left: 35%;
    height: 10px;
    border-radius: 40px;
    background-color: black;
    line-height: 30px;
    color: black;
    text-align: center;
  }
`;

const Contentbox = styled.div`
  border: 1px solid black;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  padding: 30px 40px;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentButton = styled.button`
  background-color: lightgray;
  color: white;
  font-size: 18px;
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 20px;

  button:hover {
    cursor: pointer;
  }
`;

const ContentLabel = styled.label`
  font-weight: 800;
`;

const LocationSelect = styled.select`
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  .option {
    width: 80%;
  }
`;

const DateSelect = styled.div`
  .react-datepicker {
    display: block;
    width: 100%;
    border-radius: 10px;
  }
`;

const TimeSelect = styled.select`
  width: 48%;
  padding: 10px;
  border-radius: 10px;
  :first-child {
    margin-right: 4%;
  }
`;
