import styled from "styled-components";
import { useState } from "react";
import DatePicker, { getDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { Datepicker, setOptions } from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import Slider from "@mui/material/Slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationPin } from "@fortawesome/free-solid-svg-icons";

const MainFilter = ({
  items,
  setItems,
  getData,
  setTargetMargin,
  targetMargin,
}) => {
  const [open, setOpen] = useState();

  const onDateChange = (e) => {
    setFiltered({
      ...filtered,
      time: e.value,
    });
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    setFiltered({
      ...filtered,
      [name]: value,
    });
  };

  setOptions({
    theme: "ios",
    themeVariant: "light",
  });

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

  const [filtered, setFiltered] = useState({
    time: [0, 99999999999],
    partyMember: "10",
    map: "구",
  });

  const filteredItems = items.filter(
    (item) =>
      filtered.time[0] < item.time < filtered.time[1] &&
      filtered.partyMember[0] < item.partyMember < filtered.partyMember[1] &&
      item.map.includes(filtered.map)
  );

  const filterhandler = () => {
    setItems(filteredItems);
    console.log(filteredItems.length);
    if (filteredItems.length < 5) {
      setTargetMargin((5 - filteredItems.length) * 200);
    }
    console.log(targetMargin);
  };

  console.log(filteredItems);

  console.log(filtered);

  // const Member = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  function valuetext(value) {
    return `${value}`;
  }

  const minDistance = 1;

  const [value2, setValue2] = useState([2, 4]);

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
         
            <SlideLabel>원하는 모임의 종류를 선택해주세요</SlideLabel>
            <ContentLabel>날짜 및 시간</ContentLabel>
            <Datepicker
              name="time"
              select="range"
              controls={["date", "time"]}
              onChange={onDateChange}
            />
            <ContentLabel>인원</ContentLabel>
            <InputBox>
              {/* <input
                className="name_box"
                style={{ color: "black" }}
                name="partyMember"
                type="range"
                min="1"
                max="10"
                onChange={onChange}
                list="tickmarks"
              ></input>
              <datalist id="tickmarks">
                <option value="0" label="1" />
                <option value="1" />
                <option value="2" />
                <option value="3" />
                <option value="4" />
                <option value="5" />
                <option value="6" />
                <option value="7" />
                <option value="8" />
                <option value="9" />
                <option value="10" />
              </datalist>{" "}
              <Output htmlFor="range" id="output">
                {Member.map((item) => (
                  <div>{item}</div>
                ))}
              </Output> */}
              {/* <Slider
                getAriaLabel={() => "Minimum distance"}
                value={value1}
                onChange={handleChange1}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                disableSwap
              /> */}
              <Slider
                style={{ marginTop: "50px" }}
                getAriaLabel={() => "Minimum distance shift"}
                value={value2}
                onChange={handleChange2}
                valueLabelDisplay="on"
                getAriaValueText={valuetext}
                disableSwap
                min={1}
                max={10}
                marks
                color="secondary"
                valueLabelFormat={(value) => {
                  return (
                    <div
                      style={{
                        position: "absolute",
                        top: "-30px",
                        left: "-3px",
                      }}
                    >
                      <FontAwesomeIcon
                        style={{ color: "black" }}
                        size="3x"
                        icon={faLocationPin}
                      ></FontAwesomeIcon>
                      <div
                        style={{
                          position: "relative",
                          bottom: "32px",
                          color: "white",
                          ZIndex: 999,
                        }}
                      >
                        {value}
                      </div>
                    </div>
                  );
                }}
                sx={{
                  color: "black",
                }}
              />
            </InputBox>

            <ContentLabel>위치</ContentLabel>

            <select
              name="map"
              size={1}
              onChange={onChange}
              defaultValue={seoulGu[0]}
            >
              {seoulGu.map((location) => {
                return <option value={location.value}>{location.label}</option>;
              })}
            </select>
            <ContentButton>선택하기</ContentButton>

        </Contentbox>
      </div>
    </Wrap>
  );
};

export default MainFilter;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 640px;
  margin: 0 auto;
  padding: 10px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  width: 100%;
  background-color: white;
  height: ${({ open }) => (open ? "450px" : "30px")};
  position: fixed;
  bottom: 0;
  left: 30%;
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
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
`;

const ContentForm = styled.form`
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const Output = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ContentInput = styled.input`
  border: 2px solid green;
  border-radius: 5px;
  width: 400px;
  height: 20px;
  input:focus {
    outline: none;
  }
`;

const ContentButton = styled.button`
  background-color: gray;
  width: 200px;
  height: 26px;
  border: none;
  border-radius: 5px;

  button:hover {
    cursor: pointer;
  }
`;

const SlideLabel = styled.div`
  // height: 200px;
`;
const ContentLabel = styled.label`
  font-weight: 800;
  margin-top: 20px;
`;
