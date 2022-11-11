import { useEffect } from "react";
import styled from "styled-components";
import { getDistance } from "geolib";
import { useDispatch } from "react-redux";
import { addDistance } from "../../redux/modules/postsSlice";

const MainCard = ({ item, Myaddress }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    //각 카드별로 현위치에서의 거리를 구한값을 넣어, 전역state값에 다시 넣어준다.
    //부모컴포넌트에서 쓰기위해서 redux를 썻는데, 다른방법은 없나?
    if (Myaddress) {
      dispatch(
        addDistance({
          ...item,
          distance: getDistance(
            { latitude: item.location.y, longitude: item.location.x },
            {
              latitude: Myaddress.latitude,
              longitude: Myaddress.longitude,
            }
          ),
        })
      );
    }
  }, []);
  console.log(item);

  return (
    <Card key={item._id}>
      <div>
        <CardTitle>{item.title}</CardTitle>
        <div>
          장소 <span>{item.map}</span>
        </div>
        <div>
          날짜 <span>{item.date}</span>
        </div>
        <div>
          인원 <span>{item.partyMember}</span>
          <span>인원표시</span>
        </div>
        <div>
          {" "}
          <span>{item.content}</span>
        </div>
      </div>
    </Card>
  );
};

export default MainCard;

const Card = styled.div`
  background-color: #a66cff;
  padding: 20px;
  border-radius: 10px;
  width: 200px;
  height: 200px;
`;

const CardTitle = styled.h3``;
