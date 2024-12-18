/** @format */

import api from "../../api";
// import { hideLoading, showLoading } from "react-redux-loading-bar";
// import Swal from "sweetalert2";

const ActionType = {
  SET_AUTH_USER: "SET_AUTH_USER",
  UNSET_AUTH_USER: "UNSET_AUTH_USER",
};

function setAuthUserActionCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
}
function unsetAuthUserActionCreator() {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: {
      authUser: null,
    },
  };
}

function asyncSetAuthUser({ username, password }) {
  return async (dispatch) => {
    try {
      const returnData = await api.login({ username, password });
      api.putAccessToken(returnData.data.accessToken);
      api.putRefreshToken(returnData.data.refreshToken);
      const authUser = await api.dataGetUser();
      dispatch(setAuthUserActionCreator(authUser));
      return "success";
    } catch (error) {
      return "Failed";
    }
  };
}

function asyncUnsetAuthUser() {
  return (dispatch) => {
    dispatch(unsetAuthUserActionCreator());
    api.putAccessToken("");
  };
}

function asyncRegisterUser({ username, email, password }) {
  return async (dispatch) => {
    try {
      // Call API to register user
      const data = await api.register({
        username,
        email,
        password,
      });

      // Store the token in MMKV storage
      api.putAccessToken(data.data.token);

      // Fetch authenticated user details
      // const authUser = await api.dataUserTemp();
      dispatch(setAuthUserActionCreator(data.data));

      // Return success response
      return data;
    } catch (error) {
      return "fail registration";
    }
  };
}

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  asyncRegisterUser,
};
