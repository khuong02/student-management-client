import axios from "axios";
import queryString from "query-string";
// import store from "../redux/store";
// import methodApi from "./methodApi";
// import refreshToken from "../auth/refreshToken";
// // Set up default config for http requests here

// // Please have a look at here `https://github.com/axios/axios#request-config` for the full list of configs

// const getToken = async () => {
//   const { token, account } = store.getState().auth;
//   if (!token) return null;
//   return new Promise((resolve, reject) => {
//     const checkHasTokenExpired = async (token) => {
//       try {
//         const config = {
//           headers: { Authorization: "Bearer " + token },
//         };
//         const res = await methodApi.getToken("/api/user/posts", config);
//         //check has token expired yet?
//         if (res.status === 403) {
//           const newAccessToken = await refreshToken(account);
//           //check has refresh token expired yet?
//           checkHasTokenExpired(newAccessToken.accessToken);
//         } else {
//           resolve(token);
//         }
//       } catch (err) {
//         reject(null);
//       }
//       //create token send server
//     };

//     checkHasTokenExpired(token);
//   });
// };

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  //   const token = await getToken();
  //   console.log("result: " + token);
  //   if (token) {
  //     config.headers.Authorization = `Bearer ${token}`;
  //   }
    return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    return error.response;
  }
);
export default axiosClient;
