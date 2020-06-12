import { authHeader, authHeaderWithCT } from "../_utils";
export const reportService = {
  getReport,
};

function getReport(length, start, end) {
  const requestOption = {
    method: "POST",
    headers: authHeaderWithCT(),
    body: JSON.stringify({ length, start, end }),
  };
  return fetch(
    `${process.env.REACT_APP_SERVER_URL}/api/v1/reports/1`,
    requestOption
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}
