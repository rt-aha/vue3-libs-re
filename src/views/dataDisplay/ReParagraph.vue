<template>
  <div class="v-paragraph">
    <dev-section title="如何使用">
      <div class="wrap">
        <dev-desc text="使用方式參考 @/config/paragraphConfig" />
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

<script setup>
import { defineComponent } from 'vue';
import Paragraph from '@/components/dataDisplay/ReParagraph.vue';
import {
  medicalCareWording1,
  medicalCareWording2,
  medicalCareWording3,
  medicalCareWording4,

} from '@/config/paragraphConfig';
</script>

<style lang="scss" scoped></style>
