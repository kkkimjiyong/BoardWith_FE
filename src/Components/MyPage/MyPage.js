import React, { useEffect, useState } from "react";
import { userApi } from "../../instance";
import styled from "styled-components";
import useInput from "../../hooks/UseInput";
import { getCookie, setCookie } from "../../hooks/CookieHook";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { getDistance } from "geolib";

const MyPage = () => {
  // const [user, Setuser] = useState({});
  const [isEdit, SetisEdit] = useState(0);
  const [user, Setuser, onChange] = useInput();
  const [Myaddress, SetMyaddress] = useState();
  const [placeAdress, SetplaceAdress] = useState();
  const { kakao } = window;

  const onSubmitHandler = () => {
    const userPassword = prompt("수정하시려면 비밀번호를 입력해주세요!");
    SetisEdit(0);
    if (userPassword) {
      editUser({
        ...user,
        password: userPassword,
        confirm: userPassword,
      });
      console.log(user);
    }
  };
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

  //수정할때 비밀번호를 넣어야함!!!!!!!!(비밀번호확인까지)
  const editUser = async (payload) => {
    try {
      const { data } = await userApi.editUser(payload);
      alert(data.message);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <UserWrap>
      {user?.nickName}님의 마이페이지
      {/* <UserCtn>
        닉네임
        {isEdit === 1 ? <input /> : <UserBox>{user?.nickName}</UserBox>}
        <EditBtn
          onClick={() => {
            isEdit === 1 ? onSubmitHandler(1) : SetisEdit(1);
          }}
        />
      </UserCtn> */}
      <UserCtn>
        {isEdit === 2 ? (
          <UserInput
            value={user.likeGame}
            name="likeGame"
            onChange={onChange}
          />
        ) : (
          <UserBox>{user?.likeGame}</UserBox>
        )}
        <EditBtn
          onClick={() => {
            isEdit === 2 ? onSubmitHandler(2) : SetisEdit(2);
          }}
        />
      </UserCtn>
      <UserCtn>
        {isEdit === 3 ? (
          <UserInput
            value={user.birth}
            type="date"
            name="birth"
            onChange={onChange}
          />
        ) : (
          <UserBox>{user?.birth}</UserBox>
        )}
        <EditBtn
          onClick={() => {
            isEdit === 3 ? onSubmitHandler(3) : SetisEdit(3);
          }}
        />
      </UserCtn>
      <UserCtn>
        {isEdit === 4 ? (
          <UserInput value={user.gender} name="gender" onChange={onChange} />
        ) : (
          <UserBox>{user?.gender}</UserBox>
        )}
        <EditBtn
          onClick={() => {
            isEdit === 4 ? onSubmitHandler(4) : SetisEdit(4);
          }}
        />
      </UserCtn>
      <UserCtn>
        {isEdit === 5 ? (
          <UserInput value={user.address} name="address" onChange={onChange} />
        ) : (
          <UserBox>{user?.address}</UserBox>
        )}
        <EditBtn
          onClick={() => {
            isEdit === 5 ? onSubmitHandler(5) : SetisEdit(5);
          }}
        />
      </UserCtn>
      <UserCtn>
        {isEdit === 6 ? (
          <UserInput value={user.myPlace} name="myPlace" onChange={onChange} />
        ) : (
          <UserBox>{user?.myPlace}</UserBox>
        )}
        <EditBtn
          onClick={() => {
            isEdit === 6 ? onSubmitHandler(6) : SetisEdit(6);
          }}
        />
      </UserCtn>{" "}
    </UserWrap>
  );
};

const UserWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  gap: 30px;
`;

const UserCtn = styled.div`
  display: flex;
  gap: 30px;
`;

const UserBox = styled.div`
  width: 300px;
  height: 50px;
  border: 3px solid #9747ff;
  border-radius: 10px;
`;

const UserInput = styled.input`
  width: 300px;
  height: 50px;
  border: 3px solid #9747ff;
  border-radius: 10px;
  cursor: pointer;
`;

const EditBtn = styled.div`
  height: 50px;
  width: 50px;
  border: 2px solid #9747ff;
  box-shadow: 0px 3px 3px 0px gray;
  border-radius: 5px;
  cursor: pointer;
  :hover {
    background-color: #d8d8d8;
  }
`;

export default MyPage;
