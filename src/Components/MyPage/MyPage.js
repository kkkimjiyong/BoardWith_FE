import React, { useEffect, useState } from "react";
import { userApi } from "../../instance";
import styled from "styled-components";

const MyPage = () => {
  const [user, Setuser] = useState();

  const getUser = async () => {
    try {
      const { data } = await userApi.getUser();
      console.log(data);
      Setuser(data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(user);
  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserCtn>
      <UserBox></UserBox>
      <UserBox></UserBox>
      <UserBox></UserBox>
      <UserBox></UserBox>
      <UserBox></UserBox>
      <UserBox></UserBox>
    </UserCtn>
  );
};

const UserCtn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  gap: 30px;
`;

const UserBox = styled.div`
  width: 300px;
  height: 50px;
  border: 3px solid #9747ff;
  border-radius: 10px;
  cursor: pointer;
`;
export default MyPage;
