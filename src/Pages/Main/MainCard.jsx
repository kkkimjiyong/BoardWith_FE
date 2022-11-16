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
import { faCalendar, faBookmark } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
const Item = ({ number, item, Myaddress }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // useEffect(() => {
  //   //각 카드별로 현위치에서의 거리를 구한값을 넣어, 전역state값에 다시 넣어준다.
  //   //부모컴포넌트에서 쓰기위해서 redux를 썻는데, 다른방법은 없나?
  //   dispatch(
  //     addDistance({
  //       ...item,
  //       distance: getDistance(
  //         { latitude: item.location?.y, longitude: item.location?.x },
  //         {
  //           latitude: Myaddress.latitude,
  //           longitude: Myaddress.longitude,
  //         }
  //       ),
  //     })
  //   );
  // }, []);

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
          <div className="ItemWrap-Top ">{item?.title}</div>
          <FontAwesomeIcon
            style={{
              color: "black",
            }}
            size="2x"
            icon={faBookmark}
          />{" "}
        </div>
        <div className="ItemWrap-Body">
          <div>
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

              <div className="ItemWrap-Body-Wanted ">
                모집중({item?.participant.length}/{item?.partyMember})
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
    background-color: gray;
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
    font-size: 1.5rem;
    text-align: center;
    align-items: center;
    margin-bottom: 2%;
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
    width: 20%;
    justify-content: center;
    padding: 0.5%;
  }
`;

export default Item;
