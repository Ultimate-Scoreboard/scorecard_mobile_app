const capLetterOne = (string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const truncName = (name) => {
  if (name.length < 10) return name;
  return name.slice(0, 10) + "...";
};

export default {
  capLetterOne,
  truncName,
};
