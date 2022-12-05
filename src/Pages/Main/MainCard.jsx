import { useEffect, useState } from "react";
import styled from "styled-components";
import { getDistance } from "geolib";
import { useDispatch } from "react-redux";
import { addDistance } from "../../redux/modules/postsSlice";
import { useNavigate } from "react-router-dom";
import { DetailModal } from "../../Components/Detail/DetailModal";
import { postsApi } from "../../instance";
import { AiFillStar } from "@react-icons/all-files/ai/AiFillStar";
import { AiOutlineStar } from "@react-icons/all-files/ai/AiOutlineStar";
import { ImLocation } from "@react-icons/all-files/im/ImLocation";
import { AiFillCalendar } from "@react-icons/all-files/ai/AiFillCalendar";
import AvatarBox from "../../Components/Avatar/AvatarBox";
import Modify from "./Modify";

const Item = ({ number, items, Myaddress, closed, userBook }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [item, setItem] = useState(items);
  console.log(item);
  const [ModalOpen, setModalOpen] = useState();
  const [modifyModalOpen, setModifyModalOpen] = useState(false);
  //?---------------30%까지는 여유, 60&까지는 보통, 100%미만까지는 마감임박------------
  const memberStatus = ["여유", "보통", "마감임박", "마감"];
  const statusIndicator = () => {
    if (item?.confirmMember.length / item?.partyMember <= 0.3) {
      return memberStatus[0];
    }
    if (item?.confirmMember.length / item?.partyMember <= 0.6) {
      return memberStatus[1];
    }
    if (item?.confirmMember.length / item?.partyMember < 1) {
      return memberStatus[2];
    } else {
      return memberStatus[3];
    }
  };

  console.log(userBook);
  useEffect(() => {
    //*각 카드별로 현위치에서의 거리를 구한값을 넣어, 전역state값에 다시 넣어준다.
    //*부모컴포넌트에서 쓰기위해서 redux를 썻는데, 다른방법은 없나?

    if (Myaddress) {
      dispatch(
        addDistance({
          ...item,
          distance: getDistance(
            { latitude: item.location?.y, longitude: item.location?.x },
            {
              latitude: Myaddress.latitude,
              longitude: Myaddress.longitude,
            }
          ),
        })
      );
    }
  }, []);
  //요일시간 표기
  const IsoStartDate = item?.time?.[0];
  const IsoendDate = item?.time?.[1];
  const startDate = new Date(IsoStartDate);
  const endDate = new Date(IsoendDate);

  const week = ["일", "월", "화", "수", "목", "금", "토"];

  const showTime =
    ("0" + (startDate.getMonth() + 1)).slice(-2) +
    "." +
    ("0" + startDate.getDate()).slice(-2) +
    " (" +
    week[startDate.getDay()] +
    ") " +
    startDate.getHours() +
    ":00 ~ " +
    endDate.getHours() +
    ":00";

  //북마크(별) 색깔 변환
  const [starMark, setStarMark] = useState(
    userBook.includes(item._id) ? false : true
  );
  const bookMarking = async () => {
    try {
      const { data } = await postsApi.bookMarkPost({ postId: item._id });

      console.log(data);
    } catch (error) {}
  };

  const bookMark = (event) => {
    event.stopPropagation();
    setStarMark(!starMark);
    bookMarking();
  };
  console.log();
  return (
    <Wrap>
      <div
        className={!closed ? "ItemWrap" : "ClosedItemWrap"}
        onClick={() => setModalOpen(true)}
      >
        <ItemWrapBodySpaceBetween>
          <ItemProfile onClick={() => navigate(`/userpage/${item.nickName}`)}>
            <AvatarBox
              userSelect={item?.userAvatar}
              scale={0.12}
              backScale={0.8}
              circle={true}
              profile
            />
            <div className="nickNameTxt">{item?.nickName}</div>
          </ItemProfile>
          {starMark ? (
            <StarBox>
              <AiFillStar onClick={bookMark} size="80%" />
            </StarBox>
          ) : (
            <StarBox>
              <AiOutlineStar onClick={bookMark} size="80%" />
            </StarBox>
          )}
        </ItemWrapBodySpaceBetween>
        <ItemWrapBody>
          <div>
            <ItemWrapTop>{item?.title}</ItemWrapTop>
            <ItemWrapBodyFlex>
              <ImLocation size="5%" />
              <ItemWrapBodyTitle>{item?.cafe}</ItemWrapBodyTitle>
            </ItemWrapBodyFlex>

            <ItemWrapBodyFlex2>
              <ItemWrapBodyTitle>
                <AiFillCalendar
                  style={{
                    position: "relative",
                    left: "-6px",
                    top: "6px",
                    marginRight: "1%",
                  }}
                  size="5%"
                />
                {showTime}
              </ItemWrapBodyTitle>
              {!closed ? (
                <StatusBox>
                  {" "}
                  <div
                    className={
                      "status" + memberStatus.indexOf(statusIndicator())
                    }
                  ></div>{" "}
                  <div className="statusTxt">{statusIndicator()}</div>
                </StatusBox>
              ) : (
                <StatusBox>
                  {" "}
                  <div className="closedstatus"></div>{" "}
                  <div className="statusTxt">마감</div>
                </StatusBox>
              )}
            </ItemWrapBodyFlex2>
          </div>
        </ItemWrapBody>
      </div>
      {/*! 리스트에서 보여주는 디테일모달창  */}
      {ModalOpen && (
        <DetailModal
          closed={closed}
          postid={item._id}
          setItem={setItem}
          ModalOpen={ModalOpen}
          setModalOpen={setModalOpen}
          setModifyModalOpen={setModifyModalOpen}
        />
      )}
    </Wrap>
  );
};

