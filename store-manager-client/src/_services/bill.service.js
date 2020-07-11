import { authHeader, authHeaderWithCT } from "../_utils";
export const billService = {
  createNewSell,
  searchSell,
  updateSell,
  deleteSell,
  getSellInfo,
};

async function createNewSell(newBuy) {
  const requestOption = {
    method: "POST",
    headers: authHeaderWithCT(),
    body: JSON.stringify(newBuy),
  };
  return fetch(
    `${process.env.REACT_APP_SERVER_URL}/api/v1/sells`,
    requestOption
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}

async function searchSell(start, length, search) {
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
    `${process.env.REACT_APP_SERVER_URL}/api/v1/search/sells`,
    requestOption
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}

async function getSellInfo(id) {
  const requestOption = {
    method: "GET",
    headers: authHeader(),
  };
  return fetch(
    `${process.env.REACT_APP_SERVER_URL}/api/v1/sells/${id}`,
    requestOption
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}

async function updateSell(sellInfo) {
  const requestOption = {
    method: "PUT",
    headers: authHeaderWithCT(),
    body: JSON.stringify(sellInfo),
  };
  return fetch(
    `${process.env.REACT_APP_SERVER_URL}/api/v1/sells/${sellInfo.id}`,
    requestOption
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}

async function deleteSell(id) {
  const requestOption = {
    method: "DELETE",
    headers: authHeader(),
  };
  return fetch(
    `${process.env.REACT_APP_SERVER_URL}/api/v1/sells/${id}`,
    requestOption
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}
