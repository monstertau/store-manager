export const validateService = {
  validateEmail,
  validateMobileNumber,
  compareUser,
};
async function validateEmail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return false;
  }
  return true;
}

async function validateMobileNumber(mobileNumber) {
  let vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
  return await !vnf_regex.test(mobileNumber);
}

async function compareUser(user1, user2) {
  return (
    JSON.stringify(Object.assign({}, { ...user1, tableData: "" })) ===
    JSON.stringify(Object.assign({}, { ...user2, tableData: "" }))
  );
}
