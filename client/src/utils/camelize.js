function camelize(str) {
  let arr = str.split("-");
  let capital = arr.map((item, index) =>
    index
      ? item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
      : item.toLowerCase()
  );

  let capitalString = capital.join("");

  return capitalString;
}

export default camelize;
