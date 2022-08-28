// import regExps from '@/utils/validate/regExps';

export const vldRequired = (value) => {
  if (value) {
    return true;
  }

  return false;
};

export const vldLengthMoreThen = (value, args) => {
  if (value.length >= args.min) {
    return true;
  }

  return false;
};
