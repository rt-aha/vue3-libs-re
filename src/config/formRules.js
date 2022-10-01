import {
  checkRequired,
  checkRadio,
  checkCheckbox,
  checkCheckboxGroup,
  checkSelect,
  checkNumberMoreThen,
} from '@/utils/validate/generalValidator';

import { vld } from '@/utils/validate/validator';

export const basicFormRule = {
  account: {
    trigger: ['input'],
    validator: ({ value, label }) => {
      return vld(value, {
        label,
        ruleList: [
          // 基本使用
          {
            name: 'vldRequired',
          },
          // 帶參數
          {
            // name: 規則名稱
            name: 'vldLengthMoreThen',
            // args: 定義參數
            args: {
              min: 6,
            },
          },
          // 自訂錯誤訊息
          {
            name: 'vldEnglish',
            // cusError: 自定義名字錯誤訊息名稱(寫在 errorMessage 中)
            cusError: 'cusVldEnglish',
          },
          // 非同步
          {
            name: 'vldAsyncFn',
          },
        ],
        options: {
          test: 'hi',
        },
        // 若另外設定，就走另外設定的
      });
    },
  },
  password: checkRequired(),
  gender: checkSelect(),
  income: checkRadio(),
  agree: checkCheckbox(),
  occupation: checkCheckboxGroup(),
  height: checkNumberMoreThen(),
};

export const dependencyFormRule = {
  city: checkRequired(),
  region: checkRequired(),
};
