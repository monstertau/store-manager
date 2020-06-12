import { authHeader, authHeaderWithCT } from "../_utils";
export const billService = {
  createNewBuy,
  searchBuy,
  updateBuy,
  deleteBuy,
};

async function createNewBuy(newBuy) {
  const requestOption = {
    method: "POST",
    headers: authHeaderWithCT(),
    body: JSON.stringify(newBuy),
  };
  return fetch(`${process.env.REACT_APP_SERVER_URL}/api/v1/buys`, requestOption)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}

async function searchBuy(start, length, search) {
  const requestOption = {
    method: "POST",
    headers: authHeaderWithCT(),
    body: JSON.stringify({
      draw: "1",
      start: start,
      length: length,
      search: search,
    }),
  };
  return fetch(
    `${process.env.REACT_APP_SERVER_URL}/api/v1/search/buys`,
    requestOption
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}

async function getBuyInfo(id) {
  const requestOption = {
    method: "GET",
    headers: authHeader(),
  };
  return fetch(
    `${process.env.REACT_APP_SERVER_URL}/api/v1/buys/${id}`,
    requestOption
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}

async function updateBuy(buyInfo) {
  const requestOption = {
    method: "PUT",
    headers: authHeaderWithCT(),
    body: JSON.stringify(buyInfo),
  };
  return fetch(
    `${process.env.REACT_APP_SERVER_URL}/api/v1/buys/${buyInfo.id}`,
    requestOption
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}

async function deleteBuy(id) {
  const requestOption = {
    method: "DELETE",
    headers: authHeader(),
  };
  return fetch(
    `${process.env.REACT_APP_SERVER_URL}/api/v1/buys/${id}`,
    requestOption
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}
