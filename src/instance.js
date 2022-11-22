import axios from "axios";
import { getCookie } from "./hooks/CookieHook";

const instance = axios.create({
  baseURL: "https://www.iceflower.shop/",
  headers: {
    Authorization: `${getCookie("accessToken")}`,
  },
});

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
        Authorization: `${getCookie("accessToken")}`,
      },
    }),

  editUser: (EditUser) =>
    instance.put("/users", EditUser, {
      headers: {
        Authorization: `${getCookie("accessToken")}`,
      },
    }),
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
        Authorization: `${getCookie("accessToken")}`,
      },
    });
  },
  deletePost: (params) =>
    instance.delete(
      `/posts/${params}`
      // {
      //   headers: { Authorization: `Bearer ${token}` },
      // }
    ),
  updatePost: (payload) =>
    instance.patch(
      `/posts/${payload.postId}`,
      payload.post
      //  {
      //   headers: { Authorization: `Bearer ${token}` },
      // }
    ),
};
