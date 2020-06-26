import { authHeader, authHeaderWithCT } from "../_utils";
export const dashBoard = {
  getDash,
};

async function getDash(start, end) {
  const requestOption = {
    method: "POST",
    headers: authHeaderWithCT(),
    body: JSON.stringify({
      start: start,
      end: end,
    }),
  };
  return fetch(
    `${process.env.REACT_APP_SERVER_URL}/api/v1/dashboard/overall`,
    requestOption
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}
