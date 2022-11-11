import styled from "styled-components";
import { useState } from "react";
import Calender from "../../tools/datePicker";
import { useEffect } from "react";

const MainFilter = () => {
  const [open, setOpen] = useState();
  const [filtered, setFiltered] = useState({
    date: "",
    time: "",
    location: "",
  });
  console.log("filtered", filtered);
  const filterSumitHandler = () => {};

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
          {/* <InputBox> */}
          {/* <ContentInput
            // id="date"
            // className="dateInput"
            // value={filtered.comment}
            // type="date"
            // name="날짜"
            // placeholder="날짜"
            // onChange={(e) => {
            //   const { value } = e.target;
            //   setFiltered({
            //     ...filtered,
            //     date: value,
            //   });
            // }}
          /> */}
          <Calender
            setFiltered={setFiltered}
            filtered={filtered}
            value={filtered.date}
          />
          {/* </InputBox> */}

          <ContentInput
            value={filtered.filtered}
            type="text"
            name="시간"
            placeholder="시간"
            onChange={(e) => {
              const { value } = e.target;
              setFiltered({
                ...filtered,
                time: value,
              });
            }}
          />
          <ContentInput
            value={filtered.filtered}
            type="text"
            name="장소"
            placeholder="장소"
            onChange={(e) => {
              const { value } = e.target;
              setFiltered({
                ...filtered,
                lacation: value,
              });
            }}
          />
          <ContentButton>추가하기</ContentButton>
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

const ContentButton = styled.div`
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
