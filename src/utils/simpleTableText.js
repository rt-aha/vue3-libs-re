import { h } from 'vue';

export const textCenter = {
  textAlign: 'center',
};

export const verticalCenter = {
  verticalAlign: 'middle',
};

// 用於中間插入粗體字
export const fragmentBoldText = (prefix = '', t, suffix = '') => ({

  renderText: h('p', [
    h('span', {}, prefix),
    h('span', {
      style: {
        // color: '#FF000A',
        fontWeight: '700',
      },
    }, t),
    h('span', {}, suffix),
  ]),
});

// 用於中間插入粗體＋紅字
export const fragmentBoldVitalText = (prefix = '', t, suffix = '') => ({

  renderText: h('p', [
    h('span', {}, prefix),
    h('span', {
      style: {
        color: '#FF000A',
        fontWeight: '700',
      },
    }, t),
    h('span', {}, suffix),
  ]),
});

// 整行灰字
export const greyText = (t, extraStyle) => ({
  t,
  style: {
    color: '#ddd',
    ...extraStyle,
  },
});

// 整行粗體
export const boldText = (t, extraStyle) => ({
  t,
  style: {
    'font-weight': '700',
    ...extraStyle,
  },
});

