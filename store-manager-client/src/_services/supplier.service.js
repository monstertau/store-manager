import { authHeader, authHeaderWithCT } from "../_utils";

export const supplierService = {
  createSupplier,
  getSupplierInfo,
  updateSupplierInfo,
  deleteSupplier,
  searchSupplier,
};
function searchSupplier(draw = 1, start=0, length=100, search={}) {

  const requestOption = {
    method: "POST",
    headers: authHeaderWithCT(),
    body: JSON.stringify({ draw, start, length, search }),
  };
  return fetch(
    `${process.env.REACT_APP_SERVER_URL}/api/v1/search/suppliers`,
    requestOption
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}
function createSupplier(supplier) {
  const requestOption = {
    method: "POST",
    headers: authHeaderWithCT(),
    body: JSON.stringify(supplier),
  };
  return fetch(
    `${process.env.REACT_APP_SERVER_URL}/api/v1/suppliers`,
    requestOption
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}
function getSupplierInfo(id) {
  const requestOption = {
    method: "GET",
    headers: authHeader(),
  };
  return fetch(
    `${process.env.REACT_APP_SERVER_URL}/api/v1/suppliers/${id}`,
    requestOption
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}
function updateSupplierInfo(supplier, id) {
  const requestOption = {
    method: "PUT",
    headers: authHeaderWithCT(),
    body: JSON.stringify(supplier),
  };
  return fetch(
    `${process.env.REACT_APP_SERVER_URL}/api/v1/suppliers/${id}`,
    requestOption
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}
function deleteSupplier(id) {
  const requestOption = {
    method: "DELETE",
    headers: authHeader(),
  };
  return fetch(
    `${process.env.REACT_APP_SERVER_URL}/api/v1/suppliers/${id}`,
    requestOption
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}
