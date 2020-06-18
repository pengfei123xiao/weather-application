export const amPmConverter = (UNIX_timestamp, timezone) => {
  // console.log(`timezone: ${timezone}, type: ${typeof timezone}`);
  const res = new Date((UNIX_timestamp + timezone) * 1000);
  const hour = res.getUTCHours();
  const min = res.getUTCMinutes();
  const currTime = hour > 12 ? `${hour - 12}:${min}PM` : `${hour}:${min}AM`;
  return currTime;
}

export const timeConverter = (UNIX_timestamp, timezone) => {
  // Create a new JavaScript Date object based on the timestamp,
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  const res = new Date((UNIX_timestamp + timezone) * 1000);
  const monthsArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const daysArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  // console.log('res.getUTCDay()', res.getUTCDay());
  const day = daysArr[res.getUTCDay()];
  const year = res.getFullYear();
  // getMonth() returns an integer number between 0 and 11, 0 corresponds to January. 
  const month = monthsArr[res.getUTCMonth()];
  const date = res.getUTCDate();
  const currTime = amPmConverter(UNIX_timestamp, timezone)
  const time = `${day} - ${date} ${month} ${year} - ${currTime}`;
  return time;
}
