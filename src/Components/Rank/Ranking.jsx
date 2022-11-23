import React from "react";
import styled from "styled-components";
import RankCard from "./RankCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";

const Ranking = () => {
  return (
    <Wrap>
      <StContainer>
        <h2>랭킹</h2>
        <div>
          <StTopRanker>
            <FontAwesomeIcon
              style={{
                color: "#ffeda6",
              }}
              size="lg"
              icon={faCrown}
            />
            <StAvatar />
            <span>1위</span>
            <p>닉네임</p>
            <span>9999P</span>
          </StTopRanker>
          <div>
            <StTopRanker>
              <FontAwesomeIcon
                style={{
                  color: "#bbbbbb",
                }}
                size="sm"
                icon={faCrown}
              />
              <StAvatar />
              <span>2위</span>
              <p>닉네임</p>
              <span>8888P</span>
            </StTopRanker>
            <StTopRanker>
              <FontAwesomeIcon
                style={{
                  color: "#b39b81",
                }}
                size="sm"
                icon={faCrown}
              />
              <StAvatar />
              <span>3위</span>
              <p>닉네임</p>
              <span>7777P</span>
            </StTopRanker>
          </div>
        </div>
      </StContainer>
      <RankCard />
      <RankCard />
      <RankCard />
      <RankCard />
      <RankCard />
      <RankCard />
      <RankCard />
      <RankCard />
    </Wrap>
  );
};
export default Ranking;

const Wrap = styled.div`
  margin: 3% 0 10% 0;
  color: white;
  width: 100%;
  height: 100%;
`;

const StContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  > h2 {
    color: #fff;
    text-shadow: -1px 0px #d6a4ffa1, 0px 1px #d6a4ffa1, 1px 0px #d6a4ffa1,
      0px -1px #d6a4ffa1;
  }
  > div {
    width: 100%;
    > div {
      display: flex;
      justify-content: space-evenly;
    }
  }
`;
const StAvatar = styled.div`
  border: 2px solid #d6a4ff;
  box-shadow: 0 5px 18px -7px #c47aff;
  margin-bottom: 10px;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  background-size: cover;
  background-image: url(https://r1.community.samsung.com/t5/image/serverpage/image-id/2304962i2F7C66D1874B9309/image-size/large?v=v2&px=999);
`;

const StTopRanker = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  > p {
    margin: 0;
  }
  > span {
    font-size: 12px;
  }
`;
