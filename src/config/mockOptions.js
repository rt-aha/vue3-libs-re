import PhoneOption from '@/forDev/testComponents/PhoneOption.vue';
// import PhoneOption from '@/devComponents/Radio/PhoneOption.vue';
// import MeatOption from '@/devComponents/Checkbox/MeatOption.vue';

export const hobbyOptions = [
  {
    label: '運動',
    value: 1,
  },
  {
    label: '看書',
    value: 2,
  },
  {
    label: '畫畫',
    value: 3,
  },
  {
    label: '玩遊戲',
    value: 4,
  },
  {
    label: '釣魚',
    value: 5,
  },
];

export const genderOptions = [
  {
    label: '男',
    value: 1,
  },
  {
    label: '女',
    value: 2,
  },
];

export const incomeOptions = [
  {
    label: '30,000 以下',
    value: 1,
  },
  {
    label: '30,001 ~ 50,000',
    value: 2,
  },
  {
    label: '50,001 ~ 75,000',
    value: 3,
  },
  {
    label: '75,001 ~ 100,000',
    value: 4,
  },
  {
    label: '100,000 以上',
    value: 5,
  },
];

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
    label: 'Pixel 7a',
    price: '$333',
    color: '黑',
    value: 'pixel-7a-black',
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

export const basicOptions = [
  {
    label: 'label1',
    value: 'option1',
  },
  {
    label: 'label2',
    value: 'option2',
  },
  {
    label: 'label3',
    value: 'option3',
  },
  {
    label: 'label4',
    value: 'option4',
  },
  {
    label: 'label5',
    value: 'option5',
  },
];

export const basicWithDisabledOptions = [
  {
    label: 'option1',
    value: 'option1',
  },
  {
    label: 'option2',
    value: 'option2',
    disabled: true,
  },
  {
    label: 'option3',
    value: 'option3',
  },
  {
    label: 'option4',
    value: 'option4',
  },
  {
    label: 'option5',
    value: 'option5',
    disabled: true,
  },
];

export const renderOptions = [
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

export const renderWithDisabledOptions = [
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

export const transferOptions = [
  {
    label: 'option1',
    value: 'option1',
  },
  {
    label: 'option2',
    value: 'option2',
  },
  {
    label: 'option3',
    value: 'option3',
  },
  {
    label: 'option4',
    value: 'option4',
  },
  {
    label: 'option5',
    value: 'option5',
    disabled: true,
  },
  {
    label: 'option6',
    value: 'option6',
  },
  {
    label: 'option7',
    value: 'option7',
    disabled: true,
  },
  {
    label: 'option8',
    value: 'option8',
  },
  {
    label: 'option9',
    value: 'option9',
  },
];
