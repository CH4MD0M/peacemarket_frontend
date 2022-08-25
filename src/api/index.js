import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "content-type": "application/json",
  },
});

// let isTokenRefreshing = false;
// let refreshSubscribers = [];
// const addRefreshSubscriber = (callback) => {
//   refreshSubscribers.push(callback);
// };

// instance.interceptors.request.use(
//   (config) => {
//     const accessToken = '';

//     if (accessToken) {
//       config.headers['X-AUTH-TOKEN'] = accessToken;
//       return config;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );
