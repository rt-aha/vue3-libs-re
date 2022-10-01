import { vld } from '@/utils/validate/validator';

export const checkRequired = (trigger = ['input']) => {
  return {
    trigger,
    validator: ({ value, label }) => {
      return vld(value, {
        label,
        ruleList: [
          {
            name: 'vldRequired',
            cusError: 'vldRequiredWithLabel',
          },
        ],
      });
    },
  };
};

export const checkRadio = (trigger = ['change']) => {
  return {
    trigger,
    validator: ({ value, label }) => {
      return vld(value, {
        label,
        ruleList: [
          {
            name: 'vldRadio',
          },
        ],
      });
    },
  };
};

export const checkCheckbox = (trigger = ['change'], min = 1) => {
  return {
    trigger,
    validator: ({ value, label }) => {
      return vld(value, {
        label,
        ruleList: [
          {
            name: 'vldCheckbox',
            args: {
              min,
            },
          },
        ],
      });
    },
  };
};

export const checkCheckboxGroup = (trigger = ['change'], min = 1) => {
  return {
    trigger,
    validator: ({ value, label }) => {
      return vld(value, {
        label,
        ruleList: [
          {
            name: 'vldCheckboxGroup',
            args: {
              min,
            },
          },
        ],
      });
    },
  };
};

export const checkSelect = (trigger = ['change']) => {
  return {
    trigger,
    validator: ({ value, label }) => {
      return vld(value, {
        label,
        ruleList: [
          {
            name: 'vldSelect',
            cusError: 'vldSelectWithLabel',
          },
        ],
      });
    },
  };
};

export const checkNumberMoreThen = (trigger = ['input'], min = 1) => {
  return {
    trigger,
    validator: ({ value, label }) => {
      return vld(value, {
        label,
        ruleList: [
          {
            name: 'vldNumberMoreThen',
            args: {
              min,
            },
          },
        ],
      });
    },
  };
};

export const checkBoughtCustomer = (trigger = [], relatedValue) => {
  return {
    trigger,
    validator: ({ value, label }) => {
      return vld(value, {
        label,
        ruleList: [
          {
            name: 'vldBoughtCustomer',
          },
        ],
        options: {
          relatedValue,
        },
      });
    },
  };
};

export const checkNotBuyCustomer = (trigger = [], relatedValue) => {
  return {
    trigger,
    validator: ({ value, label }) => {
      return vld(value, {
        label,
        ruleList: [
          {
            name: 'vldNotBuyCustomer',
          },
        ],
        options: {
          relatedValue,
        },
      });
    },
  };
};

export const checkStayMins = (trigger = ['input'], relatedValue) => {
  return {
    trigger,
    validator: ({ value, label }) => {
      return vld(value, {
        label,
        ruleList: [
          {
            name: 'vldStayMins',
          },
        ],
        options: {
          relatedValue,
        },
      });
    },
  };
};
