<template>
  <div class="v-re-textarea">
    <dev-section title="基本使用">
      <div class="wrap">
        <ReTextarea v-model="textarea1" />
      </div>
    </dev-section>

    <dev-section title="限制字數提醒">
      <div class="wrap">
        <dev-props type="String" prop-name="text-limit" text="限制字數提醒" />
        <dev-desc text="e.g. 50" />
        <ReTextarea v-model="textarea2" text-limit="50" />
      </div>
    </dev-section>

    <dev-section title="行數設定">
      <div class="wrap">
        <dev-props type="String" prop-name="rows" text="設定行數" />
        <dev-desc text="e.g. 10" />
        <ReTextarea v-model="textarea3" rows="10" />
      </div>
    </dev-section>

    <dev-section title="resize 設定">
      <div class="wrap">
        <dev-props type="String" prop-name="size" text="none: 不可縮放, vertical: 僅垂直可縮放, horizontal: 僅水平可縮放" />
        <dev-desc text="e.g. none" mt />
        <ReTextarea v-model="textarea4" autosize="none" />

        <dev-desc text="e.g. vertical" mt />
        <ReTextarea v-model="textarea5" autosize="vertical" />

        <dev-desc text="e.g. horizontal" mt />
        <ReTextarea v-model="textarea6" autosize="horizontal" />
      </div>
    </dev-section>
  </div>
</template>

<script setup>
import ReTextarea from '@/components/dataInput/ReTextarea.vue';

const textarea1 = ref('');
const textarea2 = ref('');
const textarea3 = ref('');
const textarea4 = ref('');
const textarea5 = ref('');
const textarea6 = ref('');
</script>

<style lang="scss" scoped></style>
