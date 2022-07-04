export default [
  {
    label: '關於齊裕',
    subList: [
      {
        label: '公司簡介',
        route: {
          name: 'intro',
        },
      },
      {
        label: '獲獎紀錄',
        route: {
          name: 'award-record',
        },
      },
    ],
  },
  {
    label: '建築學苑',
    subList: [
      {
        label: 'BIM工程技研',
        route: {
          name: 'arch-college',
          query: {
            tab: 1,
          },
        },
      },
      {
        label: '工程百科',
        route: {
          name: 'arch-college',
          query: {
            tab: 2,
          },
        },
      },
      {
        label: '工程講堂',
        route: {
          name: 'arch-college',
          query: {
            tab: 3,
          },
        },
      },
      {
        label: '時尚品味',
        route: {
          name: 'arch-college',
          query: {
            tab: 6,
          },
        },
      },
    ],
  },
  {
    label: '作品業績',
    subList: [
      {
        label: '線上熱銷',
        route: {
          name: 'properties',
        },
      },
    ],
  },
  {
    label: '集團訊息',
    subList: [
      {
        label: '集團資訊',
        route: {
          name: 'news',
          query: {
            tab: 1,
          },
        },
      },
      {
        label: '房產焦點',
        route: {
          name: 'news',
          query: {
            tab: 2,
          },
        },
      },
      {
        label: '房產新聞',
        route: {
          name: 'news',
          query: {
            tab: 3,
          },
        },
      },
    ],
  },
  {
    label: '影音專區',
    subList: [
      {
        label: '建案影音專區',
        route: {
          name: 'hot-videos',
          query: {
            tab: 1,
          },
        },
      },
      {
        label: '品牌影音專區',
        route: {
          name: 'hot-videos',
          query: {
            tab: 2,
          },
        },
      },
      {
        label: '南方崛起專區',
        route: {
          name: 'hot-videos',
          query: {
            tab: 3,
          },
        },
      },
      {
        label: '富市台中專區',
        route: {
          name: 'hot-videos',
          query: {
            tab: 4,
          },
        },
      },
    ],
  },
];
