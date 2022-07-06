<template>
  <div class="v-paragraph">
    Paragraph 施工中 ...
    <Paragraph :wording="medicalCareWording" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Paragraph from '@/components/Paragraph/index.vue';

export default defineComponent({
  name: 'ViewParagraph',
  components: {
    Paragraph,
  },
  setup() {
    const medicalCareWording = [
      {
        type: 'normal',
        text: [
          '1.必要時會裝上胎兒監視器，密切觀察子宮收縮與胎心音變化，一天聽1-2次胎心音，要移除胎兒監視器時，須先通知醫護人員予以評估後再決定是否可拆除。',
          '2.完全或部分臥床休息。',
          '3.有必要時醫師會以鴨嘴或內診檢查。',
          '4.依醫師評估給予藥物治療。',
        ],

      },
      {
        type: 'normal-bold',
        text: [
          '1.1必要時會裝上胎兒監視器，密切觀察子宮收縮與胎心音變化，一天聽1-2次胎心音，要移除胎兒監視器時，須先通知醫護人員予以評估後再決定是否可拆除。',
        ],

      },
      {
        type: 'normal-indent',
        text: [
          '(1)安胎藥物：抑制子宮收縮。',
          '(2)抗生素：早期破水時可預防感染。',
          '(3)硫酸鎂: 除安胎作用外，臨床實證證明懷孕32週前使用，可降低新生兒腦性麻痺發生機率。',
          '(4)類固醇：可幫助胎兒肺部提早成熟，預防早產而產生之呼吸窘迫症狀。',
        ],
        
      },
    ];

    return {
      medicalCareWording,
    };
  },
});
</script>

<style lang="scss" scoped></style>
