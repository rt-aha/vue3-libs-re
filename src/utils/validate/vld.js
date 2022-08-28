import validator from '@/utils/validate/helper';

const vld = ({ value = '', ruleList = [], ruleError = {}, options, label }) => {
  const opts = {
    ...options,
    label,
  };

  validator.add(value, ruleList, ruleError, opts);

  return new Promise((resolve) => {
    try {
      const result = validator.start();
      resolve(result);
    } catch (e) {
      resolve(false);
    }
  });
};

export { vld };
