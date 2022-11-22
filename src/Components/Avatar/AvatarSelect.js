import { style } from "@mui/system";
import React, { useRef, useState } from "react";
import AvatarBox from "./AvatarBox";
import styled from "styled-components";
import { BiRefresh } from "react-icons/bi";
import { ImCoinDollar } from "react-icons/im";
import { BsPencil } from "react-icons/bs";

const AvatarSelect = () => {
  //*초기 카테고리는 눈으로 고정
  const [selectCategory, SetSelectCategory] = useState("Eye");

  //? ----------------  드래그슬라이드 기능  ---------------------
  const dragRef = useRef(null);
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState();
  const onDragStart = (e) => {
    e.preventDefault();
    setIsDrag(true);
    setStartX(e.pageX + dragRef.current.scrollLeft);
  };

  const onDragEnd = () => {
    setIsDrag(false);
  };

  const onDragMove = (e) => {
    if (isDrag) {
      console.log("시작위치", startX);
      dragRef.current.scrollLeft = startX - e.pageX;
      console.log("최종 스크롤위치", dragRef.current.scrollLeft);
    }
  };

  //? ----------------  과도한 드래그이벤트로 쓰로틀 구현 -----------------

  const throttle = (func, ms) => {
    let throttled = false;
    return (a) => {
      if (!throttled) {
        throttled = true;
        console.log(1);
        setTimeout(() => {
          console.log(2);
          func(a);
          throttled = false;
        }, ms);
      }
    };
  };

  const onThrottleDragMove = throttle(onDragMove, 50);

  //! 이런식으로 user avatar가 db에 저장되면 된다!
  const userAvatar = { Eye: 1, Hair: 1, Mouth: 1, Back: 1 };

  const [userSelect, setUserSelect] = useState(userAvatar);
  const ImgList = [
    { Category: "Eye", Num: 1 },
    { Category: "Mouth", Num: 1 },
    { Category: "Mouth", Num: 2 },
    { Category: "Mouth", Num: 3 },
    { Category: "Mouth", Num: 4 },
    { Category: "Mouth", Num: 5 },
    { Category: "Mouth", Num: 6 },
    { Category: "Eye", Num: 3 },
    { Category: "Back", Num: 4 },
    { Category: "Eye", Num: 1 },
    { Category: "Hair", Num: 2 },
  ];

  return (
    <Wrap>
      <AvatarHeader>
        <div>캐릭터</div>
        <BsPencil size="24" />
      </AvatarHeader>
      <AvatarBox userSelect={userSelect} />
      <PointBox>
        <ImCoinDollar />
        포인트
      </PointBox>
      <AvatarSelectCtn>
        <AvatarCategory>
          <AvatarCategoryItem
            className={selectCategory === "Eye" ? "selected" : undefined}
            onClick={() => SetSelectCategory("Eye")}
          >
            눈
          </AvatarCategoryItem>
          <AvatarCategoryItem
            className={selectCategory === "Mouth" ? "selected" : undefined}
            onClick={() => SetSelectCategory("Mouth")}
          >
            입
          </AvatarCategoryItem>
          <AvatarCategoryItem
            className={selectCategory === "Hair" ? "selected" : undefined}
            onClick={() => SetSelectCategory("Hair")}
          >
            머리
          </AvatarCategoryItem>
          <AvatarCategoryItem
            className={selectCategory === "Back" ? "selected" : undefined}
            onClick={() => SetSelectCategory("Back")}
          >
            배경
          </AvatarCategoryItem>
        </AvatarCategory>
        <AvatarItemCtn>
          <AvatarItemListCtn
            ref={dragRef}
            onMouseDown={onDragStart}
            onMouseMove={onThrottleDragMove}
            onMouseUp={onDragEnd}
            onMouseLeave={onDragEnd}
          >
            {" "}
            {ImgList.map((Img) => {
              if (Img.Category == selectCategory)
                return (
                  <ImgItemCtn>
                    <ImgItem
                      onClick={() =>
                        setUserSelect({
                          ...userSelect,
                          [Img.Category]: Img.Num,
                        })
                      }
                    >
                      {Img.Category}_{Img.Num}
                    </ImgItem>
                    포인트
                  </ImgItemCtn>
                );
            })}{" "}
          </AvatarItemListCtn>

          <AvatarBtnSet>
            <ResetBtn>
              <BiRefresh size="24" />
              초기화
            </ResetBtn>
            <ChangeBtn>변경하기</ChangeBtn>
          </AvatarBtnSet>
        </AvatarItemCtn>{" "}
      </AvatarSelectCtn>
    </Wrap>
  );
};

const Wrap = styled.div`
  margin: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  overflow-x: hidden;
`;

const AvatarHeader = styled.div`
  color: #2e294e;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 7vh;
  background-color: #ddd;
  padding: 0px 20px 0px 43%;
`;
const PointBox = styled.div`
  position: absolute;
  top: 80px;
  left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ddd;
  border-radius: 15px;
  padding: 2px 30px;
`;

const AvatarSelectCtn = styled.div`
  height: 50vh;
  background-color: #ddd;
`;

const AvatarBtnSet = styled.div`
  width: 100%;
  gap: 20px;
  padding: 25px 0px 60px 0px;
  justify-content: center;
  display: flex;
  height: 30%;
`;
const ResetBtn = styled.button`
  font-size: 20px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  width: 30%;
  border: none;
`;
const ChangeBtn = styled.button`
  font-size: 20px;
  font-weight: 600;
  border-radius: 50px;
  width: 60%;
  border: none;
`;

const AvatarCategory = styled.div`
  display: flex;
  align-items: center;
  /* height: 20%; */
  padding: 10px 0px;
  color: gray;
  font-size: 1.5rem;
  font-weight: 600;
`;

const AvatarCategoryItem = styled.div`
  padding: 10px 20px;
  width: 30%;
  display: flex;
  justify-content: center;
  border-bottom: 2px solid gray;
  &.selected {
    border-bottom: 2px solid black;
  }
`;

const AvatarItemCtn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0 20px;
  gap: 10px;
  width: 100%;
  height: 100%;
  background-color: #ddd;
`;

const AvatarItemListCtn = styled.div`
  display: flex;
  gap: 25px;
  padding: 10px 0px;
  height: 60%;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ImgItem = styled.div`
  border: 2px solid black;
  border-radius: 30px;
  height: 100%;
  min-width: 45%;
  background-color: white;
`;
const ImgItemCtn = styled.div`
  border-radius: 30px;
  height: 90%;
  min-width: 45%;
  background-color: white;
`;

export default AvatarSelect;
