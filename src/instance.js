import axios from "axios";
import { getCookie, removeCookie, setCookie } from "./hooks/CookieHook";

const token = getCookie("accessToken");
const refreshToken = getCookie("refreshToken");
const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_SERVER,
  // baseURL: "https://www.iceflower.shop",
  headers: {
    Authorization: token,
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
    if (data.message === "refresh가 일치하지 않습니다.") {
      try {
        prevRequest.headers = {
          "Content-Type": "application/json",
          Authorization: token,
          refresh: refreshToken,
        };
        return await axios(prevRequest);
      } catch (err) {
        console.log(err);
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
        Authorization: token,
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
    instance.put(`/posts/closeParty/${payload}`, payload),
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
        Authorization: token,
      },
    });
  },
  deletePost: (params) => instance.delete(`/posts/${params}`),
  updatePost: (payload) =>
    instance.patch(`/posts/${payload.postId}`, payload.post),
};
