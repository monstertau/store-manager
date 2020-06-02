import { authHeader, authHeaderWithCT } from "../_utils";
export const userService = {
  login,
  logout,
  getUserInfo,
  updateUserInfo,
  changePassword,
};
function login(username, password) {
  const requestOption = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  };
  return fetch(
    `${process.env.REACT_APP_SERVER_URL}/api/v1/login`,
    requestOption
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.success === true) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            tokenType: data.tokenType,
            token: data.accessToken,
          })
        );
      }
      return data;
    });
}
function logout() {
  localStorage.removeItem("user");
}
function getUserInfo() {
  const requestOption = {
    method: "GET",
    headers: authHeader(),
  };
  console.log(authHeader());
  return fetch(`${process.env.REACT_APP_SERVER_URL}/api/v1/me`, requestOption)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}
function updateUserInfo(UserInfo) {
  const requestOption = {
    method: "PUT",
    headers: authHeaderWithCT(),
    body: JSON.stringify(UserInfo),
  };
  return fetch(`${process.env.REACT_APP_SERVER_URL}/api/v1/me`, requestOption)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}
function changePassword(oldPassword, newPassword) {
  const requestOption = {
    method: "PUT",
    headers: authHeaderWithCT(),
    body: JSON.stringify({ oldPassword, newPassword }),
  };
  return fetch(
    `${process.env.REACT_APP_SERVER_URL}/api/v1/me/change_password`,
    requestOption
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.accessToken) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            tokenType: data.tokenType,
            token: data.accessToken,
          })
        );
      }
      console.log(data);
      return data;
    });
}
