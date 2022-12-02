import React from "react";
import styled from "styled-components";
import ProfileAvatarBox from "../Avatar/ProfileAvatarBox";

const RankCard = (rank, ranking) => {
  // console.log(rank);
  return (
    <Wrap key={rank.nickName}>
      <StContainer>
        <div>
          <h4>{rank?.rank?.rank}</h4>
          <StAvatar>
            <ProfileAvatarBox
              // styled={{ width: "10px" }}
              userSelect={{
                Eye: rank.rank?.userAvatar?.Eye,
                Hair: rank.rank?.userAvatar?.Hair,
                Mouth: rank.rank?.userAvatar?.Mouth,
                Back: rank.rank?.userAvatar?.Back,
              }}
            />
          </StAvatar>
          <h5>{rank?.rank?.nickName}</h5>
        </div>
        <span>{rank?.rank?.totalPoint}P</span>
      </StContainer>
    </Wrap>
  );
};
export default RankCard;

const Wrap = styled.div`
  width: 100%;
  /* height: 30%; */
`;

const StContainer = styled.div`
  background-color: var(--gray);
  font-size: 14px;
  font-weight: normal;
  color: white;
  padding: 0 10%;
  margin: 3% 3%;
  display: flex;
  align-items: center;
  border-radius: 10px;
  height: 100%;
  justify-content: space-between;
  > div {
    width: 100%;
    gap: 10px;
    display: flex;
    align-items: center;
    > h4 {
      color: var(--primary);
      margin-right: 3%;
      font-size: 14px;
      font-weight: normal;
    }
    > h5 {
      font-weight: normal;
      font-size: 14px;
    }
  }
`;

const StAvatar = styled.div`
  background-color: white;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
