import { authHeader } from "../_utils";
export const userService = {
  login,
  logout,
  getAll
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
        window.localStorage.setItem(
          "user",
          JSON.stringify({
            fullname: data.name,
            email: data.email,
            username: data.username,
            tokenType: data.tokenType,
            token: data.accessToken,
          })
        );
      }
      return data;
    });
}
function logout() {
  window.localStorage.removeItem("user");
}
function getAll() {
  const requestOption = {
    method: "GET",
    headers: authHeader(),
  };
  return fetch(
    `${process.env.REACT_APP_SERVER_URL}/api/v1/users/1`,
    requestOption
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}
