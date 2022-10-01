import { genderOptions, incomeOptions, occupationOptions, countiesOptions } from '@/config/options.js';
import taiwanCitiesRegions from '@/config/taiwanCitiesRegions';

const cityRegionForSelectOptions = taiwanCitiesRegions.map((city) => {
  return {
    key: city.name,
    options: city.region.map((region) => ({ label: region.name, value: region.name })),
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
    formItemLabel: '帳號',
  },
  {
    compName: 'Input',
    formKey: 'password',
    formItemLabel: '密碼',
    type: 'password',
  },
  {
    compName: 'Select',
    formKey: 'gender',
    formItemLabel: '性別',
    options: genderOptions,
  },
  {
    compName: 'Radio',
    formKey: 'income',
    formItemLabel: '收入',
    options: incomeOptions,
  },
  {
    compName: 'Checkbox',
    formKey: 'agree',
    formItemLabel: '同意書',
    label: '我同意',
  },
  {
    compName: 'CheckboxGroup',
    formKey: 'occupation',
    formItemLabel: '職業',
    options: occupationOptions,
  },
  {
    compName: 'Switch',
    formKey: 'enable',
    formItemLabel: '啟用',
  },
  {
    compName: 'InputNumber',
    formKey: 'height',
    formItemLabel: '身高',
  },
];

export const dependencyFormConfig = [
  {
    compName: 'Select',
    formKey: 'city',
    formItemLabel: '縣市',
    options: cityOptions,
    layout: {
      768: 12,
    },
  },
  {
    compName: 'DependenceSelect',
    formKey: 'region',
    extraFormKey: 'city',
    formItemLabel: '區/鄉/鎮',
    dependenceOptions: cityRegionForSelectOptions,
    layout: {
      768: 12,
    },
  },
];

export const multiMultiFormConfig = [
  {
    // 這是個一個神奇的功能！
    compName: 'MultiMultiCheckboxGroup',
    formKey: 'mulltiCities',
    formItemLabel: '需求區域',
    hint: '可複選',
    options: countiesOptions,
    layout: {
      768: 24,
    },
  },
];
