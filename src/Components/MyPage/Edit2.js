import React, { useEffect, useState } from "react";
import { userApi } from "../../instance";
import styled from "styled-components";
import useInput from "../../hooks/UseInput";
import { getCookie, setCookie } from "../../hooks/CookieHook";
import male from "../../Assets/free-icon-female-2404482.png";
import female from "../../Assets/free-icon-gender-symbol-5272547.png";
import { useNavigate } from "react-router-dom";
import LoginNotif from "../../Pages/LoginNotif";
import ReactDaumPost from "react-daumpost-hook";
import { useRef } from "react";

const MyPage = () => {
  const [gender, setGender] = useState();
  const [address, setAddress] = useState();
  const [isOpen, SetisOpen] = useState();
  const [isOpen1, SetisOpen1] = useState();
  const [isOpen2, SetisOpen2] = useState();
  const [user, Setuser, onChange] = useInput();

  const ref = useRef(null);

  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const { data } = await userApi.getUser();
      console.log(data);
      if (data.myNewToken) {
        setCookie("accessToken", data.myNewToken);
        Setuser(data.findUser);
      } else {
        Setuser(data.findUser);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(user?.img);
  useEffect(() => {
    getUser();
  }, []);

  const postConfig = {
    //팝업창으로 사용시 해당 파라메터를 없애면 된다.
    onComplete: (data) => {
      // 데이터를 받아와서 set해주는 부분
      setAddress(data.address);
      // 검색후 해당 컴포넌트를 다시 안보이게 하는 부분
      ref.current.style.display = "none";
    },
  };
  const postCode = ReactDaumPost(postConfig);

  if (!getCookie("accessToken")) {
    return <LoginNotif />;
  } else {
    return (
      <Wrapper>
        <ProfileCtn>
          {" "}
          <EditBox onClick={() => navigate("/editpage")}>
            <EditBtn>편집</EditBtn>
          </EditBox>
          <ProfileBox
            style={{
              backgroundImage: `url(${user?.img})`,
              backgroundSize: "cover",
            }}
          />
          <ProfileName>
            {" "}
            <div>{user?.nickName}</div>{" "}
            <GenderImg
              src={user?.gender === "female" ? female : male}
              alt="React"
            />
          </ProfileName>
          <ProfileInputBox>
            {" "}
            <ProfileInput
              value={user?.birth}
              placeholder={user?.birth}
              onChange={onchange}
            />
            <ProfileInput
              value={user?.gender}
              placeholder={user?.gender}
              onChange={onchange}
            />
            <ProfileInput
              onClick={postCode}
              value={user?.address}
              placeholder={user?.address}
            />
            <DaumPostBox ref={ref}></DaumPostBox>
          </ProfileInputBox>
          {/* <div>
            {user?.birth}/{user?.gender}/{user?.address?.split(" ")[0]}&nbsp;
            {user?.address?.split(" ")[1]}
          </div> */}
        </ProfileCtn>
        <LikeGameCtn>
          <LikeGameTitle>선호게임</LikeGameTitle>
          <LikeGameBox>
            {}
            <LikeGame>#달무티</LikeGame>
            <LikeGame>#달무티</LikeGame>
            <LikeGame>#달무티</LikeGame>
          </LikeGameBox>

          {/* 맵돌려야지~ */}
        </LikeGameCtn>
        <IntroCtn>
          <IntroBox
            value={user?.introduce}
            placeholder={user?.introduce}
            onchange={onChange}
          />
        </IntroCtn>
      </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const EditBox = styled.div`
  width: 100%;
  height: 30%;
  padding: 10px;
  display: flex;
  justify-content: end;
`;

const EditBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  width: 3rem;
  border-radius: 5px;
  cursor: pointer;
  :hover {
    box-shadow: 0px 2px 2px 0px gray;
  }
`;

const ProfileCtn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 10px solid #be8eff;
  height: 20vh;
`;

const ProfileBox = styled.div`
  width: 50px;
  height: 50px;
  margin-bottom: 5px;
  border-radius: 10px;
  border: none;
`;

const ProfileName = styled.div`
  display: flex;
  gap: 4px;
`;

const ProfileInputBox = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0px;
  gap: 5px;
  width: 100%;
`;

const ProfileInput = styled.input`
  width: 30%;
`;

const LikeGameCtn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-top: 10px solid #be8eff;
  height: 15vh;
`;

const LikeGameTitle = styled.div`
  display: flex;
  padding: 20px 50px 0px 50px;
`;

const LikeGameBox = styled.div`
  display: flex;
  justify-content: left;
  padding: 20px 50px;
  gap: 15px;
`;

const LikeGame = styled.div`
  padding: 5px;
  border: 2px solid #6900f9;
  border-radius: 10px;
`;

const IntroCtn = styled.div`
  border-top: 10px solid #be8eff;
  width: 100%;
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const IntroBox = styled.input`
  width: 100%;
  border-radius: 10px;
  padding: 10px;
  border: 2px solid #6900f9;
  height: 100%;
`;

const GenderImg = styled.img`
  width: 1.2rem;
  height: 1.2rem;
  object-fit: cover;
`;

const DaumPostBox = styled.div``;

export default MyPage;
