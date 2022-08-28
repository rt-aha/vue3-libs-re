// import regExps from '@/utils/validate/regExps';

export const vldRequired = (value, errMsg, rule, args) => {
  if (value) {
    return true;
  }

  return false;
};

export const vldLengthMoreThen = (value, errMsg, rule, args = 6) => {
  if (value.length >= args) {
    return true;
  }

  return false;
};
