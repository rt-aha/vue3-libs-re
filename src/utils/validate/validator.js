import * as allRules from '@/utils/validate/rules';
import * as errorMessage from '@/utils/validate/errorMessage';

const validator = {
  ruleList: [],

  async vldFunc(value, ruleData) {
    const { name, args } = ruleData;
    const isPass = await allRules[name](value, args);

    if (!isPass) {
      return this.errMsg(name, ruleData);
    }
  },

  // 回傳錯誤訊息
  errMsg(name, ruleData) {
    const { cusError } = ruleData;

    const errName = cusError || name;
    const errorMessage = this.getErrorMessage(errName, ruleData);

    return {
      rule: name,
      errorMessage,
      isPass: false,
    };
  },

  // 取得錯誤訊息
  getErrorMessage(name, ruleData) {
    return errorMessage[name](ruleData);
  },

  // 開始驗證
  async start() {
    for (const fn of this.ruleList) {
      const msg = await fn();

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
    const { label, ruleList, options } = ruleData;

    this.ruleList = ruleList.map((r) => {
      const data = {
        ...r,
        label,
        options,
      };
      return this.vldFunc.bind(this, value, data);
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
    }
    catch (e) {
      resolve(false);
    }
  });
};

export default validator;
export { vld };
