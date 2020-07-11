import { authHeader, authHeaderWithCT } from "../_utils";
import { validateService } from "./validate.service";
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
  let roles = [];
  if (newData.roles) {
    roles.push(newData.roles[0]);
    console.log(roles);
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
  // let roles = [];
  // if (!Array.isArray(newData.roles)) {
  // roles.push(newData.roles);
  // }
  newData.roles = await Object.values(newData.roles);
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
