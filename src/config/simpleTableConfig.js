import { h } from 'vue';
import ReParagraph from '@/components/dataDisplay/ReParagraph.vue';
import { boldText, fragmentBoldText, fragmentBoldVitalText, greyText, textCenter, verticalCenter } from '@/utils/simpleTableText';

export const HighRiskGroupsContent1 = {
  colGroup: [
    {
      id: nanoid(),
      width: 100,
    },
    {
      id: nanoid(),
      width: 300,
    },
  ],
  head: [],
  body: [
    {
      id: nanoid(),
      texts: [
        {
          t: ['生活行為'],
          // style: textCenter,
          // tdStyle: {
          //   verticalAlign: 'middle',
          // },
        },
        {
          t: [
            '◎營養狀況不良',
            '◎抽菸、喝酒',
            '◎使用成癮藥物',
          ],
        },
      ],
    },
    {
      id: nanoid(),
      texts: [
        {
          t: ['孕前行為'],
          // style: textCenter,
          // tdStyle: {
          //   verticalAlign: 'middle',
          // },
        },
        {
          t: [
            '◎懷孕年齡小於18歲或大於40歲。',
            '◎未婚懷孕。',
            '◎懷孕間隔太密。',
          ],
        },
      ],
    },
    {
      id: nanoid(),
      texts: [
        {
          t: ['懷孕期間'],
          // style: textCenter,
          // tdStyle: {
          //   verticalAlign: 'middle',
          // },
        },
        {
          t: [
            '◎孕期感染、發燒。',
            '◎前置胎盤。',
            // boldText('◎前置胎盤。'),
            // fragmentBoldText('腹部急症', '◎腹部手術、', '(盲腸炎或是卵巢扭轉、腹膜炎)。'),
            '◎腹部手術、腹部急症(盲腸炎或是卵巢扭轉、腹膜炎)。',

          ],
        },
      ],
    },
  ],
};

export const HighRiskGroupsContent2 = {
  colGroup: [
    {
      id: nanoid(),
      width: 100,
    },
    {
      id: nanoid(),
      width: 300,
    },
  ],
  head: [],
  body: [
    {
      id: nanoid(),
      texts: [
        {
          t: ['生活行為'],
          style: {},
          tdStyle: {
            verticalAlign: 'middle',

          },
        },
        {
          t: [
            '◎營養狀況不良',
            '◎抽菸、喝酒',
            '◎使用成癮藥物',
          ],

        },
      ],
      trStyle: {
        backgroundColor: 'rgba(255, 195, 140, 0.4)',
      },
    },
    {
      id: nanoid(),
      texts: [
        {
          t: ['孕前行為'],
          style: textCenter,
          tdStyle: {
            verticalAlign: 'middle',
            backgroundColor: 'rgba(255, 195, 180, 0.2)',
          },
        },
        {
          t: [
            '◎懷孕年齡小於18歲或大於40歲。',
            '◎未婚懷孕。',
            '◎懷孕間隔太密。',
          ],
          style: textCenter,
          tdStyle: verticalCenter,

        },
      ],

    },
    {
      id: nanoid(),
      texts: [
        {
          t: ['懷孕期間'],
          style: {
            textAlign: 'right',
          },
          tdStyle: {
            verticalAlign: 'bottom',

          },
        },
        {
          t: [
            '◎孕期感染、發燒。',
            '◎前置胎盤。',
            // boldText('◎前置胎盤。'),
            // fragmentBoldText('腹部急症', '◎腹部手術、', '(盲腸炎或是卵巢扭轉、腹膜炎)。'),
            '◎腹部手術、腹部急症(盲腸炎或是卵巢扭轉、腹膜炎)。',
          ],
          style: {
            textAlign: 'right',
            backgroundColor: 'rgba(255, 195, 100, 0.4)',
          },
          tdStyle: {
            verticalAlign: 'bottom',
          },
        },
      ],
    },
  ],
};

