<template>
  <div class="v-simple-table">
    SimpleTable 施工中 ...

    <SimpleTable :content="HighRiskUnderStandingContent" />
  </div>
</template>

<script>
import { defineComponent, h } from 'vue';
import SimpleTable from '@/components/SimpleTable/index.vue';
import Paragraph from '@/components/ReParagraph.vue';
import { v4 as uuid } from 'uuid';

export default defineComponent({
  name: 'ViewSimpleTable',
  components: {
    SimpleTable,
  },
  setup() {
    const HighRiskUnderStandingContent = {
      colGroup: [
        {
          id: uuid(),
          width: 200,
        },
        {
          id: uuid(),
          width: 200,
        },

        {
          id: uuid(),
          width: 200,
        },
      ],
      head: [],
      body: [
        {
          id: uuid(),
          texts: [
            {
              t: '母親',
              colspan: 2,
            },
            {
              t: '胎兒、胎盤羊水',
            },
          ],
        },
        {
          id: uuid(),
          texts: [
            {
              t: '孕前',
            },
            {
              t: '孕期',
            },
            {
              render: h(Paragraph, {
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
          id: uuid(),
          texts: [
            {
              render: h(Paragraph, {
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
              render: h(Paragraph, {
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

    return {
      HighRiskUnderStandingContent,
    };
  },
});
</script>

<style lang="scss" scoped></style>
