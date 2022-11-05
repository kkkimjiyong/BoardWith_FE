import styled from "styled-components";

const MainCard = () => {
  return (
    <Card>
      <div>
        <CardTitle>title</CardTitle>
        <div>
          장소 <span>건대입구역 1번 출구</span>
        </div>
        <div>
          날짜 <span>22년 11월 4일</span>
        </div>
        <div>
          인원 <span>4인</span>
          <span>인원표시</span>
        </div>
        <div>
          {" "}
          <span>모여서 같이 게임해요</span>
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
`;

const CardTitle = styled.h3``;
