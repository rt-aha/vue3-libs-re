const toCamel = (name) => {
  // 驗證格式對不對
  const regExp = /[^A-Za-z-]/;
  const isValidate = regExp.test(name);
  if (isValidate) {
    throw new Error('格式錯誤');
  }

  return name.replace(/-\w/g, (matchValue) => matchValue.slice(1).toUpperCase());
};

export { toCamel };
