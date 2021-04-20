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

export default {
  capLetterOne,
  truncName,
  blankPlayer,
};
