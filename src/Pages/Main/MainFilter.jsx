import styled from "styled-components";
import { useState } from "react";
import DatePicker, { getDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { Datepicker, setOptions } from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import Select from "react-select";

const MainFilter = ({ items, setItems, getData }) => {

  const [open, setOpen] = useState();
  const [filtered, setFiltered] = useState({});
  console.log("filtered", filtered);

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

//필터 만들 부분
  const baseData = {
    data : {
        normal : items,
        time : items.filter((data)=> data.time === filtered.time),
        partyMember : items.filter((data)=> data.partyMember === filtered.partyMember),
        map : items.filter((data)=> data.map === filtered.map),
    }
  }
  const onFilterHandler = () => {
    
    if(filtered?.time){
        setItems(baseData['data']['time']);
        console.log(baseData);
    } else if (filtered?.partyMember){
        setItems(baseData['data']['partyMember']);
        console.log(baseData);
    } else if (filtered?.map) {
        setItems(baseData['data']['map']);
        console.log(baseData);
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
          {/* <ContentForm
            onSubmit={(e) => {
              e.preventDefault();
              filterSumitHandler(filtered);
            }}
          > */}
          <SlideLabel>원하는 모임의 종류를 선택해주세요</SlideLabel>

          <Datepicker
            name="time"
            select="range"
            controls={["date", "time"]}
            onChange={onDateChange}
          />

          <input
            name="partyMember"
            type="range"
            min="1"
            max="10"
            onChange={onChange}
          ></input>

          <select
            name="map"
            size={3}
            onChange={onChange}
            defaultValue={seoulGu[0]}
          >
            {seoulGu.map((location) => {
              return <option value={location.value}>{location.label}</option>;
            })}
          </select>
          <ContentButton onClick={onFilterHandler}>추가하기</ContentButton>
          {/* </ContentForm> */}
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
  width: 100%;
  background-color: white;
  height: ${({ open }) => (open ? "300px" : "30px")};
  position: fixed;
  bottom: 0;
  left: 26%;
  transition: height 400ms ease-in-out;
  .innerDiv {
    position: absolute;
    width: 100%;
    height: 30px;
    border-radius: 40px;
    background-color: red;
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
  margin-top: 70px;
`;

// const ContentForm = styled.div`
//   margin-top: 70px;
//   justify-content: space-evenly;
// `;

const InputBox = styled.div`
  display: flex;
  width: 200px;
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
