import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getCookie, removeCookie, setCookie } from "./hooks/CookieHook";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_SERVER,
  // baseURL: "https://www.iceflower.shop",
  headers: {
    Authorization: getCookie("accessToken"),
  },
});

//? ------------------------- axios interceptor  --------------------------

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log(error);
    const {
      config,
      response: { data },
    } = error;
    const prevRequest = config;
    console.log(config);
    if (data.code === 419) {
      try {
        console.log("여기 419 떳어요!!");
        const { data } = await axios.post(
          `${process.env.REACT_APP_BACK_SERVER}/users/refresh`,
          {
            refresh_token: getCookie("refreshToken"),
          }
        );
        console.log(data);

        prevRequest.headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.accessToken}`,
        };
        return await axios(prevRequest);
      } catch (err) {
        console.log(err);
        if (err.response.data.code === 420) {
          console.log("여기 420이에요!!!");
          alert("로그인을 다시 해주세요");
          window.location.replace("/");
        }
        new Error(err);
      }
    }
    return Promise.reject(error);
  }
);

export const signUpApi = {
  postSingup: (userinfo) => instance.post("/users/signup", userinfo),
};

export const loginApi = {
  postLogin: (userlogin) => instance.post("/users/login", userlogin),
};

export const userApi = {
  getUser: () =>
    instance.get("/users", {
      headers: {
        Authorization: getCookie("accessToken"),
      },
    }),

  editUser: (EditUser) =>
    instance.put("/users", EditUser, {
      headers: {
        Authorization: getCookie("accessToken"),
      },
    }),

  dailyUser: () =>
    instance.put("/users/check", {
      headers: {
        Authorization: getCookie("accessToken"),
      },
    }),
  getOtherUser: (nickname) => instance.get(`/users/${nickname}`),
};

export const postApi = {
  getDetail: (payload) => instance.get(`/posts`),
  getDetailId: (payload) => instance.get(`/posts/${payload}`),
  editDetail: (payload) => instance.post(`/posts/${payload}`),
  delDetail: (payload) => instance.post(`/posts/${payload}`),
  closeParty: (payload) =>
    instance.put(`/posts/closeParty/${payload}`, { postId: payload }),
  openParty: (payload) =>
    instance.put(`/posts/reopenParty/${payload.postid}`, payload.time),
  acceptingParty: (payload) =>
    instance.put(`/posts/confirm/${payload.postid}`, payload.nickName),
  kickingParty: (payload) =>
    instance.put(`/posts/ban/${payload.postid}`, payload.nickName),

  kickingPartyCancel: (payload) =>
    instance.put(`/posts/cancelBan/${payload.postid}`, payload.nickName),
};

export const commentsApi = {
  getComments: (payload) => instance.get(`/comments/${payload}`),
  postComments: (payload) =>
    instance.post(`/comments/${payload.postid}`, payload.comment),
  editComments: (payload) =>
    instance.put(`/comments/${payload.commentId}`, payload.comment),
  delComments: (payload) => instance.delete(`/comments/${payload}`),
};

export const postsApi = {
  getPosts: () => {
    return instance.get("/posts");
  },
  creatPost: (inputs) => {
    return instance.post(`/posts`, inputs, {
      headers: {
        Authorization: getCookie("accessToken"),
      },
    });
  },
  deletePost: (params) => instance.delete(`/posts/${params}`),
  updatePost: (payload) =>
    instance.patch(`/posts/${payload.postId}`, payload.post),
};
