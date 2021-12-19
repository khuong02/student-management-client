import methodApi from "./methodApi";
import store from "../redux/store";
import refreshToken from "../auth/refreshToken";

const userApi = {
  getUser: async () => {
    const { token, account } = store.getState().auth;
    return new Promise(async (resolve, reject) => {
      const checkHasTokenExpired = async (token) => {
        try {
          const config = {
            headers: { Authorization: "Bearer " + token },
          };
          const res = await methodApi.getAll("/api/user/posts", config);
          //check has token expired yet?
          if (res.status === 403) {
            const newAccessToken = await refreshToken(account);

            //check has refresh token expired yet?
            checkHasTokenExpired(newAccessToken.accessToken);
          } else {
            resolve({ res, token });
          }
        } catch (err) {
          reject(err);
        }
        //create token send server
      };

      checkHasTokenExpired(token);
    });
  },
};

export default userApi;
