import { useEffect } from "react";
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
const Item = ({ number, item, Myaddress }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //30%까지는 여유, 60&까지는 보통, 90%까지는 마감임박
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
  console.log(Myaddress);
  useEffect(() => {
    //각 카드별로 현위치에서의 거리를 구한값을 넣어, 전역state값에 다시 넣어준다.
    //부모컴포넌트에서 쓰기위해서 redux를 썻는데, 다른방법은 없나?

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
  // console.log(item);
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

  return (
    <ItemWrap onClick={() => navigate(`/posts/${item._id}`)}>
      <div className="ItemWrap">
        <div className="ItemWrap-Body-SpaceBetween">
          <ItemProfile>
            {" "}
            <div
              style={{
                borderRadius: "10px",
                width: "30px",
                height: "30px",
                backgroundColor: "#ddd",
                // backgroundImage: `url(${item?.img})`,
                backgroundSize: "cover",
              }}
            ></div>
            <div>{item?.nickName}</div>
          </ItemProfile>
          <FontAwesomeIcon
            style={{
              color: "black",
            }}
            size="2x"
            icon={faStar}
          />{" "}
          {/* <FontAwesomeIcon size="2x" icon={faSplotch} />{" "} */}
        </div>
        <div className="ItemWrap-Body">
          <div>
            <div className="ItemWrap-Top ">{item?.title}</div>
            <div className="ItemWrap-Body-Flex">
              <FontAwesomeIcon
                style={{
                  color: "black",
                }}
                size="2x"
                icon={faCalendar}
              />{" "}
              <div className="ItemWrap-Body-Title ">{item?.cafe}</div>
            </div>

            <div className="ItemWrap-Body-Flex2">
              <div
                style={{
                  width: "100%",
                  display: "flex",
                }}
              >
                {" "}
                <FontAwesomeIcon
                  style={{
                    color: "black",
                  }}
                  size="2x"
                  icon={faLocationDot}
                />{" "}
                <div className="ItemWrap-Body-Title ">
                  {realStartTime + " ~ " + realEndTime}
                  {/* {new Date(startDate)} */}
                </div>
              </div>

              <div
                className={"status" + memberStatus.indexOf(statusIndicator())}
              >
                {statusIndicator()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ItemWrap>
  );
};

const ItemWrap = styled.div`
  .ItemWrap {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    padding: 4% 4%;
    flex-direction: column;
    background-color: #bdbdbd;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-radius: 6px;
    margin-bottom: 2%;
  }

  .ItemWrap-Top {
    display: flex;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    /* background-color: #e2e5e7; */
    color: black;
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
  .status0 {
    display: flex;
    border-radius: 130px;
    background-color: #e2e5e7;
    white-space: nowrap;
    width: 30%;
    justify-content: center;
    padding: 0.5%;
    background-color: #05ff5b;
  }
  .status1 {
    display: flex;
    border-radius: 130px;
    background-color: #e2e5e7;
    white-space: nowrap;
    width: 30%;
    justify-content: center;
    padding: 0.5%;
    background-color: #dafe6d;
  }
  .status2 {
    display: flex;
    border-radius: 130px;
    background-color: #e2e5e7;
    white-space: nowrap;
    width: 30%;
    justify-content: center;
    padding: 0.5%;
    background-color: red;
  }
`;

const ItemProfile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export default Item;
