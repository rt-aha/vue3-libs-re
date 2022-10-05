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
    value: city.name,
  };
});

export const basicFormConfig = [
  {
    compName: 'Input',
    formKey: 'account',
    formItem: {
      label: '帳號',
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
    formItem: {
      label: '密碼',
      hint: '(Input)',
    },
    formKey: 'password',
    layout: {
      768: 12,
    },
  },
  {
    compName: 'InputNumber',
    formItem: {
      label: '身高',
      hint: '(InputNumber)',
    },
    formKey: 'height',
  },
  {
    compName: 'Select',
    compProps: {
      options: genderOptions,
    },
    formKey: 'gender',
    formItem: {
      label: '性別',
      hint: '(Select)',
    },
  },
  {
    compName: 'Radio',
    compProps: {
      options: incomeOptions,
    },
    formKey: 'income',
    formItem: {
      label: '收入',
      hint: '(Radio)',
    },
  },
  {
    compName: 'Checkbox',
    compProps: {
      label: '我同意',
    },
    formKey: 'agree',
    formItem: {
      label: '同意書',
      hint: '(Checkbox)',
    },
  },
  {
    compName: 'CheckboxGroup',
    compProps: {
      options: occupationOptions,
    },
    formKey: 'occupation',
    formItem: {
      label: '職業',
      hint: '(CheckboxGroup)',
    },
  },
  {
    compName: 'Switch',
    formKey: 'enable',
    formItem: {
      label: '啟用',
      hint: '(Switch)',
    },
  },
  {
    compName: 'Textarea',
    formKey: 'remark',
    formItem: {
      label: '備註',
      hint: '(Textarea)',
    },
  },
  {
    compName: 'TimePicker',
    formKey: 'time',
    formItem: {
      label: '時間',
      hint: '(TimePicker)',
    },
  },
  {
    compName: 'DatePicker',
    formKey: 'date',
    formItem: {
      label: '日期選擇',
      hint: '(DatePicker)',
    },
  },
  {
    compName: 'DateRangePicker',
    formKey: 'dateRange',
    formItem: {
      label: '時間範圍選擇',
      hint: '(DateRangePicker)',
    },
  },
  {
    compName: 'EmailAutoComplete',
    formKey: 'email',
    formItem: {
      label: 'Email',
      hint: '(EmailAutoComplete)',
    },
  },
  {
    compName: 'Upload',
    formKey: 'upload',
    formItem: {
      label: '圖片',
      hint: '(Upload)',
    },
  },
  {
    compName: 'InputList',
    formKey: 'multipleInput',
    formItem: {
      label: '多輸入框',
      hint: '(InputList)',
    },
  },
];

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
