import regExps from '@/utils/validate/regExps';

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

export const vldEnglish = (value) => {
  if (regExps.english.test(value)) {
    return true;
  }

  return false;
};

export const vldAsyncFn = async () => {
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     console.log('222');
  //     resolve(true);
  //     resolve(false);
  //   }, 1000);
  // });

  return await fetch('https://jsonplaceholder.typicode.com/todos/1').then(function (response) {
    return response.status === 200 ? true : false;
    // return response.status === 200 ? false : true;
  });
};

export const vldSelect = (value) => {
  if (value) {
    return true;
  }

  return false;
};

export const vldCheck = (value) => {
  if (value) {
    return true;
  }

  return false;
};

export const vldCheckMultiple = (value, args) => {
  if (value.length >= args.min) {
    return true;
  }

  return false;
};
