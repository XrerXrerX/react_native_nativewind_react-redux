/**
 * @format
 * @TODO: Define all the actions (creator) for the isPreLoad state
 */

import api from "../../api";
import { setAuthUserActionCreator } from "../authUser/action"; // Ensure correct path
// import { hideLoading, showLoading } from "react-redux-loading-bar";

const ActionType = {
  SET_IS_PRELOAD: "SET_IS_PRELOAD",
  SET_ERROR: "SET_ERROR",
};

function setIsPreloadActionCreator(isPreload) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreload,
    },
  };
}

function setErrorActionCreator(error) {
  return {
    type: ActionType.SET_ERROR,
    payload: {
      error,
    },
  };
}

function asyncPreloadProcessTemp() {
  return async (dispatch) => {
    // dispatch(showLoading()); // Starts the loading bar

    try {
      // const authUser = await api.getOwnProfile();
      const authUser = await api.dataGetUser();
      dispatch(setAuthUserActionCreator(authUser));
    } catch (error) {
      dispatch(setAuthUserActionCreator(null));
      dispatch(setErrorActionCreator(error.message)); // Dispatch the error message
    } finally {
      dispatch(setIsPreloadActionCreator(false)); // Mark preloading as finished
    }
    // dispatch(hideLoading()); // Stops the loading bar
  };
}
function asyncPreloadProcess() {
  return async (dispatch) => {
    // dispatch(showLoading()); // Starts the loading bar

    try {
      // const authUser = await api.getOwnProfile();
      const authUser = await api.dataUserTemp();
      dispatch(setAuthUserActionCreator(authUser));
    } catch (error) {
      dispatch(setAuthUserActionCreator(null));
      dispatch(setErrorActionCreator(error.message)); // Dispatch the error message
    } finally {
      dispatch(setIsPreloadActionCreator(false)); // Mark preloading as finished
    }
    // dispatch(hideLoading()); // Stops the loading bar
  };
}

function asyncAddBet(dataB) {
  return async (dispatch) => {
    // dispatch(showLoading()); // Starts the loading bar
    try {
      await api.commitBet(dataB);
      const authUser = await api.dataUserTemp();
      dispatch(setAuthUserActionCreator(authUser));
    } catch (error) {
      alert(error.message);
    }
    // dispatch(hideLoading()); // Stops the loading bar
  };
}

export {
  ActionType,
  setIsPreloadActionCreator,
  setErrorActionCreator, // Export the error action creator
  asyncPreloadProcess,
  asyncPreloadProcessTemp,
  // asyncPreloadProcessTemp,
  asyncAddBet,
};
