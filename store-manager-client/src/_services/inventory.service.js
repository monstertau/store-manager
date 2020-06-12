import { authHeader, authHeaderWithCT } from "../_utils";
export const inventoryService = {
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};

async function getProduct(start, length, search) {
  const draw = {
    draw: 1,
    start: start,
    length: length,
    search: { value: search },
  };
  const requestOption = {
    method: "POST",
    headers: authHeaderWithCT(),
    body: JSON.stringify(draw),
  };
  return fetch(
    `${process.env.REACT_APP_SERVER_URL}/api/v1/search/products/`,
    requestOption
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      return data;
    });
}

async function addProduct(newData) {
  const requestOption = {
    method: "POST",
    headers: authHeaderWithCT(),
    body: JSON.stringify(newData),
  };
  return fetch(
    `${process.env.REACT_APP_SERVER_URL}/api/v1/products`,
    requestOption
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      return data;
    });
}

async function updateProduct(newData) {
  const requestOption = {
    method: "PUT",
    headers: authHeaderWithCT(),
    body: JSON.stringify(newData),
  };
  return fetch(
    `${process.env.REACT_APP_SERVER_URL}/api/v1/products/${newData.id}`,
    requestOption
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      return data;
    });
}

async function deleteProduct(id) {
  const requestOption = {
    method: "DELETE",
    headers: authHeader(),
  };
  return fetch(
    `${process.env.REACT_APP_SERVER_URL}/api/v1/products/${id}`,
    requestOption
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      return data;
    });
}

// async function searchProduct(value, name, unit, barcode) {

// }
