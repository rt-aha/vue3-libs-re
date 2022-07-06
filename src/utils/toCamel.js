const toCamel = (name) => {
  const splitNameList = name.split('-');

  const upperCamel = [];

  splitNameList.forEach((str) => {
    const upperStr = str[0].toUpperCase() + str.slice(1);
    upperCamel.push(upperStr);
  });

  const reuslt = upperCamel.join('');

  return reuslt;
};

export { toCamel };
