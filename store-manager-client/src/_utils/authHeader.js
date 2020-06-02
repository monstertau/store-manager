
export function authHeader() {
  let user = JSON.parse(localStorage.getItem("user"));
  // return authorization header with jwt token
  if (user && user.token) {
    return { Authorization: "Bearer " + user.token };
  } else {
    return {};
  }
}
export function authHeaderWithCT() {
  let user = JSON.parse(localStorage.getItem("user"));
  if (user && user.token) {
    return {
      Authorization: "Bearer " + user.token,
      "Content-Type": "application/json",
    };
  } else {
    return {};
  }
}
