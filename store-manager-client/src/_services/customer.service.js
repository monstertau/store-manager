import { authHeader, authHeaderWithCT } from "../_utils";
export const customerService = {
  getAll,
  addCustomer,
  updateCustomer,
  deleteCustomer,
};

async function getAll() {
  const requestOption = {
    method: "GET",
    headers: authHeader(),
  };
  return fetch(
    `${process.env.REACT_APP_SERVER_URL}/api/v1/customers`,
    requestOption
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}

async function addCustomer(newData) {
  // newData = { ...newData };
  console.log(newData);
  const requestOption = {
    method: "POST",
    headers: authHeaderWithCT(),
    body: JSON.stringify(newData),
  };
  // console.log(requestOption);
  return fetch(
    `${process.env.REACT_APP_SERVER_URL}/api/v1/customers`,
    requestOption
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}

async function updateCustomer(newData) {
  const requestOption = {
    method: "PUT",
    headers: authHeaderWithCT(),
    body: JSON.stringify(newData),
  };
  return fetch(
    `${process.env.REACT_APP_SERVER_URL}/api/v1/customers/${newData.id}`,
    requestOption
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}
async function deleteCustomer(id) {
  const requestOption = {
    method: "DELETE",
    headers: authHeader(),
  };
  return fetch(
    `${process.env.REACT_APP_SERVER_URL}/api/v1/customers/${id}`,
    requestOption
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      return data;
    });
}
