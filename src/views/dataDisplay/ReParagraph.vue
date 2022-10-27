<template>
  <div class="v-paragraph">
    <dev-section title="如何使用">
      <div class="wrap">
        <dev-props type="{type: '', text: string[], nextParagraph: boolean, style: {[key]:string: string}}[]" prop-name="wording" text="設定" />
        <dev-desc text="type 類別對應組件中 text-loop__word--${t.type} 下名，預設有 normal, normal-vital, normal-bold,  normal-indent ..." />
        <dev-desc text="wording: 純文字陣列" />
        <dev-desc text="nextParagraph: 是否換段" />
        <dev-desc text="style: 額外插入樣式" />
      </div>
    </dev-section>
    <dev-section title="範例">
      <div class="wrap">
        <Paragraph :wording="medicalCareWording1" />
      </div>
    </dev-section>
    <!-- <dev-section title="進階使用">
      <div class="wrap">
        <dev-desc text="可在 @/utils/paragraphText 找一些方便的小工具" />
        <Paragraph :wording="medicalCareWording2" />
      </div>
    </dev-section> -->
    <dev-section title="使用: render">
      <div class="wrap">
        <dev-desc text="使用 render 時，僅 style會 生效" />

        <Paragraph :wording="medicalCareWording3" />
      </div>
    </dev-section>
    <dev-section title="用一篇文章測試">
      <div class="wrap">
        <Paragraph :wording="medicalCareWording4" />
      </div>
    </dev-section>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Paragraph from '@/components/dataDisplay/ReParagraph.vue';
import { font, linkText, renderNormalBoldText, whateverTexts } from '@/utils/paragraphText';

export default defineComponent({
  name: 'ViewParagraph',
  components: {
    Paragraph,
  },
  setup() {
    const medicalCareWording1 = [
      {
        type: 'normal',
        text: [
          '一般文字',
        ],
      },
      {
        type: 'normal-underline',
        text: [
          '底線文字',
        ],
      },
      {
        type: 'normal-vital',
        text: [
          '重要文字',
        ],
      },
      {
        type: 'normal-bold',
        text: [
          '一般文字粗體',
        ],
      },
      {
        type: 'normal-indent',
        text: [
          '退縮，第一行',
          '退縮，第二行',
          '退縮，地三行',
        ],
      },
      {
        type: 'normal-indent-dot',
        text: [
          '條列點點，第一行',
          '條列點點，第二行',
          '條列點點，地三行',
        ],
      },
      {
        type: 'normal-indent-counter',
        text: [
          '條列編號，第一行',
          '條列編號，第二行',
          '條列編號，地三行',
        ],
      },
      {
        type: 'normal',
        text: [
          '這是第二段文字',
          '這是第二段文字123',
        ],
        nextParagraph: true,
      },
    ];

    const medicalCareWording2 = [
      {
        // type: 'normal',
        render: renderNormalBoldText('定期產前檢查', '1.', '，自覺有異常可提早返診，需要比一般孕婦更密集的追蹤。'),
      },

    ];

    const medicalCareWording3 = [
      {
        type: 'normal',
        text: ['- linkText() 設定連結樣式'],
        nextParagraph: true,
      },
      {
        render: h(
          'p', { style: font({}) },
          [
            h('span', '免費服務專線'),
            h('a', {
              href: 'tel:0800-008-009',
              style: linkText(),
              target: '_blank',
            }, '0800-008-009'),
          ],
        ),
      },
      {
        type: 'normal',
        text: ['- 插入粗體文字'],
        nextParagraph: true,
        style: {
          marginTop: '50px',
        },
      },
      {
        render: renderNormalBoldText('這行字與上面', '相差了50px', '因為插入了 style: {marginTop: \'50px\'}，如果要插入多個粗體，可用下面的'),
        style: {
          marginTop: '50px',
        },
      },
      {
        type: 'normal',
        text: ['- 最大彈性，想怎麼改就怎麼改'],
        nextParagraph: true,
      },
      {
        render: whateverTexts(
          [
            {
              t: '早產兒因為吸吮能力較弱，奶嘴應以',
            },
            {
              t: '質軟、圓洞',
              style: {
                fontWeight: '700',

              },
            },
            {
              t: '為佳；因每位早產兒吸吮與吞嚥情況有個別差異，實際哺餵前可與醫護人員討論。通常合適的奶洞大小，是以奶瓶倒立時，奶水可以',
            },
            {
              t: '一秒一滴',
              style: {
                fontWeight: '700',
                textDecoration: 'underline',
              },
            },
            {
              t: '流下來為宜。',
            },
            {
              tag: 'a',
              t: '測試連結',
              style: {
                fontWeight: '700',
                textDecoration: 'underline',
                cursor: 'pointer',
              },
              attributes: {
                href: 'https://yahoo.com.tw',
                target: '_blank',
              },
            },
          ],
        ),
      },

    ];

    const medicalCareWording4 = [
      {
        type: 'normal-bold',
        text: ['MLB／美聯MVP民意調查 大谷翔平獲70趴大勝賈吉'],
      },
      {
        type: 'noraml',
        text: ['大聯盟賽季即將結束，洋基遭到淘汰後獎項之爭再度引發討論，美國媒體《Codify》在推特上舉辦賈吉（Aaron Judge）與大谷翔平的美聯MVP投票，結果大谷翔平獲得70%；賈吉只有30%。'],
        nextParagraph: true,
      },
      {
        type: 'normal',
        text: ['《Codify》昨日在推特發布美聯MVP的投票貼文，選項只有賈吉和大谷，吸引超過將近1萬名網友投票，結果大谷翔平竟然獲得70%的得票率，賈吉只有30%。'],
        nextParagraph: true,
      },
      {
        type: 'normal',
        text: ['賈吉季後賽低迷的表現，可能影響球迷的印象分數，不過MVP票選只看例行賽的表現。對此貼文下就有網友表示，「賈吉會贏下MVP，季後賽不算數」；也有球迷表示，「如果大谷在洋基，不會被太空人橫掃」。'],
        nextParagraph: true,
      },
      {
        type: 'normal',
        text: ['《Codify》也發布許多大谷翔平的有利數據，像是美聯奪三振數排名第3、擊出全壘打數第4，本季超過20轟的球員中大谷的跑壘速度最快，從本壘到一壘的衝刺時間只需4.09秒。'],
        nextParagraph: true,
      },
    ];

    return {
      medicalCareWording1,
      medicalCareWording2,
      medicalCareWording3,
      medicalCareWording4,
    };
  },
});
</script>

<style lang="scss" scoped></style>
