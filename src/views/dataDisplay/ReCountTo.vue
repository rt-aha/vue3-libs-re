<template>
  <div class="v-countTo">
    <dev-section title="基本使用">
      <ReCountTo :end-val="12312" />
    </dev-section>

    <dev-section title="捲動到該位置自動觸發">
      <div class="wrap">
        <dev-props type="String" prop-name="scroll-container" text="捲動容器的 class, id 等 querySelector 可讀取的值" />
        <dev-desc text="請往下滾動" />
        <div class="h" />
        <ReCountTo :end-val="12312" scroll-container=".ly-base-layout__body__container" />
      </div>
    </dev-section>

    <div class="short-h" />
  </div>
</template>

<script setup>
import ReCountTo from '@/components/dataDisplay/ReCountTo.vue';
</script>

<style lang="scss" scoped>
.h {
  width: 1px;
  height: 1200px;
}

.short-h {
  width: 1px;
  height: 400px;
}
</style>
