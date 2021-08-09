const string_reverser = (str) => {
  if (typeof str !== "string") {
    str = `${str}`;
  }
  return str
    .split("")
    .reverse()
    .join("");
};

export default string_reverser;
