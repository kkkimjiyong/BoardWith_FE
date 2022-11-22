import { useEffect, useState } from "react";
import styled from "styled-components";
import { getDistance } from "geolib";
import { useDispatch } from "react-redux";
import { addDistance } from "../../redux/modules/postsSlice";
import { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment-timezone";
import "moment/locale/ko";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faCalendar, faStar } from "@fortawesome/free-regular-svg-icons";
import { faSplotch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { DetailModal } from "../../Components/Detail/DetailModal";

const Item = ({ number, item, Myaddress }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ModalOpen, setModalOpen] = useState();
  //?---------------30%까지는 여유, 60&까지는 보통, 100%미만까지는 마감임박------------
  const memberStatus = ["여유", "보통", "마감임박"];
  const statusIndicator = () => {
    if (item?.participant.length / item?.partyMember <= 0.3) {
      return memberStatus[0];
    }
    if (item?.participant.length / item?.partyMember <= 0.6) {
      return memberStatus[1];
    }
    if (item?.participant.length / item?.partyMember <= 1) {
      return memberStatus[2];
    }
  };
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
  const moment = require("moment-timezone");
  const startDate = item?.time?.[0];
  const endDate = item?.time?.[1];
  const getStartTime = (startDate) => {
    var m = moment(startDate).tz("Asia/Seoul").locale("ko");
    return m.format("MM.DD (ddd) HH:mm");
  };
  const getEndTime = (endDate) => {
    var m = moment(endDate).tz("Asia/Seoul");
    return m.format("HH:mm");
  };
  const realStartTime = getStartTime(startDate);
  const realEndTime = getEndTime(endDate);

  //북마크(별) 색깔 변환
  const [starMark, setStarMark] = useState(true);
  const bookMark = (event) => {
    event.stopPropagation();
    setStarMark(!starMark);
  };

  return (
    <ItemWrap>
      <div className="ItemWrap" onClick={() => setModalOpen(true)}>
        <div className="ItemWrap-Body-SpaceBetween">
          <ItemProfile>
            {" "}
            <div
              style={{
                borderRadius: "10px",
                border: "2px solid #ddd",
                width: "30px",
                height: "30px",
              }}
            ></div>
            <div>{item?.nickName}</div>
          </ItemProfile>

          <div className="ItemWrap-Top ">{item?.title}</div>
          {starMark ? (
            <div>
              <FontAwesomeIcon
                style={{
                  color: "black",
                }}
                onClick={bookMark}
                size="2x"
                icon={faStar}
              />
            </div>
          ) : (
            <div>
              {" "}
              <FontAwesomeIcon size="2x" onClick={bookMark} icon={faSplotch} />
            </div>
          )}
        </div>
        <div className="ItemWrap-Body">
          <div>
            <div className="ItemWrap-Top ">{item?.title}</div>
            <div className="ItemWrap-Body-Flex">
              <FontAwesomeIcon
                style={{
                  color: "#ddd",
                }}
                size="1x"
                icon={faCalendar}
              />{" "}
              <div className="ItemWrap-Body-Title ">{item?.cafe}</div>
            </div>

            <div className="ItemWrap-Body-Flex2">
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  gap: "5px",
                }}
              >
                {" "}
                <FontAwesomeIcon
                  style={{
                    color: "#ddd",
                  }}
                  size="1x"
                  icon={faLocationDot}
                />{" "}
                <div className="ItemWrap-Body-Title ">
                  {realStartTime + " ~ " + realEndTime}
                  {/* {new Date(startDate)} */}
                </div>
              </div>
              <StatusBox>
                {" "}
                <div
                  className={"status" + memberStatus.indexOf(statusIndicator())}
                >
                  {/* {statusIndicator()} */}
                </div>
              </StatusBox>
            </div>
          </div>
        </div>
      </div>
      {/*! 리스트에서 보여주는 디테일모달창  */}
      {ModalOpen && (
        <DetailModal
          postid={item._id}
          ModalOpen={ModalOpen}
          setModalOpen={setModalOpen}
        />
      )}
    </ItemWrap>
  );
};

const ItemWrap = styled.div`
  .ItemWrap {
    color: #d7d7d7;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    padding: 4% 4%;
    flex-direction: column;
    background-color: #2e294e;
    box-shadow: 3px 10px 10px 1px black;
    border-radius: 6px;
    margin-bottom: 5%;
    :hover {
      color: white;
      /* box-shadow: 5px 5px 10px 2px #d90368; */
    }
  }

  .ItemWrap-Top {
    display: flex;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    /* background-color: #e2e5e7; */
    font-size: 1.2rem;
    text-align: center;
    align-items: center;
    margin-bottom: 2%;
    padding: 5px 0px;
  }
  .ItemWrap-Body-SpaceBetween {
    display: flex;
    justify-content: space-between;
  }
  .ItemWrap-Body-Flex {
    gap: 5px;
    display: flex;
    align-items: center;
    margin-top: 2%;
  }
  .ItemWrap-Body-Flex2 {
    display: flex;
    align-items: center;
    margin-top: 2%;
    justify-content: space-between;
  }

  .ItemWrap-Body {
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    text-align: left;
    margin-top: 3%;
  }

  .ItemWrap-Body-Title {
    font-size: 14px;
    border-radius: 4px;
    margin-left: 2%;
    position: relative;
    /* background-color: #e2e5e7; */
  }
  .ItemWrap-Body-Wanted {
    display: flex;
    border-radius: 130px;
    background-color: #e2e5e7;
    white-space: nowrap;
    width: 30%;
    justify-content: center;
    padding: 0.5%;
  }
`;

const StatusBox = styled.div`
  width: 25%;
  height: 20px;
  border: 1px solid;
  border-radius: 20px;
  display: flex;
  .status0 {
    display: flex;
    border-radius: 130px;
    background-color: #e2e5e7;
    white-space: nowrap;
    width: 40%;
    justify-content: center;
    padding: 0.5%;
    background-color: #05ff5b;
  }
  .status1 {
    display: flex;
    border-radius: 130px;
    background-color: #e2e5e7;
    white-space: nowrap;
    width: 60%;
    justify-content: center;
    padding: 0.5%;
    background-color: #dafe6d;
  }
  .status2 {
    display: flex;
    border-radius: 130px;
    background-color: #e2e5e7;
    white-space: nowrap;
    width: 100%;
    justify-content: center;
    padding: 0.5%;
    background-color: red;
  }
`;

const ItemProfile = styled.div`
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export default Item;
