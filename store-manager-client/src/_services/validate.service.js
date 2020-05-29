export const validateService = {
  validateEmail,
  validateMobileNumber,
};
async function validateEmail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
}

async function validateMobileNumber(mobileNumber) {
  let vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
  return vnf_regex.test(mobileNumber);
}
