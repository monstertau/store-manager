let user = JSON.parse(localStorage.getItem("user"));

export function authHeader() {
  // return authorization header with jwt token
  if (user && user.token) {
    return { Authorization: "Bearer " + user.token };
  } else {
    return {};
  }
}
export function authHeaderWithCT() {
  if (user && user.token) {
    return {
      Authorization: "Bearer " + user.token,
      "Content-Type": "application/json",
    };
  } else {
    return {};
  }
}