export const HighRiskUnderStandingContent1 = {
  colGroup: [
    {
      id: nanoid(),
      width: 200,
    },
    {
      id: nanoid(),
      width: 200,
    },

    {
      id: nanoid(),
      width: 200,
    },
  ],
  head: [],
  body: [
    {
      id: nanoid(),
      texts: [
        {
          t: ['母親'],
          colspan: 2,
        },
        {
          t: ['胎兒、胎盤羊水'],
        },
      ],
    },
    {
      id: nanoid(),
      texts: [
        {
          t: ['孕前'],
        },
        {
          t: ['孕期'],
        },
        {
          render: h(ReParagraph, {
            wording: [
              {
                render: h('div', {}, [h('p', '1.胎兒生長遲滯')]),
              },

              {
                type: 'normal',
                text: ['2.胎兒窘迫'],
                style: {
                  marginTop: 0,
                },
              },
              {
                render: h('div', {}, [h('p', '3.早產'), h('p', '4.多胞胎妊娠')]),
              },
              {
                type: 'normal',
                text: ['5.巨嬰', '6.過期妊娠', '7.產程遲滯', '8.羊水過多、過少'],
                style: {
                  marginTop: 0,
                },
              },
              {
                render: h('div', {}, [h('p', '9.早產早期破水'), h('p', '10.前置胎盤'), h('p', '11.胎盤早期剝離')]),
              },
            ],
          }),
          rowspan: 2,
        },
      ],
    },
    {
      id: nanoid(),
      texts: [
        {
          render: h(ReParagraph, {
            wording: [
              {
                type: 'normal',
                text: [
                  '1.腦血管疾病',
                  '2.心臟疾病',
                  '3.慢性高血壓',
                  '4.氣喘',
                  '5.肝病',
                  '6.腎臟病',
                  '7.糖尿病',
                  '8.癲癇',
                ],
                style: {
                  marginTop: 0,
                },
              },
              {
                render: h('div', {}, [h('p', '9.貧血'), h('p', '10.傳染性疾病'), h('p', '11.青少女及高齡者')]),
              },
              {
                type: 'normal',
                text: ['12.體重過重或過輕者'],
                style: {
                  marginTop: 0,
                },
              },
            ],
          }),
        },
        {
          render: h(ReParagraph, {
            wording: [
              {
                render: h('div', {}, [
                  h('p', '1.妊娠高血壓'),
                  h('p', '2.子癲症、子癲前症'),
                  h('p', '3.甲狀腺機能亢進'),
                  h('p', '4.妊娠糖尿病'),
                  h('p', '5.全身性紅斑狼瘡'),
                ]),
              },
            ],
          }),
        },
      ],
    },
  ],
};

export const HighRiskUnderStandingContent2 = {
  colGroup: [
    {
      id: nanoid(),
      width: 200,
    },
    {
      id: nanoid(),
      width: 200,
    },

    {
      id: nanoid(),
      width: 200,
    },
  ],
  head: [],
  body: [
    {
      id: nanoid(),
      texts: [
        {
          t: ['母親'],
          colspan: 2,
        },
        {
          t: ['胎兒、胎盤羊水'],
        },
      ],
    },
    {
      id: nanoid(),
      texts: [
        {
          t: ['孕前'],
        },
        {
          t: ['孕期'],
        },
        {

          // boldText('◎前置胎盤。'),
          // fragmentBoldText('腹部急症', '◎腹部手術、', '(盲腸炎或是卵巢扭轉、腹膜炎)。'),
          t: [
            '1.胎兒生長遲滯',
            greyText('整行粗體'),
            boldText('2.胎兒窘迫'),
            '3.早產',
            greyText('局部粗體'),
            fragmentBoldText('4.', '多胞胎', '妊娠'),
            '5.巨嬰',
            '6.過期妊娠',
            '7.產程遲滯',
            greyText('局部粗體紅字'),
            fragmentBoldVitalText('8.', '羊水', '過多、過少'),
            '9.早產早期破水',
            '10.前置胎盤',
            '11.胎盤早期剝離',
          ],

          rowspan: 2,
        },
      ],
    },
    {
      id: nanoid(),
      texts: [
        {
          render: h(ReParagraph, {
            wording: [
              {
                type: 'note',
                text: ['這裡是用 ReParagraph 渲染的'],
              },
              {
                type: 'normal-indent-dot',
                text: [
                  '1.腦血管疾病',
                  '2.心臟疾病',
                  '3.慢性高血壓',
                  '4.氣喘',
                  '5.肝病',
                  '6.腎臟病',
                  '7.糖尿病',
                  '8.癲癇',
                ],
                style: {
                  marginTop: 0,
                },
              },
              {
                render: h('div', {}, [h('p', { style: { fontWeight: 700, color: '#ddd' } }, '這行穿插 Reparagraph 的自訂 render 渲染'), h('p', '9.貧血'), h('p', '10.傳染性疾病'), h('p', '11.青少女及高齡者')]),
              },
              {
                type: 'normal',
                text: ['12.體重過重或過輕者'],
                style: {
                  marginTop: 0,
                },
              },
            ],
          }),
        },
        {

          t: [
            greyText('一般文字條列只要一個陣列即可'),
            '1.妊娠高血壓',
            '2.子癲症、子癲前症',
            '3.甲狀腺機能亢進',
            '4.妊娠糖尿病',
            '5.全身性紅斑狼瘡',
          ],
          // render: h(ReParagraph, {
          //   wording: [
          //     {
          //       render: h('div', {}, [
          //         h('p', '1.妊娠高血壓'),
          //         h('p', '2.子癲症、子癲前症'),
          //         h('p', '3.甲狀腺機能亢進'),
          //         h('p', '4.妊娠糖尿病'),
          //         h('p', '5.全身性紅斑狼瘡'),
          //       ]),
          //     },
          //   ],
          // }),
        },
      ],
    },
  ],
};
