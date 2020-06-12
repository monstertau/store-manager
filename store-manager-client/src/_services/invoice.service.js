import { authHeader, authHeaderWithCT } from "../_utils";
export const invoiceService = {
  createInvoice,
  searchInvoice,
  updateInvoice,
  deleteInvoice,
};

async function createInvoice(invoice) {
  const requestOption = {
    method: "POST",
    headers: authHeaderWithCT(),
    body: JSON.stringify(invoice),
  };
  return fetch(
    `${process.env.REACT_APP_SERVER_URL}/api/v1/invoices`,
    requestOption
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}
async function searchInvoice(start, length, search) {
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
    `${process.env.REACT_APP_SERVER_URL}/api/v1/search/invoices`,
    requestOption
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}

async function updateInvoice(invoice) {
  const requestOption = {
    method: "PUT",
    headers: authHeaderWithCT(),
    body: JSON.stringify(invoice),
  };
  return fetch(
    `${process.env.REACT_APP_SERVER_URL}/api/v1/invoices/${invoice.id}`,
    requestOption
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}

async function deleteInvoice(id) {
  const requestOption = {
    method: "DELETE",
    headers: authHeader(),
  };
  return fetch(
    `${process.env.REACT_APP_SERVER_URL}/api/v1/invoices/${id}`,
    requestOption
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}
