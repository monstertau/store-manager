import { authHeader, authHeaderWithCT } from "../_utils";
export const employeeService = {
  getAll,
  addUser,
  updateUser,
  deleteUser,
};
async function getAll() {
  const requestOption = {
    method: "GET",
    headers: authHeader(),
  };
  return fetch(
    `${process.env.REACT_APP_SERVER_URL}/api/v1/users`,
    requestOption
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}
async function addUser(newData) {
  newData = { ...newData, password: "1" };
  console.log(newData);
  const requestOption = {
    method: "POST",
    headers: authHeaderWithCT(),
    body: JSON.stringify(newData),
  };
  // console.log(requestOption);
  return fetch(
    `${process.env.REACT_APP_SERVER_URL}/api/v1/users`,
    requestOption
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}
async function updateUser(newData) {
  if (!Array.isArray(newData.roles)) {
    let roles = [];
    roles.push(newData.roles);
    // console.log(roles);
    newData.roles = await roles;
  }
  const requestOption = {
    method: "PUT",
    headers: authHeaderWithCT(),
    body: JSON.stringify(newData),
  };
  return fetch(
    `${process.env.REACT_APP_SERVER_URL}/api/v1/users/${newData.id}`,
    requestOption
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}
async function deleteUser(id) {
  const requestOption = {
    method: "DELETE",
    headers: authHeader(),
  };
  return fetch(
    `${process.env.REACT_APP_SERVER_URL}/api/v1/users/${id}`,
    requestOption
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      return data;
    });
}