const Wrap = styled.div`
  .ItemWrap {
    color: #d7d7d7;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    padding: 4% 4%;
    flex-direction: column;
    background-color: var(--gray);
    box-shadow: 3px 10px 10px 1px black;
    border-radius: 6px;
    margin: 5% 0%;
    :hover {
      color: white;
      /* box-shadow: 5px 5px 10px 2px #d90368; */
    }
  }

  .ClosedItemWrap {
    color: #8a8a8a;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    padding: 4% 4%;
    flex-direction: column;
    background-color: var(--black);
    box-shadow: 3px 10px 10px 1px black;
    border: 1px solid var(--primary);
    border-radius: 6px;
    margin: 5% 0%;
    :hover {
      color: var(--gray);
      /* box-shadow: 5px 5px 10px 2px #d90368; */
    }
  }
`;

const ItemWrapTop = styled.div`
  display: flex;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  /* background-color: #e2e5e7; */
  overflow-x: hidden;
  word-break: break-all;
  font-size: 1rem;
  text-align: left;
  align-items: center;
  margin-bottom: 2%;
  padding: 5px 0px;
`;

const ItemWrapBodySpaceBetween = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ItemWrapBodyFlex = styled.div`
  /* gap: 5px; */
  display: flex;
  align-items: center;
  margin-top: 2%;
`;

const ItemWrapBodyFlex2 = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2%;
  justify-content: space-between;
`;

const ItemWrapBody = styled.div`
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  text-align: left;
  margin-top: 3%;
`;

const ItemWrapBodyTitle = styled.div`
  font-size: 12px;
  border-radius: 4px;
  margin-left: 2%;
  position: relative;
`;

const StatusBox = styled.div`
  color: #2e294e;
  min-width: 20%;
  height: 30px;
  border: 1px solid #5c5c5c;
  padding: 5px 0px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  .status0 {
    width: 10px;
    height: 10px;
    display: flex;
    border-radius: 50%;
    background-color: #e2e5e7;
    white-space: nowrap;
    justify-content: center;
    padding: 0.5%;
    background-color: #05ff5b;
  }
  .status1 {
    width: 10px;
    height: 10px;
    display: flex;
    border-radius: 50%;
    background-color: #e2e5e7;
    white-space: nowrap;
    justify-content: center;
    padding: 0.5%;
    background-color: #dafe6d;
  }
  .status2 {
    width: 10px;
    height: 10px;
    display: flex;
    border-radius: 50%;
    background-color: #e2e5e7;
    white-space: nowrap;
    justify-content: center;
    padding: 0.5%;
    background-color: red;
  }
  .status3 {
    width: 10px;
    height: 10px;
    display: flex;
    border-radius: 50%;
    background-color: #e2e5e7;
    white-space: nowrap;
    justify-content: center;
    padding: 0.5%;
    background-color: gainsboro;
  }
  .statusTxt {
    margin-left: 5%;
    font-size: 12px;
    color: #aeaeae;
  }
  .closedstatus {
    width: 10px;
    height: 10px;
    display: flex;
    border-radius: 50%;
    background-color: var(--primary);
    white-space: nowrap;
    justify-content: center;
    padding: 0.5%;
  }
`;

const ItemProfile = styled.div`
  font-size: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  .nickNameTxt {
    font-weight: 600;
    margin-left: 3%;
  }
`;

const StarBox = styled.div`
  width: 10%;
  display: flex;
  justify-content: center;
`;

export default Item;
