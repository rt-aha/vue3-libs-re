import { h } from 'vue';

export const font = (args = {}) => {
  const {
    color,
    fontWeight,
  } = args;

  const config = {
    color: color || '#707070',
    fontWeight: fontWeight || '400',
  };

  return ({
    'color': config.color,
    'font-size': '16px',
    'font-weight': config.fontWeight,
    'letter-spacing': '1.6px',
    'line-height': '28px',

  });
};

export const linkText = () => {
  return ({
    'color': '#0038F2',
    'font-size': '16px',
    'font-weight': 400,
    'letter-spacing': '0.8px',
    'line-height': '20px',
    'text-decoration': 'underline',
  });
};

// 加入額外 style
export const styleText = (t, extraStyle) => ({
  t,
  style: extraStyle,
});

// 用於中間插入粗體字 -- for 渲染字段
export const renderNormalBoldText = (prefix = '', t, suffix = '') => h('p', { style: font() }, [
  h('span', {}, prefix),
  h('span', {
    style: {
      // color: '#FF000A',
      fontWeight: '700',
    },
  }, t),
  h('span', {}, suffix),
]);

// 最大彈性，想幹嘛就幹嘛
export const whateverTexts = textList => h('p',
  { style: font() },
  textList.map((item) => {
    const tag = item.tag ? item.tag : 'span';
    const attributes = item.attributes ? item.attributes : {};

    return h(tag, { style: item.style, ...attributes }, item.t);
  }));

