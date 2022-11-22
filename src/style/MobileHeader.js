import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faStar } from "@fortawesome/free-regular-svg-icons";
import { GrHomeRounded } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { CgHome } from "react-icons/cg";
import { GoGraph, GoSearch } from "react-icons/go";

const MobileHeader = () => {
  const navigate = useNavigate();
  return (
    <MobileHeaderCtn>
      {" "}
      <GoSearch size="24" color="white" onClick={() => alert("개발중")} />
      <FontAwesomeIcon
        onClick={() => navigate("/avatar")}
        style={{
          color: "#dddddd",
        }}
        size="lg"
        icon={faStar}
      />
      <CgHome size="24" color="white" onClick={() => navigate("/main")} />
      <GoGraph size="24" color="white" onClick={() => alert("개발중")} />
      <CgProfile size="24" color="white" onClick={() => navigate("/mypage")} />
    </MobileHeaderCtn>
  );
};

const MobileHeaderCtn = styled.div`
  position: fixed;
  z-index: 997;
  height: 5%;
  background-color: #2e294e;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  bottom: 0;
  width: 100%;
  box-shadow: 1px 1px 15px 3px black;
  /* background-color: #9747ff; */
`;

export default MobileHeader;
