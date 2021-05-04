const capLetterOne = (string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const truncName = (name) => {
  if (name.length < 10) return name;
  return name.slice(0, 10) + "\n" + name.slice(10, 18) + "...";
};

const blankPlayer = {
  name: "",
  points: [{ points: 0, set: 1 }],
  history: [],
};

const convertTimestamp = (time) => {
  const date = new Date(time);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;
};

const convertMS = (time) => {
  const addZero = (value) => (value < 10 ? `0${String(value)}` : String(value));
  const hours = Math.floor(time / (1000 * 60 * 60));
  const minutes = Math.floor((time / (1000 * 60)) % 60);
  const seconds = Math.floor((time / 1000) % 60);
  const milliseconds = Math.floor((time % 1000) / 10);

  return `${hours > 0 ? addZero(hours) + ":" : ""}${
    minutes > 0 || hours > 0 ? addZero(minutes) + ":" : ""
  }${minutes > 0 || hours > 0 ? addZero(seconds) : seconds}.${addZero(
    milliseconds
  )}`;
};

const timeInterval = 10;

export default {
  capLetterOne,
  truncName,
  blankPlayer,
  convertTimestamp,
  convertMS,
  timeInterval,
};
