import { userConstants } from "../_constants";

let user = window.localStorage.getItem("user");
const initialState = user ? { loggedIn: true, user } : {};
export const authentication = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userInfomation = (state = {}, action) => {
  switch (action.type) {
    case userConstants.GET_INFO_REQUEST:
      return {
        loadingProfile: true,
        
      };
    case userConstants.GET_INFO_SUCCESS:
      return {
        loadedProfile: true,
        userProfile: action.user,
      };
    case userConstants.GET_INFO_FAILURE:
      return {
        error: action.error,
      };
    case userConstants.UPDATE_INFO_REQUEST:
      return {
        loadingButton: true,
        updateProfile: action.userInfo,
      };
    case userConstants.UPDATE_INFO_SUCCESS:
      return {
        loadingButton: true,
        updated: true,
        updateResponse: action.response,
      };
    case userConstants.UPDATE_INFO_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
};
