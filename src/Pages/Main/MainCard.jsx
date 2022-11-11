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
      max-width: 600px;
      width: 100%;
      height: 200px;
      display: flex;
      flex-direction: column;
      background-color: #ffffff;
      margin: 1rem;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      border-radius: 6px;
    }

    .ItemWrap-Top {
      display: flex;
      width: 350px;
      height: 170px;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      background-color: #e2e5e7;
      color: #566270;
      font-size: 2.25rem;
      justify-content: center;
      text-align: center;
      align-items: center;
    }

    .ItemWrap-Body {
      height: 200px;
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
      padding: 10px;
    }

    .ItemWrap-Body-Title {
      width: 300px;
      height: 36px;
      margin: 16px;
      border-radius: 4px;
      background-color: #e2e5e7;
    }
  `;

  return (
    <ItemWrap>
      <div className="ItemWrap">
        <div className="ItemWrap-Top ">{item?.title}</div>
        <i class="fa-regular fa-bookmark"></i>
        <FontAwesomeIcon icon="fa-regular fa-bookmark" />
        <div className="ItemWrap-Body">
          <div className="ItemWrap-Body-Title ">{item?.map}</div>
          <div className="ItemWrap-Body-Title ">{item?.time}</div>
          <div className="ItemWrap-Body-Title ">{item?.partyMember}</div>
        </div>
      </div>
    </ItemWrap>
  );
};

export default Item;
