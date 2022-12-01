import { style } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import AvatarBox from "./AvatarBox";
import styled from "styled-components";
import { BiRefresh } from "@react-icons/all-files/bi/BiRefresh";
import { ImCoinDollar } from "@react-icons/all-files/im/ImCoinDollar";
import { BsPencil } from "@react-icons/all-files/bs/BsPencil";
import { ImgList } from "./AvatarList";
import axios from "axios";
import { userApi } from "../../instance";
import Loading from "../../style/Loading";

const AvatarSelect = () => {
  //*초기 카테고리는 눈으로 고정
  const [selectCategory, SetSelectCategory] = useState("Eye");
  const [select, setSelect] = useState({ Eye: 1, Mouth: 1, Hair: 1, Back: 1 });
  //? ----------------  드래그슬라이드 기능  ---------------------
  const dragRef = useRef(null);
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState();
  const [point, setPoint] = useState();
  const [userSelect, setUserSelect] = useState();
  const [initialuserSelect, setInitialUserSelect] = useState();
  const [isLoading, setIsLoading] = useState(true);

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
      dragRef.current.scrollLeft = startX - e.pageX;
    }
  };

  //? ----------------  과도한 드래그이벤트로 쓰로틀 구현 -----------------

  const throttle = (func, ms) => {
    let throttled = false;
    return (a) => {
      if (!throttled) {
        throttled = true;
        setTimeout(() => {
          func(a);
          throttled = false;
        }, ms);
      }
    };
  };

  const onThrottleDragMove = throttle(onDragMove, 50);

  //? ------------------아바타 API  ----------------------

  const postAvatar = async () => {
    try {
      const { data } = await userApi.editUser({ userAvater: userSelect });
      console.log(data.findUserData.userAvater);
      setUserSelect(data.findUserData.userAvater);
      setInitialUserSelect(data.findUserData.userAvater);
    } catch (error) {
      console.log(error);
    }
  };
  const getUser = async () => {
    try {
      const { data } = await userApi.getUser();
      setUserSelect(data.findUser.userAvater);
      setInitialUserSelect(data.findUser.userAvater);
      setPoint(data.findUser.point);
      setTimeout(() => setIsLoading(false), 1000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  console.log(userSelect);

  //! 이런식으로 user avatar가 db에 저장되면 된다!

  const selectController = (Img) => {
    setUserSelect({
      ...userSelect,
      [Img.Category]: Img.Num,
    });
    setSelect({ Num: Img.Num, Category: Img.Category });
  };
  console.log(select);
  //! --------------  포인트차감 로직  --------------------
  // const { Eye, Mouth, Back, Hair } = userSelect;
  // const { newEye, newMouth, newBack, newHair } = initialuserSelect;
  // if (Eye !== newEye) {
  //   setPoint((prev) => prev + 1000);
  // }
  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <Wrap>
        <AvatarHeader>
          <div></div>
          <div>캐릭터</div>
          <BsPencil size="41%" className="postBtn" />
        </AvatarHeader>
        <AvatarBox userSelect={userSelect} select={select} />
        <PointBox>
          <ImCoinDollar />
          {point}
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
                    <ImgItemCtn
                      className={
                        select.Num == Img.Num &&
                        select.Category == Img.Category &&
                        "selected"
                      }
                    >
                      <ImgItem
                        src={`/avatar/${Img.Category}/${Img.Category}${Img.Num}.svg`}
                        onClick={() => selectController(Img)}
                      />
                      <div className="point">
                        <ImCoinDollar />
                        1000
                      </div>
                    </ImgItemCtn>
                  );
              })}{" "}
            </AvatarItemListCtn>

            <AvatarBtnSet>
              <ChangeBtn
                //* 사진 다 집어넣으면 axios만 넣어주기
                onClick={postAvatar}
              >
                변경하기
              </ChangeBtn>
              <ResetBtn onClick={() => setUserSelect(initialuserSelect)}>
                <BiRefresh size="35" />
                초기화
              </ResetBtn>
            </AvatarBtnSet>
          </AvatarItemCtn>{" "}
        </AvatarSelectCtn>
      </Wrap>
    );
  }
};

const Wrap = styled.div`
  position: relative;
  margin: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  overflow-x: hidden;
`;

const AvatarHeader = styled.div`
  z-index: 10;
  position: relative;
  color: #2e294e;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 7vh;
  font-size: 1.5rem;
  color: var(--white);
  background-color: var(--black);
  .postBtn {
    position: absolute;
    right: -15%;
  }
`;
const PointBox = styled.div`
  position: absolute;
  color: var(--white);
  font-size: 1.5rem;
  top: 10%;
  left: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ddd;
  border-radius: 50px;
  padding: 2%;
  background-color: var(--primary);
`;

const AvatarSelectCtn = styled.div`
  z-index: 10;
  height: 50vh;
  background-color: var(--black);
`;

const AvatarBtnSet = styled.div`
  width: 100%;
  gap: 20px;
  padding: 10% 0%;
  justify-content: center;
  display: flex;
  height: 30%;
`;
const ChangeBtn = styled.button`
  font-size: 24px;
  font-weight: 500;
  border-radius: 50px;
  width: 60%;
  border: none;
  color: var(--white);
  background-color: var(--primary);
`;

const ResetBtn = styled.button`
  font-size: 24px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  width: 30%;
  border: none;
  color: var(--white);
  background-color: var(--gray);
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
  border-bottom: 2px solid var(--gray);
  &.selected {
    border-bottom: 2px solid var(--primary);
  }
`;

const AvatarItemCtn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
  width: 100%;
  height: 100%;
`;

const AvatarItemListCtn = styled.div`
  display: flex;
  padding: 16px 0px;
  height: 60%;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ImgItem = styled.img`
  border-radius: 30px;
  height: 100%;
  background-color: white;
`;
const ImgItemCtn = styled.div`
  color: var(--white);
  margin-left: 7%;
  border-radius: 30px;
  height: 90%;
  background-color: var(--white);
  &.selected {
    border: 7px solid var(--primary);
  }
  .point {
    display: flex;
    justify-content: center;
    width: 100%;
    align-items: center;
    font-size: 24px;
    margin-top: 5%;
  }
`;

export default AvatarSelect;
