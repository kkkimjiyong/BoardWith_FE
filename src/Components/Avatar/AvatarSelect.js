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
import AlertModal from "../AlertModal";

const AvatarSelect = () => {
  //*초기 카테고리는 눈으로 고정
  const [selectCategory, SetSelectCategory] = useState("Eye");
  const [select, setSelect] = useState({ Eye: 1, Mouth: 1, Hair: 1, Back: 1 });
  //? ----------------  드래그슬라이드 기능  ---------------------
  const dragRef = useRef(null);
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState();
  const [point, setPoint] = useState();
  const [initialpoint, setInitialPoint] = useState();
  const [userSelect, setUserSelect] = useState();
  const [initialuserSelect, setInitialUserSelect] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [puserSelect, setpUserSelect] = useState([]);
  const [alert, setAlert] = useState(false);
  const [content, setContent] = useState();

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

  const postAvatar = async (point) => {
    if (window.confirm(`총 ${point}가 남습니다. 구매하시겠습니까?`)) {
      setAlert(true);
      if (point < 0) {
        setContent("포인트가 부족합니다!");
        setPoint(initialpoint);
      } else {
        try {
          const { data } = await userApi.editUser({
            userAvatar: userSelect,
            point,
          });
          setUserSelect(data.findUserData.userAvatar);
          setInitialUserSelect(data.findUserData.userAvatar);
          setContent("구매 성공!");
          console.log(point);
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      setPoint(initialpoint);
    }
  };
  const getUser = async () => {
    try {
      const { data } = await userApi.getUser();
      setUserSelect(data.findUser.userAvatar);
      setInitialUserSelect(data.findUser.userAvatar);
      setPoint(data.findUser.point);
      setInitialPoint(data.findUser.point);
      setpUserSelect([
        { Category: "Eye", Num: data.findUser.userAvatar.Eye },
        { Category: "Mouth", Num: data.findUser.userAvatar.Mouth },
        { Category: "Back", Num: data.findUser.userAvatar.Back },
        { Category: "Hair", Num: data.findUser.userAvatar.Hair },
      ]);
      setTimeout(() => setIsLoading(false), 1000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const selectController = (Img) => {
    setUserSelect({
      ...userSelect,
      [Img.Category]: Img.Num,
    });
    setSelect({ Num: Img.Num, Category: Img.Category });
  };
  //! --------------  포인트차감 로직  --------------------
  const discountPoint = () => {
    let point = initialpoint;
    if (userSelect?.Eye !== initialuserSelect?.Eye) {
      point -= 300;
    }
    if (userSelect?.Mouth !== initialuserSelect?.Mouth) {
      point -= 300;
    }
    if (userSelect?.Back !== initialuserSelect?.Back) {
      point -= 300;
    }
    if (userSelect?.Hair !== initialuserSelect?.Hair) {
      point -= 300;
    }
    setPoint(point);
    return postAvatar(point);
  };

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <Wrap>
        {alert && <AlertModal setAlert={setAlert} content={content} />}
        <AvatarHeader>
          <div></div>
          <div>캐릭터</div>
          <div></div>
        </AvatarHeader>
        <AvatarCtn>
          {" "}
          <AvatarBox userSelect={userSelect} profile={false} />
        </AvatarCtn>

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
                        {puserSelect?.filter(
                          (c) => c.Category == selectCategory
                        )[0].Num == Img.Num ? (
                          "사용중"
                        ) : (
                          <>
                            <ImCoinDollar />
                            300
                          </>
                        )}
                      </div>
                    </ImgItemCtn>
                  );
              })}{" "}
            </AvatarItemListCtn>
            <AvatarBtnSet>
              <ChangeBtn onClick={discountPoint}>변경하기</ChangeBtn>
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
  height: 100%;
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
  height: 7%;
  font-size: 1.5rem;
  color: var(--white);
  background-color: var(--black);
  .postBtn {
    position: absolute;
    right: -15%;
  }
`;

const AvatarCtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40%;
  width: 100%;
  background-color: var(--white);
`;
const PointBox = styled.div`
  position: absolute;
  color: var(--white);
  font-size: 1.5rem;
  min-width: 15%;
  top: 10%;
  left: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ddd;
  border-radius: 50px;
  padding: 2%;
  background-color: var(--primary);
  .point {
    margin-left: 15%;
  }
`;

const AvatarSelectCtn = styled.div`
  z-index: 50;
  /* padding-top: 5%; */
  height: 40%;
  background-color: var(--black);
`;

const AvatarBtnSet = styled.div`
  width: 100%;
  height: 15%;
  margin-bottom: 10px;
  justify-content: center;
  display: flex;
`;
const ChangeBtn = styled.button`
  font-size: 16px;
  font-weight: 500;
  border-radius: 50px;
  margin-right: 20px;
  width: 60%;
  border: none;
  color: var(--white);
  background-color: var(--primary);
`;

const ResetBtn = styled.button`
  font-size: 16px;
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
  margin-top: 5%;
  height: 70%;
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
  height: 80%;
  background-color: var(--white);
  &.selected {
    border: 7px solid var(--primary);
  }
  .point {
    display: flex;
    justify-content: center;
    width: 100%;
    align-items: center;
    font-size: 20px;
    margin-top: 2%;
  }
`;

export default AvatarSelect;
