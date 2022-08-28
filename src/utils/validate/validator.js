import * as allRules from '@/utils/validate/rules';
import * as errorMessage from '@/utils/validate/errorMessage';

const validator = {
  ruleList: [],

  vldFunc(value, ruleData) {
    const { name, args } = ruleData;
    const isPass = allRules[name](value, args);

    if (!isPass) {
      return this.errMsg(name, ruleData);
    }
  },

  // 取得錯誤訊息
  getErrorMessage(rule, args, options) {
    return errorMessage[rule](args, options);
  },

  // 回傳錯誤訊息
  errMsg(name, ruleData) {
    const { cusError, args, options } = ruleData;

    let errorMessage = '';
    if (cusError) {
      errorMessage = this.getErrorMessage(cusError, args, options);
    } else {
      errorMessage = this.getErrorMessage(name, args, options);
    }

    return {
      rule: name,
      errorMessage,
      isPass: false,
    };
  },

  // 開始驗證
  start() {
    for (const fn of this.ruleList) {
      const msg = fn();

      if (msg) {
        return msg;
      }
    }

    this.cleanRuleList();
    return {
      isPass: true,
    };
  },

  // 將驗證規則加入陣列
  add(value, ruleData) {
    const { ruleList } = ruleData;

    this.ruleList = ruleList.map((r) => {
      return this.vldFunc.bind(this, value, r);
    });
  },

  cleanRuleList() {
    this.ruleList = [];
  },
};

// , ruleError = {}, options,
const vld = (value = '', { label, ruleList = [], options }) => {
  validator.add(value, {
    ruleList,
    label,
    options,
  });

  return new Promise((resolve) => {
    try {
      const result = validator.start();
      resolve(result);
    } catch (e) {
      resolve(false);
    }
  });
};

export default validator;
export { vld };
