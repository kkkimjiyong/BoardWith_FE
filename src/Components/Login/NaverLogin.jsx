import { useEffect } from "react";
import React, { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import Layout from "../../style/Layout";
import ReactDaumPost from "react-daumpost-hook";
import Loading from "../../style/Loading";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const NaverLogin = ({ setGetToken, setUserInfo }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState();
  const formSchema = yup.object({
    age: yup
      .string()
      .required("나이를 입력해주세요")
      .max(2, "최대 두 자리까지만 가능합니다"),
    address: yup.string().required("주소를 입력해주세요!"),
    nickName: yup
      .string()
      .required("닉네임을 입력해주세요")
      .min(2, "최소 2자 이상 가능합니다")
      .max(8, "최대 8자 까지만 가능합니다"),
  });

  let params = new URL(window.location.href).searchParams;
  let code = params.get("code");

  const isNaver = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACK_SERVER}/social/naver/isNaver`,
        { code }
      );
      if (data.accessToken) {
        alert("로그인 성공!");
        sessionStorage.setItem("accessToken", data.accessToken, { path: "/" });
        sessionStorage.setItem("refreshToken", data.refresh_token, {
          path: "/",
        });
        navigate("/main");
      }
      setIsLoading(false);
      setUserId(data.userId);
    } catch (error) {
      alert(error.error);
    }
  };

  //* ------------------- 카카오 인가코드 받고, 서버로 넘겨주기 -----------------

  //이 코드를 백엔드로 보내주면됨
  console.log(code);
  console.log(userId);

  const postNaverUser = async (signup) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACK_SERVER}/social/naver/callback`,
        signup
      );
      console.log(data.accessToken);
      if (data.accessToken) {
        sessionStorage.setItem("accessToken", data.accessToken, { path: "/" });
        sessionStorage.setItem("refreshToken", data.refresh_token, {
          path: "/",
        });
        alert("가입을 축하드립니다!");
        navigate("/main");
      } else {
        alert("다시 가입부탁드립니다!");
        navigate("/");
      }
    } catch (error) {
      alert(error.response.data.message);
      setValue("nickName", "");
    }
  };
  useEffect(() => {}, []);

  //* --------------------  선호게임 태그인풋창  ---------------------------
  const [tagItem, setTagItem] = useState("");
  const [tagList, setTagList] = useState([]);
  const ref = useRef();

  const onKeyPress = (e) => {
    console.log(e);
    if (e.target.value.length !== 0 && e.charCode === 13) {
      submitTagItem();
      console.log("enter");
    }
  };

  const submitTagItem = () => {
    console.log(tagItem);
    let updatedTagList = [...tagList];
    updatedTagList.push(`#${tagItem.trim()}`);
    setTagList(updatedTagList);
    setTagItem("");
    console.log(updatedTagList);
  };

  const deleteTagItem = (e) => {
    console.log(tagList);
    console.log(e.target.parentElement.firstChild.innerText);
    const deleteTagItem = e.target.parentElement.firstChild.innerText;
    const filteredTagList = tagList.filter(
      (tagItem) => tagItem !== deleteTagItem
    );
    setTagList(filteredTagList);
  };

  //* --------------------- 닉네임,주소입력 기능  -----------------------
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: { gender: "male" },
    resolver: yupResolver(formSchema),
  });
  console.log(watch());
  //submit 핸들러
  const onSubmit = (data) => {
    console.log(data);
    reset();
    console.log({
      userId,
      ...data,
      age: data.age,
      likeGame: tagList,
      myPlace: data.address.split(" ").slice(0, 2),
    });

    //선호지역은 자동적으로 나의 집주소에서 구단위 까지만으로 적용
    postNaverUser({
      userId,
      ...data,
      age: data.age,
      likeGame: tagList,
      myPlace: data.address.split(" ").slice(0, 2),
    });
    console.log(errors);
  };
  //? --------------------  다음 주소창  ----------------------------

  const postConfig = {
    //팝업창으로 사용시 해당 파라메터를 없애면 된다.
    onComplete: (data) => {
      // 데이터를 받아와서 set해주는 부분
      setValue("address", data.address);
      // 검색후 해당 컴포넌트를 다시 안보이게 하는 부분
      ref.current.style.display = "none";
    },
  };
  const postCode = ReactDaumPost(postConfig);

  useEffect(() => {
    isNaver();
  }, []);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <Layout>
        <SignUpWrap>
          <>
            <SignUpCtn>
              <SignUpHeader>
                <Arrow onClick={() => navigate("/")} />
                <div>회원가입</div>
              </SignUpHeader>

              <RowBox className="column">
                <h3>추가정보를 입력해주세요</h3>
              </RowBox>

              <RowBox>
                <label htmlFor="male">남자</label>
                <InputBirth
                  id="male"
                  type="radio"
                  value={"male"}
                  {...register("gender")}
                ></InputBirth>

                <label htmlFor="female">여자</label>
                <InputBirth
                  id="female"
                  type="radio"
                  value={"female"}
                  {...register("gender")}
                ></InputBirth>
              </RowBox>
              <SignUpInput placeholder="닉네임" {...register("nickName")} />
              {errors.nickName && (
                <AlertError role="alert">{errors.nickName.message}</AlertError>
              )}
              <SignUpInput
                className="Birth1"
                placeholder="나이를 입력해주세요"
                {...register("age")}
              />
              {errors.age && (
                <AlertError role="alert">{errors.age.message}</AlertError>
              )}
              <SignUpInput
                placeholder="클릭하면, 주소창이 뜹니다."
                type="text"
                onClick={postCode}
                {...register("address")}
              />
              {errors.address && (
                <AlertError role="alert">{errors.address.message}</AlertError>
              )}
              <DaumPostBox ref={ref}></DaumPostBox>
            </SignUpCtn>

            {/* 이 부분을 폼안에 넣어버리면, 엔터가 안먹어서 다른방법을 찾아야함 */}
            <WholeBox>
              <TagBox>
                {tagList.map((tagItem, index) => {
                  return (
                    <TagItem key={index}>
                      <Text>{tagItem}</Text>
                      <TagButton onClick={deleteTagItem}>X</TagButton>
                    </TagItem>
                  );
                })}
                <TagInput
                  type="text"
                  placeholder="엔터로 태그를 만들어주세요. ( 선호게임 )"
                  tabIndex={2}
                  onChange={(e) => setTagItem(e.target.value)}
                  value={tagItem}
                  onKeyPress={onKeyPress}
                />
              </TagBox>
            </WholeBox>
            <NextBtn onClick={handleSubmit(onSubmit)}>완료</NextBtn>
          </>
        </SignUpWrap>{" "}
      </Layout>
    );
  }
};

const SignUpWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  width: 100%;
  height: 100vh;
  color: white;
`;

const SignUpCtn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 20px;
`;

const SignUpHeader = styled.div`
  position: relative;
  top: 0;
  font-size: 1.5rem;
  font-weight: 400;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 20px;
  padding-right: 40%;
`;

const RowBox = styled.div`
  width: 90%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  &.column {
    align-items: flex-start;
    flex-direction: column;
  }
`;

const VerfiyBtn = styled.div`
  font-size: 15px;
  color: var(--white);
  width: 35%;
  background-color: var(--primary);
  display: flex;
  justify-content: center;
  border-radius: 15px;
  padding: 5px 10px;
`;

const InputBirth = styled.input`
  border-radius: 5px;
  width: 10%;
  padding: 10px;
  border: 2px solid #9747ff;
`;

const SignUpInput = styled.input`
  color: white;
  display: block;
  width: 90%;
  padding: 0 20px;
  margin-bottom: 5px;
  height: 40px;
  border: none;
  border-bottom: 1px solid #ffffff;
  background-color: transparent;
  cursor: pointer;
  &:focus {
    border: none;
    border-bottom: 2px solid white;
  }
`;

const DaumPostBox = styled.div`
  position: relative;
  box-shadow: 0px 3px 3px 0px gray;
  width: 400px;
`;

const NextBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  position: fixed;
  bottom: 50px;
  font-weight: 600;
  width: 80%;
  max-width: 500px;
  height: 3em;
  border: none;
  border-radius: 20px;
  box-shadow: 0px 3px 3px 0px gray;
  cursor: pointer;
  background-color: var(--primary);
  :hover {
    background-color: gray;
  }
`;

const WholeBox = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const TagBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  min-height: 40px;
  margin: 10px;
  padding: 0 10px;
  border: none;
  border-bottom: 1px solid white;
  &:focus-within {
    border-bottom: 2px solid white;
  }
`;

const TagItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px;
  padding: 5px;
  background-color: var(--primary);
  border-radius: 5px;
  color: white;
  font-size: 13px;
`;

const Text = styled.span``;

const TagButton = styled.button`
  background-color: transparent;
  text-shadow: 0px 1px 1px 0px var(--black);
  border: none;
  color: var(--red);
`;

const TagInput = styled.input`
  color: white;
  display: inline-flex;
  min-width: 250px;
  background: transparent;
  border: none;
  outline: none;
  cursor: text;
`;

const Arrow = styled.div`
  border: 7px solid transparent;
  border-top-color: white;
  transform: rotate(90deg);
`;

const AlertError = styled.div`
  font-size: 14px;
  color: red;
`;
// const { naver } = window;

// const initializeNaverLogin = () => {
//   const naverLogin = new naver.LoginWithNaverId({
//     clientId: "55dc07a0e4c564bac2630a91922eab90",
//     callbackUrl: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_CALLBACK_URL}&state=${Math.random()
//     .toString(36)
//     .substr(3, 14)}`,
//     // 팝업창으로 로그인을 진행할 것인지?
//     isPopup: false,
//     // 버튼 타입 ( 색상, 타입, 크기 변경 가능 )
//     loginButton: { color: "green", type: 1, height: 40 },
//     callbackHandle: true,
//   });
//   naverLogin.init();

// 선언된 naverLogin 을 이용하여 유저 (사용자) 정보를 불러오는데
// 함수 내부에서 naverLogin을 선언하였기에 지역변수처리가 되어
// userinfo 정보를 추출하는 것은 지역변수와 같은 함수에서 진행주어야한다.

// 아래와 같이 로그인한 유저 ( 사용자 ) 정보를 직접 접근하여 추출가능하다.
// 이때, 데이터는 첫 연동시 정보 동의한 데이터만 추출 가능하다.

// 백엔드 개발자가 정보를 전달해준다면 아래 요기! 라고 작성된 부분까지는
// 코드 생략이 가능하다.

//     naverLogin.getLoginStatus(async function (status) {
//       if (status) {
//         // 아래처럼 선택하여 추출이 가능하고,
//         const userid = naverLogin.user.getEmail();
//         const username = naverLogin.user.getName();
//         // 정보 전체를 아래처럼 state 에 저장하여 추출하여 사용가능하다.
//         // setUserInfo(naverLogin.user)
//       }
//     });
//     // 요기!
//   };

//   // 네이버 소셜 로그인 (네아로) 는 URL 에 엑세스 토큰이 붙어서 전달된다.
//   // 우선 아래와 같이 토큰을 추출 할 수 있으며,
//   // 3부에 작성 될 Redirect 페이지를 통해 빠르고, 깨끗하게 처리가 가능하다.

//   const userAccessToken = () => {
//     window.location.href.includes("access_token") && getToken();
//   };

//   const getToken = () => {
//     const token = window.location.href.split("=")[1].split("&")[0];
//     // console.log, alert 창을 통해 토큰이 잘 추출 되는지 확인하자!

//     // 이후 로컬 스토리지 또는 state에 저장하여 사용하자!
//     // localStorage.setItem('access_token', token)
//     // setGetToken(token)
//   };

//   // 화면 첫 렌더링이후 바로 실행하기 위해 useEffect 를 사용하였다.
//   useEffect(() => {
//     initializeNaverLogin();
//     userAccessToken();
//   }, []);

//   return (
//     <>
//       <div id="naverIdLogin"></div>
//     </>
//   );
// };

export default NaverLogin;
