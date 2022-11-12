import { useEffect } from "react";
import styled from "styled-components";
import { getDistance } from "geolib";
import { useDispatch } from "react-redux";
import { addDistance } from "../../redux/modules/postsSlice";
import { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Item = ({ number, item, Myaddress }) => {
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
  console.log(item);

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
      width: 7%;
      position: absolute;
      justify-content: center;
      padding: 0.5%;
      left: 62%;
    }
  `;

  return (
    <ItemWrap>
      <div className="ItemWrap">
        <div className="ItemWrap-Body-SpaceBetween">
          <div className="ItemWrap-Top ">{item?.title}</div>
          <i class="fa-regular fa-bookmark fa-2x"></i>
        </div>
        <div className="ItemWrap-Body">
          <div>
            <div className="ItemWrap-Body-Flex">
              <i class="fa-solid fa-location-dot  fa-2x"></i>
              <div className="ItemWrap-Body-Title ">{item?.cafe}</div>
            </div>

            <div className="ItemWrap-Body-Flex">
              <i class="fa-regular fa-calendar  fa-2x"></i>
              <div className="ItemWrap-Body-Title ">{item?.time?.[0]}</div>
              <div className="ItemWrap-Body-Wanted ">
                모집중({item?.partyMember})
              </div>
            </div>
          </div>
        </div>
      </div>
    </ItemWrap>
  );
};

export default Item;
