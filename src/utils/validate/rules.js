import regExps from '@/utils/validate/regExp';

export const vldRequired = (value, errMsg, rule, args) => {
  console.log('111', value);
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
