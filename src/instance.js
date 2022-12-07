import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_SERVER,
  headers: {
    Authorization: sessionStorage.getItem("accessToken"),
  },
});

const instanceNoAuth = axios.create({
  baseURL: process.env.REACT_APP_BACK_SERVER,
});

//? ------------------------- axios interceptor  --------------------------

instance.interceptors.request.use(function (config) {
  const token = sessionStorage.getItem("accessToken");
  config.headers.Authorization = token;
  return config;
});

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
            refresh_token: sessionStorage.getItem("refreshToken"),
            nickName: sessionStorage.getItem("nickName"),
          }
        );
        console.log(data);
        sessionStorage.setItem("accessToken", `Bearer ${data.accessToken}`);
        prevRequest.headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.accessToken}`,
        };
        window.location.reload();
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
  DupNick: (userNickname) =>
    instanceNoAuth.post("/users/Dup/Nick", userNickname),
  DupId: (userId) => instanceNoAuth.post("/users/Dup/Id", userId),
};

export const loginApi = {
  postLogin: (userlogin) => instance.post("/users/login", userlogin),
};

export const userApi = {
  getUser: () => instance.get("/users"),

  editUser: (EditUser) =>
    instance.put("/users", EditUser, {
      headers: {
        Authorization: sessionStorage.getItem("accessToken"),
      },
    }),

  avatarUser: (payload) =>
    instance.post(
      "/users/change/point",
      { userAvatar: payload },
      {
        headers: {
          Authorization: sessionStorage.getItem("accessToken"),
        },
      }
    ),

  dailyUser: () =>
    instance.put("/users/check", {
      headers: {
        Authorization: sessionStorage.getItem("accessToken"),
      },
    }),
  getOtherUser: (nickname) => instance.get(`/users/${nickname}`),
};

export const rankApi = {
  getRank: (payload) => instance.get(`/rank`),
  getRankMyPoint: (payload) => instance.get(`/rank/mypoint`),
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
  getComments: (payload) =>
    instance.get(`/comments/${payload}`, {
      headers: {
        Authorization: sessionStorage.getItem("accessToken"),
      },
    }),
  postComments: (payload) =>
    instance.post(`/comments/${payload.postid}`, payload.comment, {
      headers: {
        Authorization: sessionStorage.getItem("accessToken"),
      },
    }),
  editComments: (payload) =>
    instance.put(`/comments/${payload.commentId}`, payload.comment, {
      headers: {
        Authorization: sessionStorage.getItem("accessToken"),
      },
    }),
  delComments: (payload) =>
    instance.delete(`/comments/${payload}`, {
      headers: {
        Authorization: sessionStorage.getItem("accessToken"),
      },
    }),
};

export const postsApi = {
  getPosts: (payload) => {
    return instance.get(`/posts/?skip=${payload}`);
  },
  getSearchTitle: (payload) => {
    return instance.get(`posts/searchTitle/${payload}`);
  },
  getSearchNickname: (payload) => {
    return instance.get(`posts/searchNickname/${payload}`);
  },
  creatPost: (inputs) => {
    return instance.post(`/posts`, inputs);
  },
  putPost: (inputs) => {
    return instance.put(`/posts/${inputs.postId}`, inputs.postPayload.data);
  },
  deletePost: (params) => instance.delete(`/posts/${params}`),
  updatePost: (payload) =>
    instance.patch(`/posts/${payload.postId}`, payload.post),
  bookMarkPost: (payload) => instance.put(`/users/bookmark/bookmark`, payload),
  filterPost: (inputs) => {
    return instance.post(`/posts/filterPosts`, inputs);
  },
};
