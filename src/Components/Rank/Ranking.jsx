import React, { useEffect, useState } from "react";
import styled from "styled-components";
import RankCard from "./RankCard";
import { FaCrown } from "@react-icons/all-files/fa/FaCrown";
import { rankApi } from "../../instance";
import Loading from "../../style/Loading";
import AvatarBox from "../Avatar/AvatarBox";
import { useNavigate } from "react-router-dom";
import { userApi } from "../../instance";

const Ranking = () => {
  const [loading, setLoading] = useState(true);
  const [rank, setRank] = useState();
  const [midrank, setMidRank] = useState();
  const [myPoint, setMyPoint] = useState();
  const [myAvatar, setMyAvatar] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    rankApi.getRank().then((res) => {
      // console.log("res", res?.data?.data);
      setRank(res?.data?.data);
      setTimeout(() => setLoading(false), 500);
      setMidRank(res?.data?.data?.slice(3, 27));
    });

    rankApi.getRankMyPoint().then((res) => {
      //console.log("res", res?.data?.data?.totalPoint);
      setMyPoint(res?.data?.data?.totalPoint);
      setTimeout(() => setLoading(false), 500);

      userApi.getUser().then((res) => {
        // console.log("res", res?.data?.findUser?.userAvatar);
        setMyAvatar(res?.data?.findUser?.userAvatar);
      });
    });
  }, [loading]);
  // console.log("rank", rank);

  return (
    <Wrap>
      {loading ? (
        <Loading />
      ) : (
        <>
          <StContainer>
            <h2>랭킹</h2>
            <span
              style={{
                fontWeight: "100",
                fontSize: "15px",
                color: "#929292",
                marginBottom: "10px",
              }}
            >
              랭킹은 총 합산 포인트로 산출됩니다.
            </span>
            <div>
              <StTopRanker>
                <FaCrown
                  style={{
                    color: "#FFBD70",
                  }}
                  size="20px"
                />
                <StAvatar
                  onClick={() => navigate(`/userpage/${rank?.[0]?.nickName}`)}
                >
                  <AvatarBox
                    profile={true}
                    scale={0.2}
                    backScale={0.8}
                    circle={true}
                    userSelect={{
                      Eye: rank?.[0]?.userAvatar?.Eye,
                      Hair: rank?.[0]?.userAvatar?.Hair,
                      Mouth: rank?.[0]?.userAvatar?.Mouth,
                      Back: rank?.[0]?.userAvatar?.Back,
                    }}
                  />
                </StAvatar>
                <span>1위</span>
                <p>{rank?.[0]?.nickName}</p>
                <span>{rank?.[0]?.totalPoint} P</span>
              </StTopRanker>
              <div>
                <StTopRanker>
                  <FaCrown
                    style={{
                      color: "#C5C5C5",
                    }}
                  />
                  <StAvatar
                    onClick={() => navigate(`/userpage/${rank?.[1]?.nickName}`)}
                  >
                    <AvatarBox
                      profile={true}
                      scale={0.2}
                      backScale={0.8}
                      circle={true}
                      userSelect={{
                        Eye: rank?.[1]?.userAvatar?.Eye,
                        Hair: rank?.[1]?.userAvatar?.Hair,
                        Mouth: rank?.[1]?.userAvatar?.Mouth,
                        Back: rank?.[1]?.userAvatar?.Back,
                      }}
                    />
                  </StAvatar>
                  <span>2위</span>
                  <p>{rank?.[1]?.nickName}</p>
                  <span>{rank?.[1]?.totalPoint} P</span>
                </StTopRanker>
                <StTopRanker>
                  <FaCrown
                    style={{
                      color: "#9A6C36",
                    }}
                  />
                  <StAvatar
                    onClick={() => navigate(`/userpage/${rank?.[2]?.nickName}`)}
                  >
                    <AvatarBox
                      profile={true}
                      scale={0.2}
                      backScale={0.8}
                      circle={true}
                      userSelect={{
                        Eye: rank?.[2]?.userAvatar?.Eye,
                        Hair: rank?.[2]?.userAvatar?.Hair,
                        Mouth: rank?.[2]?.userAvatar?.Mouth,
                        Back: rank?.[2]?.userAvatar?.Back,
                      }}
                    />
                  </StAvatar>
                  <span>3위</span>
                  <p>{rank?.[2]?.nickName}</p>
                  <span>{rank?.[2]?.totalPoint} P</span>
                </StTopRanker>
              </div>
            </div>
          </StContainer>
          <StWrap>
            <StContainers>
              <div>
                <h4>my</h4>
                <StAvatars
                  onClick={() =>
                    navigate(`/userpage/${sessionStorage.getItem("nickName")}`)
                  }
                >
                  <AvatarBox
                    profile={true}
                    scale={0.15}
                    backScale={0.8}
                    circle={true}
                    // styled={{ width: "10px" }}
                    userSelect={{
                      Eye: myAvatar?.Eye,
                      Hair: myAvatar?.Hair,
                      Mouth: myAvatar?.Mouth,
                      Back: myAvatar?.Back,
                    }}
                  />
                </StAvatars>
                <h5>{sessionStorage.getItem("nickName")}</h5>
              </div>
              <span>{myPoint} P</span>
            </StContainers>
          </StWrap>
          {midrank?.map((rank) => (
            <RankCard key={rank.nickName} rank={rank} />
          ))}
        </>
      )}
    </Wrap>
  );
};
export default Ranking;

const Wrap = styled.div`
  margin: 3% 0 14% 0;
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
    font-weight: 600;
    color: #fff;
    text-shadow: 0 0 7px #d90368, 0 0 10px #d90368, 0 0 21px #fff,
      0 0 42px #d90368, 0 0 82px #d90368, 0 0 92px #d90368, 0 0 102px #d90368,
      0 0 151px #d90368;
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
  :hover {
    transform: scale(1.06);
    cursor: pointer;
  }
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
const StWrap = styled.div`
  width: 100%;
  /* height: 30%; */
`;

const StContainers = styled.div`
  border: 3px solid var(--primary);
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
  > span {
    min-width: 95px;
    color: var(--primary);
  }
  > div {
    width: 100%;
    gap: 10px;
    display: flex;
    align-items: center;
    > h4 {
      color: var(--primary);
      margin-right: 3%;
      font-size: 13px;
      font-weight: normal;
      width: 15px;
    }
    > h5 {
      font-weight: normal;
      font-size: 14px;
    }
  }
`;
const StAvatars = styled.div`
  background-color: white;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    transform: scale(1.06);
    cursor: pointer;
  }
`;
