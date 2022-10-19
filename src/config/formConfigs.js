import { countiesOptions, genderOptions, incomeOptions, occupationOptions } from '@/config/options.js';
import taiwanCitiesRegions from '@/config/taiwanCitiesRegions';

const cityRegionForSelectOptions = taiwanCitiesRegions.map((city) => {
  return {
    key: city.name,
    options: city.region.map(region => ({ label: region.name, value: region.name })),
  };
});

const cityOptions = taiwanCitiesRegions.map((city) => {
  return {
    label: city.name,
    value: city.code,
  };
});

export const basicFormConfig = [
  {
    compName: 'Input',
    formKey: 'inputVal',
    formItem: {
      label: '一般輸入框',
      hint: '(Input)',
      required: true,
    },
    layout: {
      768: 12,
    },
  },

  {
    compName: 'Input',
    compProps: {
      disabled: true,
    },
    formKey: 'inputValDisabled',
    formItem: {
      label: '輸入框禁用',
      hint: '(Input)',
      required: true,
    },
    layout: {
      768: 12,
    },
  },
  {
    compName: 'Input',
    compProps: {
      type: 'password',
    },
    formKey: 'inputValPassword',
    formItem: {
      label: '密碼輸入框',
      hint: '(Input)',
      required: true,
    },
  },
  {
    compName: 'InputNumber',
    formItem: {
      label: '數字輸入框',
      hint: '(InputNumber)',
    },
    formKey: 'inputNumberVal',
  },
  {
    compName: 'InputNumber',
    compProps: {
      disabled: true,
    },
    formItem: {
      label: '數字輸入框，禁用',
      hint: '(InputNumber)',
    },
    formKey: 'inputNumberValDisabled',
  },
  {
    compName: 'InputNumber',
    compProps: {
      step: 2,
    },
    formItem: {
      label: '數字輸入框，階層',
      hint: '(InputNumber)',
    },
    formKey: 'inputNumberValStep',
  },
  {
    compName: 'InputNumber',
    compProps: {
      min: 0,
      max: 5,
    },
    formItem: {
      label: '數字輸入框，最大值最小值(0~5)',
      hint: '(InputNumber)',
    },
    formKey: 'inputNumberMinMax',
  },
  {
    compName: 'InputNumber',
    compProps: {
      min: 0,
      max: 5,
      step: 2,
    },
    formItem: {
      label: '數字輸入框，階層(2)與最大值最小值(0~5)',
      hint: '(InputNumber)',
    },
    formKey: 'inputNumberStepMinMax',
  },

  {
    compName: 'Select',
    compProps: {
      options: genderOptions,
    },
    formKey: 'selectVal',
    formItem: {
      label: '選擇器',
      hint: '(Select)',
    },
  },
  {
    compName: 'Select',
    compProps: {
      options: cityOptions,
      multiple: true,
      disabled: true,
    },
    formKey: 'selectDisabled',
    formItem: {
      label: '選擇器，禁用',
      hint: '(Select)',
    },
  },
  {
    compName: 'Select',
    compProps: {
      options: cityOptions,
      multiple: true,
    },
    formKey: 'selectValMultiple',
    formItem: {
      label: '選擇器，多選',
      hint: '(Select)',
    },
  },
  {
    compName: 'Radio',
    compProps: {
      options: genderOptions,
    },
    formKey: 'radioVal',
    formItem: {
      label: '單選',
      hint: '(Radio)',
    },
  },
  {
    compName: 'Radio',
    compProps: {
      options: genderOptions,
      disabled: true,
    },
    formKey: 'radioValDisabled',
    formItem: {
      label: '單選，禁用',
      hint: '(Radio)',
    },
  },
  {
    compName: 'Checkbox',
    compProps: {
      label: '同意',
    },
    formKey: 'checkboxVal',
    formItem: {
      label: '選取器',
      hint: '(Checkbox)',
    },
  },
  {
    compName: 'Checkbox',
    compProps: {
      label: '同意',
      disabled: true,
    },
    formKey: 'checkboxValDisabled',
    formItem: {
      label: '選取器，禁用',
      hint: '(Checkbox)',
    },
  },

  {
    compName: 'CheckboxGroup',
    compProps: {
      options: occupationOptions,
    },
    formKey: 'checkboxGroupVal',
    formItem: {
      label: '職業',
      hint: '(CheckboxGroup)',
    },
  },
  {
    compName: 'CheckboxGroup',
    compProps: {
      options: occupationOptions,
      disabled: true,
    },
    formKey: 'checkboxGroupValDisabled',
    formItem: {
      label: '職業，禁用',
      hint: '(CheckboxGroup)',
    },
  },
  {
    compName: 'Switch',
    formKey: 'switchVal',
    formItem: {
      label: '啟用',
      hint: '(Switch)',
    },
  },
  {
    compName: 'Switch',
    compProps: {
      disabled: true,
    },
    formKey: 'switchValueDisabled',
    formItem: {
      label: '啟用，禁用',
      hint: '(Switch)',
    },
  },
  // {
  //   compName: 'Checkbox',
  //   compProps: {
  //     label: '我同意',
  //   },
  //   formKey: 'agree',
  //   formItem: {
  //     label: '同意書',
  //     hint: '(Checkbox)',
  //   },
  // },
  // {
  //   compName: 'CheckboxGroup',
  //   compProps: {
  //     options: occupationOptions,
  //   },
  //   formKey: 'occupation',
  //   formItem: {
  //     label: '職業',
  //     hint: '(CheckboxGroup)',
  //   },
  // },
  // {
  //   compName: 'Switch',
  //   formKey: 'enable',
  //   formItem: {
  //     label: '啟用',
  //     hint: '(Switch)',
  //   },
  // },
  // {
  //   compName: 'Textarea',
  //   formKey: 'remark',
  //   formItem: {
  //     label: '備註',
  //     hint: '(Textarea)',
  //   },
  // },
  // {
  //   compName: 'TimePicker',
  //   formKey: 'time',
  //   formItem: {
  //     label: '時間',
  //     hint: '(TimePicker)',
  //   },
  // },
  // {
  //   compName: 'DatePicker',
  //   formKey: 'date',
  //   formItem: {
  //     label: '日期選擇',
  //     hint: '(DatePicker)',
  //   },
  // },
  // {
  //   compName: 'DateRangePicker',
  //   formKey: 'dateRange',
  //   formItem: {
  //     label: '時間範圍選擇',
  //     hint: '(DateRangePicker)',
  //   },
  // },
  // {
  //   compName: 'EmailAutoComplete',
  //   formKey: 'email',
  //   formItem: {
  //     label: 'Email',
  //     hint: '(EmailAutoComplete)',
  //   },
  // },
  // {
  //   compName: 'Upload',
  //   formKey: 'upload',
  //   formItem: {
  //     label: '圖片',
  //     hint: '(Upload)',
  //   },
  // },
  // {
  //   compName: 'InputList',
  //   formKey: 'multipleInput',
  //   formItem: {
  //     label: '多輸入框',
  //     hint: '(InputList)',
  //   },
  // },
  // {
  //   compName: 'Slider',
  //   formKey: 'slider',
  //   formItem: {
  //     label: '滑塊',
  //     hint: '(Slider)',
  //   },
  // },
  // {
  //   compName: 'MdEditor',
  //   formKey: 'mdEditor',
  //   formItem: {
  //     label: 'Markdown 編輯器',
  //     hint: '(MdEditor)',
  //   },
  // },
].reverse();

export const dependencyFormConfig = [
  {
    compName: 'Select',
    compProps: {
      options: cityOptions,
    },
    formKey: 'city',
    formItem: {
      label: '縣市',
    },
  },
  {
    compName: 'DependenceSelect',
    formKey: 'region',
    extraFormKey: 'city',
    formItem: {
      label: '區/鄉/鎮',
    },
    dependenceOptions: cityRegionForSelectOptions,
  },
];

export const multiMultiFormConfig = [
  {
    // 這是個一個神奇的功能！
    compName: 'MultiMultiCheckboxGroup',
    compProps: {
      options: countiesOptions,
    },
    formKey: 'mulltiCities',
    formItem: {
      label: '需求區域',
      hint: '可複選',
    },
    layout: {
      768: 24,
    },
  },
];
