import styled from "styled-components";

const MainCard = ({ item }) => {
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
