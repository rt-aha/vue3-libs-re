<template>
  <div class="v-simple-table">
    <dev-section title="基本使用">
      <div class="wrap">
        <dev-desc text="使用方式參考 @/config/simpleTableConfig" />
        <SimpleTable :content="HighRiskGroupsContent1" />
      </div>
    </dev-section>

    <dev-section title="基本使用：對齊與底色">
      <div class="wrap">
        <dev-desc text="設定檔中使用 trStyle，調整 row 樣式，e.g. 背景色 backgroundColor: 'rgba(255, 195, 180, 0.2)'" />
        <dev-desc text="設定檔中使用 tdStyle，調整 td 樣式，e.g. 垂直置中 { verticalAlign: 'center' }" />
        <dev-desc text="設定檔中使用 style，調整文字樣式，e.g. 水平置中 { textAlign: 'center' }" />
        <SimpleTable :content="HighRiskGroupsContent2" />
      </div>
    </dev-section>

    <dev-section title="基本使用：合併欄位">
      <div class="wrap">
        <dev-desc text="設定檔中使用 rowspan，合併多個 rows" />
        <dev-desc text="設定檔中使用 colspan，合併多個 columns" />
        <SimpleTable :content="HighRiskUnderStandingContent1" />
      </div>
    </dev-section>

    <dev-section title="進階使用">
      <div class="wrap">
        <dev-desc text="在文字中穿插一些小工具（參考灰字），參考 @/utils/simpleTableText，不足可自行新增" />
        <dev-props type="h Function" prop-name="render" text="若小工具無法滿足需求，可使用自由度最大的 render 自定義組件" />
        <SimpleTable :content="HighRiskUnderStandingContent2" />
      </div>
    </dev-section>
  </div>
</template>

<script setup>
import SimpleTable from '@/components/dataDisplay/simpleTable/SimpleTableIndex.vue';

import {
  HighRiskGroupsContent1,
  HighRiskGroupsContent2,
  HighRiskUnderStandingContent1,
  HighRiskUnderStandingContent2,
} from '@/config/simpleTableConfig';
</script>

<style lang="scss" scoped></style>

