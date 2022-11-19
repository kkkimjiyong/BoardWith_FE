import { style } from "@mui/system";
import React, { useState } from "react";
import AvatarBox from "./AvatarBox";
import styled from "styled-components";

const AvatarSelect = () => {
  //*초기 카테고리는 눈으로 고정
  const [selectCategory, SetSelectCategory] = useState("Eye");

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
  console.log(userSelect);
  return (
    <Wrap>
      <AvatarBox userSelect={userSelect} />
      <AvatarSelectCtn>
        <AvatarCategory>
          <div
            className={selectCategory === "Eye" ? "selected" : undefined}
            onClick={() => SetSelectCategory("Eye")}
          >
            눈
          </div>
          <div
            className={selectCategory === "Mouth" ? "selected" : undefined}
            onClick={() => SetSelectCategory("Mouth")}
          >
            입
          </div>
          <div
            className={selectCategory === "Hair" ? "selected" : undefined}
            onClick={() => SetSelectCategory("Hair")}
          >
            머리
          </div>
          <div
            className={selectCategory === "Back" ? "selected" : undefined}
            onClick={() => SetSelectCategory("Back")}
          >
            배경
          </div>
        </AvatarCategory>
        <AvatarItemCtn>
          {ImgList.map((Img) => {
            if (Img.Category == selectCategory)
              return (
                <ImgItem
                  onClick={() =>
                    setUserSelect({ ...userSelect, [Img.Category]: Img.Num })
                  }
                >
                  {Img.Category}_{Img.Num}
                </ImgItem>
              );
          })}
        </AvatarItemCtn>
      </AvatarSelectCtn>
    </Wrap>
  );
};

const Wrap = styled.div``;

const AvatarSelectCtn = styled.div`
  width: 100%;
  height: 60%;
  border: 2px solid black;
`;

const AvatarCategory = styled.div`
  display: flex;
  align-items: center;
  height: 20%;
  justify-content: space-around;
  color: gray;
  font-size: 2rem;
  font-weight: 600;
  .selected {
    color: black;
    font-size: 2.1rem;
    text-decoration: underline;
  }
`;

const AvatarItemCtn = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  gap: 10px;
  height: 80%;
  background-color: #ddd;
`;

const ImgItem = styled.div`
  width: 30%;
  height: 30%;
  background-color: white;
`;

export default AvatarSelect;
