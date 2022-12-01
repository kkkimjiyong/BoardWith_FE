import React, { useEffect, useState } from "react";
import styled from "styled-components";
import RankCard from "./RankCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { rankApi } from "../../instance";
import ProfileAvatarBox from "../Avatar/ProfileAvatarBox";
import Loading from "../../style/Loading";

const Ranking = () => {
  const [rank, setRank] = useState();
  const [loading, setLoading] = useState(true);

  // for (let i = 0; i < rank.length; i++) {}

  useEffect(() => {
    rankApi.getRank().then((res) => {
      setRank(res.data.data);
    });
    setLoading(false);
  }, []);
  console.log();
  return (
    <Wrap>
      {loading ? (
        <Loading />
      ) : (
        <>
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
                <StAvatar>
                  <ProfileAvatarBox
                    userSelect={{
                      Eye: rank?.[0]?.userAvater?.Eye,
                      Hair: rank?.[0]?.userAvater?.Hair,
                      Mouth: rank?.[0]?.userAvater?.Mouth,
                      Back: rank?.[0]?.userAvater?.Back,
                    }}
                  />
                </StAvatar>
                <span>1위</span>
                <p>{rank?.[0]?.nickName}</p>
                <span>{rank?.[0]?.totalPoint}P</span>
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
                  <StAvatar>
                    <ProfileAvatarBox
                      userSelect={{
                        Eye: rank?.[1]?.userAvater?.Eye,
                        Hair: rank?.[1]?.userAvater?.Hair,
                        Mouth: rank?.[1]?.userAvater?.Mouth,
                        Back: rank?.[1]?.userAvater?.Back,
                      }}
                    />
                  </StAvatar>
                  <span>2위</span>
                  <p>{rank?.[1]?.nickName}</p>
                  <span>{rank?.[1]?.totalPoint}P</span>
                </StTopRanker>
                <StTopRanker>
                  <FontAwesomeIcon
                    style={{
                      color: "#b39b81",
                    }}
                    size="sm"
                    icon={faCrown}
                  />
                  <StAvatar>
                    <ProfileAvatarBox
                      userSelect={{
                        Eye: rank?.[2]?.userAvater?.Eye,
                        Hair: rank?.[2]?.userAvater?.Hair,
                        Mouth: rank?.[2]?.userAvater?.Mouth,
                        Back: rank?.[2]?.userAvater?.Back,
                      }}
                    />
                  </StAvatar>
                  <span>3위</span>
                  <p>{rank?.[2]?.nickName}</p>
                  <span>{rank?.[2]?.totalPoint}P</span>
                </StTopRanker>
              </div>
            </div>
          </StContainer>
          <RankCard />
        </>
      )}
    </Wrap>
  );
};
export default Ranking;

const Wrap = styled.div`
  margin: 3% 0 10% 0;
  color: white;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  overflow-y: scroll;
  //? -----모바일에서처럼 스크롤바 디자인---------------
  @media only screen and (min-width: 1200px) {
    ::-webkit-scrollbar {
      width: 15px;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #898989;
      //스크롤바에 마진준것처럼 보이게
      background-clip: padding-box;
      border: 4px solid transparent;
      border-radius: 15px;
    }
  }
`;

const StContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  /* height: 100%; */
  > h2 {
    color: #fff;
    font-size: 20px;
    font-weight: normal;
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
  margin-bottom: 10px;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StTopRanker = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  > p {
    margin: 0;
    font-size: 14px;
  }
  > span {
    font-size: 10px;
    color: #a6a6a6;
  }
`;
