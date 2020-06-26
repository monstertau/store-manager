export {
  getFullCurrentDate,
  getToday,
  getLastMonth,
  getLastYear,
  getTime,
  getYesterday,
};
// var newDate = new Date();
async function getFullCurrentDate(newDate, separator) {
  let date = await newDate.getDate();
  let month = (await newDate.getMonth()) + 1;
  let year = await newDate.getFullYear();

  return await `${year}${separator}${
    month < 10 ? `0${month}` : `${month}`
  }${separator}${date}`;
}

async function getToday(today) {
  return (await getFullCurrentDate(today, "-")) + " " + (await getTime());
}
async function getYesterday(today) {
  let yesterday = new Date(today - 86400000);
  return (await getFullCurrentDate(yesterday, "-")) + " " + (await getTime());
}

async function getLastMonth(today) {
  let lastMonth = new Date(today.setMonth(today.getMonth() - 1));
  return (await getFullCurrentDate(lastMonth, "-")) + " " + (await getTime());
}

async function getLastYear(today) {
  let lastYear = new Date(today.setFullYear(today.getFullYear() - 1));
  return (await getFullCurrentDate(lastYear, "-")) + " " + (await getTime());
}

async function getTime() {
  var newDate = new Date();
  var hh = await newDate.getHours();
  var mm = await newDate.getMinutes();
  var ss = await newDate.getSeconds();
  hh = hh < 10 ? "0" + hh : hh;
  mm = mm < 10 ? "0" + mm : mm;
  ss = ss < 10 ? "0" + ss : ss;
  let curr_time = await (hh + ":" + mm + ":" + ss);
  return await curr_time;
}
