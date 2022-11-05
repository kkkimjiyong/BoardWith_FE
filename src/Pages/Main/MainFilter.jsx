import styled from "styled-components";
import { useState } from "react";

const MainFilter = () => {
  const [open, setOpen] = useState();
  const [filtered, setFiltered] = useState({
    date: "",
    time: "",
    location: "",
  });

  const filterSumitHandler = () => {};
  return (
    <Wrap open={open}>
      <div
        className="innerDiv"
        onClick={() => {
          setOpen((open) => !open);
        }}
      >
        {open ? "필터 내리기 click!" : "필터 보기 click!"}
      </div>
      <div>
        <Contentbox>
          <ContentForm
            onSubmit={(e) => {
              e.preventDefault();
              filterSumitHandler(filtered);
            }}
          >
            <SlideLabel>원하는 모임의 종류를 선택해주세요</SlideLabel>
            <ContentInput
              value={filtered.comment}
              type="text"
              name="날짜"
              placeholder="날짜"
              onChange={(e) => {
                const { value } = e.target;
                setFiltered({
                  ...filtered,
                  date: value,
                });
              }}
            />
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
          </ContentForm>
        </Contentbox>
      </div>
    </Wrap>
  );
};

export default MainFilter;

const Wrap = styled.div`
  max-width: 640px;
  margin: 0 auto;
  padding: 10px;
  width: 100%;
  background-color: white;
  height: ${({ open }) => (open ? "300px" : "30px")};
  position: absolute;
  bottom: 0;
  left: 0;
  transition: height 400ms ease-in-out;

  .innerDiv {
    position: fixed;
    width: 30px;
    border-radius: 40px;
    background-color: wheat;
    height: 10px;
    line-height: 30px;
    color: black;
    text-align: center;
  }
  overflow: scroll;
`;

const Contentbox = styled.div`
  background-color: gray;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0;
`;

const ContentForm = styled.div`
  background-color: red;
  display: flex;
  margin-top: 70px;
  justify-content: space-evenly;
`;

const ContentInput = styled.div`
  border: 2px solid green;
  border-radius: 5px;
  height: 20px;
  input:focus {
    outline: none;
  }
`;

const ContentButton = styled.div`
  background-color: purple;
  width: 200px;
  height: 26px;
  border: none;
  border-radius: 5px;

  button:hover {
    cursor: pointer;
  }
`;

const SlideLabel = styled.h3``;
