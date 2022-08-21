import PhoneOption from '@/forDev/testComponents/PhoneOption.vue';
// import PhoneOption from '@/devComponents/Radio/PhoneOption.vue';
// import MeatOption from '@/devComponents/Checkbox/MeatOption.vue';

export const selectOptions = [
  {
    label: '下拉選項1',
    value: 1,
  },
  {
    label: '下拉選項2',
    value: 2,
  },
  {
    label: '下拉選項3',
    value: 3,
    disabled: true,
  },
  {
    label: '下拉選項4',
    value: 4,
  },
  {
    label: '下拉選項5',
    value: 5,
  },
  {
    label: '下拉選項6',
    value: 6,
  },
  // {
  //   render: () => PhoneOption,
  //   label: 'Custom',
  //   value: 789,
  //   fruitData: {
  //     name: 'Banana',
  //     price: '$30',
  //     desc: '香又甜',
  //   },
  // },
];

export const singleOption = {
  label: '同意',
  value: true,
};

export const phoneOptions = [
  {
    id: 111,
    label: 'Pixel 6',
    price: '$111',
    color: '黑',
    value: 'pixel-6-black',
  },
  {
    id: 333,
    label: 'Pixel 6a',
    price: '$222',
    color: '粉',
    value: 'pixel-6a-pink',
  },
  {
    id: 444,
    label: 'Pixel 7',
    price: '$333',
    color: '金',
    value: 'pixel-gold',
  },
];

export const phoneOptions2 = [
  {
    id: 111,
    label: 'Pixel 6',
    price: '$111',
    color: '黑',
    value: 'pixel-6-black',
    render: PhoneOption,
  },
  {
    id: 222,
    label: 'Pixel 6',
    price: '$111',
    color: '白',
    value: 'pixel-6-white',
    render: PhoneOption,
  },
  {
    id: 333,
    label: 'Pixel 6a',
    price: '$222',
    color: '粉',
    value: 'pixel-6a-pink',
    render: PhoneOption,
  },
  {
    id: 444,
    label: 'Pixel 7',
    price: '$333',
    color: '金',
    value: 'pixel-gold',
    render: PhoneOption,
  },
];

export const phoneOptions3 = [
  {
    id: 111,
    label: 'Pixel 6',
    price: '$111',
    color: '黑',
    value: 'pixel-6-black',
    render: PhoneOption,
  },
  {
    id: 222,
    label: 'Pixel 6',
    price: '$111',
    color: '白',
    value: 'pixel-6-white',
    disabled: true,
    render: PhoneOption,
  },
  {
    id: 333,
    label: 'Pixel 6a',
    price: '$222',
    color: '粉',
    value: 'pixel-6a-pink',
    render: PhoneOption,
  },
  {
    id: 444,
    label: 'Pixel 7',
    price: '$333',
    color: '金',
    value: 'pixel-7-gold',
    render: PhoneOption,
  },
  {
    id: 444,
    label: 'Pixel 7',
    price: '$333',
    color: '黑',
    value: 'pixel-7-black',
    render: PhoneOption,
  },
  {
    id: 555,
    label: 'Pixel 7 pro',
    price: '$555',
    color: '金',
    value: 'pixel-7-prop-gold',
    render: PhoneOption,
    disabled: true,
  },
];
