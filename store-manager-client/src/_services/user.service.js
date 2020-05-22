function login(username, password) {
  const requestOption = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  };
  return fetch(`${process.env.REACT_APP_SERVER_URL}/api/v1/login`, requestOption)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}
function logout(){

} 
export const userService = {
  login,
  logout,
};