import styled from "styled-components";
import { useState } from "react";
import DatePicker, { getDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { Datepicker, setOptions } from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";

const MainFilter = ({ items, setItems, getData }) => {
  const [open, setOpen] = useState();
  const [filtered, setFiltered] = useState({});
  console.log("items", items);
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
  const onReset = () => {
    getData();
    setFiltered({});
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

  //전체 데이터에 필터 걸기
  const filterData = () => {
    //아무 필터도 없는 맨 처음은 list가 나와야 함
    if (
      // filtered.time &&
      filtered.map ===
      // && filtered.partyMember
      undefined
    ) {
      console.log("undefined");
      return setItems(items);
    } else {
      const filteredList = items.reduce((acc, cur) => {
        const mapCondition = filtered.map ? cur.map === filtered.map : true;
        // const payNumKeywordCondition =
        //   plateNumKeyword && plateNumKeyword.length > 0
        //     ? cur.plateNum.includes(plateNumKeyword)
        //     : true;
        // const startDateCondition = startDate
        //   ? startDate.getTime() -
        //       new Date(cur.payDate.replace(/-/g, "/")).getTime() <=
        //     0
        //   : true;
        // const endDateCondition = endDate
        //   ? endDate.getTime() -
        //       new Date(cur.payDate.replace(/-/g, "/")).getTime() >=
        //     0
        //   : true;

        if (
          mapCondition
          //  &&
          // payNumKeywordCondition &&
          // startDateCondition &&
          // endDateCondition
        ) {
          acc.push(cur);
        }

        return acc;
      }, []);

      setItems(filteredList);
    }
  };
  const Member = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
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
          <ContentForm
            onSubmit={(e) => {
              e.preventDefault();
              filterData();
            }}
          >
            <SlideLabel>원하는 모임의 종류를 선택해주세요</SlideLabel>
            <ContentLabel>날짜 및 시간</ContentLabel>
            <Datepicker
              name="time"
              select="range"
              controls={["date", "time"]}
              onChange={onDateChange}
            />
            <ContentLabel>인원</ContentLabel>
            <form>
              <output htmlFor="range" id="output">
                {Member}
              </output>
              <input
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
              </datalist>
            </form>

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
            <ContentButton onClick={onReset}>초기화</ContentButton>
            <ContentButton>선택하기</ContentButton>
          </ContentForm>
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
  margin-top: 40px;
`;

const ContentForm = styled.form`
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

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
const ContentLabel = styled.label`
  font-weight: 800;
`;
