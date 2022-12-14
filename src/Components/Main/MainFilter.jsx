import styled from "styled-components";
import { useState } from "react";
import Slider from "@mui/material/Slider";
import { timeSelect } from "../../tools/select";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TextField } from "@mui/material";
import axios from "axios";
import { postsApi } from "../../instance";
import { seoulGu, endStatus } from "../../tools/select";

const MainFilter = ({ setFilteredItems, setItems, open, setOpen }) => {
  //시작 날짜 받기
  const onDateChange = (date) => {
    filtered.time[0].setFullYear(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    filtered.time[1].setFullYear(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    filtered.date = date;
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

  const time1 = new Date();
  time1.setHours(0);
  time1.setMinutes(0);
  time1.setSeconds(0);

  const time2 = new Date();
  time2.setHours(23);
  time2.setMinutes(0);
  time2.setSeconds(0);

  const [filtered, setFiltered] = useState({
    time: [time1, time2],
    date: new Date(),
    partyMember: [1, 10],
    map: "강남구",
    memberStatus: 0,
  });

  //양방향 인원 체크
  function valuetext(value) {
    return `${value}`;
  }

  const minDistance = 1;

  const [value2, setValue2] = useState([1, 10]);

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
      setMember(newValue);
      setValue2(newValue);
      setFiltered({
        ...filtered,
        partyMember: newValue,
      });
    }
  };

  const getFiltered = async () => {
    const response = await postsApi.filterPost(filtered);
    if (response.data.data.length > 0) {
      let statusFiltered = response.data.data.filter(
        (el) => el.memberStatus == filtered.memberStatus
      );
      console.log("statusFiltered", statusFiltered);
      setItems(statusFiltered);
      console.log();
    } else {
      setItems([]);
    }

    setFilteredItems(false);
    setOpen(!open);
  };
  const [member, setMember] = useState(value2);
  return (
    <BackGroudModal onClick={() => setOpen(!open)} open={open}>
      {" "}
      <Wrap open={open} onClick={(e) => e.stopPropagation()}>
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
              <DatePicker
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
                {timeSelect2.map((time) => {
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

            <ContentLabel>마감여부</ContentLabel>

            <LocationSelect
              name="memberStatus"
              size={1}
              onChange={onChange}
              defaultValue={endStatus[0].label}
            >
              {endStatus.map((status) => {
                return (
                  <option key={status.label} value={status.value}>
                    {status.label}
                  </option>
                );
              })}
            </LocationSelect>

            <ContentButton onClick={getFiltered}>파티보기</ContentButton>
          </Contentbox>
        </div>
      </Wrap>
    </BackGroudModal>
  );
};

export default MainFilter;

const BackGroudModal = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.4);
  height: ${({ open }) => (open ? "100%" : "0")};
  /* position: fixed;
left: 50%;
top: 50vh;
transform: translate(-50%, -50%);
border-radius: 12px;
z-index: 42;
display: block; */
`;

const DatePicker = styled(MobileDatePicker)(({ theme }) => ({
  "& input": {
    padding: "15px",
    color: "white",
    borderRadius: "10px",
    border: "1px solid white",
  },
}));

const MemberSlider = styled(Slider)({
  color: "#c72363",
  height: 8,
  "& .MuiSlider-track": {
    backgroundColor: "var(--primary)",

    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 15,
    width: 15,
    backgroundColor: "#c72363",
    border: "2px solid #c72363",
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
    backgroundColor: "#c72363",
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
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  max-width: 640px;
  padding: 10px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  width: 100%;
  background-color: var(--gray);
  color: var(--white);
  height: ${({ open }) => (open ? "800px" : "0")};

  /* height: ${({ open }) => (open ? "500px" : "80px")}; */

  /* height: ${({ open }) => (open ? "500px" : "0px")}; */

  position: absolute;
  bottom: 0;
  left: 0%;

  transition: height 400ms ease-in-out;
`;

const Contentbox = styled.div`
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
  background-color: var(--primary);
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
  font-weight: 200;
`;

const LocationSelect = styled.select`
  background-color: #484848;
  color: white;
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  .option {
    width: 80%;
  }
`;

// const DateSelect = styled.div`
//   .react-datepicker {
//     display: block;
//     width: 100%;
//     border-radius: 10px;
//   }
// `;

const TimeSelect = styled.select`
  background-color: #484848;
  color: white;
  width: 48%;
  padding: 10px;
  border-radius: 10px;
  :first-child {
    margin-right: 4%;
  }
`;
