import methodApi from "./methodApi";
import store from "../redux/store";
import refreshToken from "../auth/refreshToken";

const userApi = {
  getUser: async () => {
    const { token, account } = store.getState().auth;
    return new Promise(async (resolve, reject) => {
      const checkHasTokenExpired = async (token) => {
        //create token send server
        const config = {
          headers: { Authorization: "Bearer " + token },
        };
        const res = await methodApi.getAll("/api/user/posts", config);

        //check has token expired yet?
        if (res.success === false) {
          const checkRefreshToken = await refreshToken(account);

          //check has refresh token expired yet?

          checkRefreshToken.success === false
            ? reject(checkRefreshToken.msg)
            : checkHasTokenExpired(checkRefreshToken.accessToken);
        } else {
          resolve({ res, token });
        }
      };

      checkHasTokenExpired(token);
    });
  },
};

export default userApi;
