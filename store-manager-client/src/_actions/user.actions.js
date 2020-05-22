import { userConstants } from "../_constants";
import { userService } from "../_services";
import { alertActions } from "./alert.actions";
import { history } from "../_utils";
export const userActions = {
  login,
  logout,
};

function login(username, password) {
  return (dispatch) => {
    dispatch(request({ username }));
    userService.login(username, password).then((user) => {
      if (user.success === true) {
        dispatch(
          success({
            fullname: user.name,
            email: user.email,
            username: user.username,
            tokenType: user.tokenType,
            token: user.accessToken,
          })
        );
        dispatch(alertActions.success("Login Success."));
        history.push("/");
      } else {
        dispatch(failure(user.code));
        if (user.code === "unauthorized") {
          dispatch(alertActions.error("Wrong Username or Password!"));
        }
        if (user.code === "argument_not_valid") {
          dispatch(
            alertActions.error("Username or Password must not be blank!")
          );
        }
      }
      
    });
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}
function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}
