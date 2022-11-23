import React from "react";
import styled from "styled-components";

const RankCard = () => {
  return (
    <Wrap>
      <StContainer>
        <div>
          <h4>순위</h4>
          <StAvatar style={{}} />
          <h5>닉네임</h5>
        </div>
        <span>1000P</span>
      </StContainer>
    </Wrap>
  );
};
export default RankCard;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
`;

const StContainer = styled.div`
  font-size: 14px;
  font-weight: normal;
  color: white;
  padding: 0 10%;
  margin: 3% 3%;
  display: flex;
  align-items: center;
  border: 2px solid #c72363;
  /* box-shadow: 0 5px 18px -7px #c47aff; */
  border-radius: 10px;
  height: 100%;
  justify-content: space-between;
  > div {
    width: 100%;
    gap: 10px;
    display: flex;
    align-items: center;
    > h4 {
      margin-right: 3%;
      font-size: 14px;
    }
    > h5 {
      font-size: 14px;
    }
  }
`;

const StAvatar = styled.div`
  border: 1px solid gray;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  background-size: cover;
  background-image: url(https://r1.community.samsung.com/t5/image/serverpage/image-id/2304962i2F7C66D1874B9309/image-size/large?v=v2&px=999);
`;
