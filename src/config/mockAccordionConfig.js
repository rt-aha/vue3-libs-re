import { h } from 'vue';
import { v4 as uuid } from 'uuid';
import LinkList from '@/forDev/testComponents/LinkList.vue';

export const aboutUsServices = [
  {
    key: uuid(),
    title: '醫療補助',
    content: ['聯合基金會合約醫院,提供早產兒住院中醫療補助及出院後醫療儀器租借費用補助。'],
  },
  {
    key: uuid(),
    title: '醫療團隊教育訓練',
    content: ['舉辦各類早產兒醫療團隊相關之研習會議、講座及國外考察並提供代訓交流機會，以提昇醫療服務品質。'],
  },
  {
    key: uuid(),
    title: '學術研究',
    content: ['鼓勵醫護、社工等人員，針對早產兒相關問題進行專題研究。'],
  },
  {
    key: uuid(),
    title: '社會教育宣導',
    content: ['製作各式出版品，提供社會大眾認識早產兒，共同預防早產。'],
  },
  {
    key: uuid(),
    title: '籌募基金',
    content: ['結合社會資源，籌募基金，做早產兒最堅強的後盾。'],
  },
];

const linkConfig = [
  {
    label: 'Yahoo!',
    link: 'https://tw.yahoo.com/',
  },
  {
    label: 'Youtube',
    link: 'https://www.youtube.com/',
  },
  {
    label: 'Google Map',
    link: 'https://www.google.com.tw/maps',
  },
];

export const workReportBudget = [
  {
    key: uuid(),
    title: '計畫與經費預算',
    content: ['content ...'],
    renderContent: h(LinkList, {
      list: linkConfig,
    }),
  },
  {
    key: uuid(),
    title: '籌募基金',
    content: ['結合社會資源，籌募基金，做早產兒最堅強的後盾。'],
  },
];
