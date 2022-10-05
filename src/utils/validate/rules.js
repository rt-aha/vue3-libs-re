import regExps from '@/utils/validate/regExps';

export const vldRequired = (value) => {
  if (value) {
    return true;
  }

  return false;
};

export const vldRadio = (value) => {
  if (value) {
    return true;
  }

  return false;
};

export const vldCheckbox = (value) => {
  if (Array.isArray(value)) {
    if (value.length > 0) {
      return true;
    }
  }

  return false;
};

export const vldCheckboxGroup = (value) => {
  if (Array.isArray(value)) {
    if (value.length > 0) {
      return true;
    }
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

  return await fetch('https://jsonplaceholder.typicode.com/todos/1').then((response) => {
    return response.status === 200;
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

export const vldNumberMoreThen = (value, args) => {
  console.log('value', value);

  if (value >= args.min) {
    return true;
  }

  return false;
};

export const vldBoughtCustomer = (value, args, opt) => {
  console.log('opt', opt.relatedValue());

  const { boughtProject, boughtCustomerName, boughtCustomerRelationship } = opt.relatedValue();

  if (value) {
    if (boughtProject && boughtCustomerName && boughtCustomerRelationship) {
      return true;
    }

    return false;
  }
  else {
    return true;
  }
};

export const vldNotBuyCustomer = (value, args, opt) => {
  const { notBuyCustomerName, notBuyCustomerRelatioship } = opt.relatedValue();

  if (value) {
    if (notBuyCustomerName && notBuyCustomerRelatioship) {
      return true;
    }

    return false;
  }
  else {
    return true;
  }
};

export const vldStayMins = (value, args, opt) => {
  const { stayTimeMins } = opt.relatedValue();

  if (Number(stayTimeMins) <= 0) {
    if (value <= 0) {
      return false;
    }
  }

  return true;
};
