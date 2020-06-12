export function numberWithCommas(value) {
  if (Number.isInteger(value)) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return value;
}
