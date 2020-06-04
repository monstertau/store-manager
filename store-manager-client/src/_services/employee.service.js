import { authHeader, authHeaderWithCT } from "../_utils";
import { validateService } from "./validate.service";
export const employeeService = {
  getAll,
  addUser,
  updateUser,
  deleteUser,
  compareUser,
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
  let roles = [];
  if (newData.roles) {
    roles.push(newData.roles);
    // console.log(roles);
  }
  newData = await { ...newData, roles: roles, password: "1" };
  // console.log(newData);
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
    console.log(newData.roles);
    let roles = [];
    roles.push(newData.roles);
    newData.roles = await roles;
  }
  const requestOption = {
    method: "PUT",
    headers: authHeaderWithCT(),
    body: JSON.stringify(newData),
  };
  console.log(requestOption);
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
async function compareUser(user1, user2) {
  return (
    JSON.stringify(Object.assign({}, { ...user1, tableData: "" })) ===
    JSON.stringify(Object.assign({}, { ...user2, tableData: "" }))
  );
}
