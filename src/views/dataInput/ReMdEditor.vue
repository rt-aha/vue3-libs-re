<template>
  <div class="view-md-editor">
    <dev-section title="基本使用">
      <div class="wrap">
        <ReMdEditor
          v-model="val"
        />
      </div>
    </dev-section>
  </div>
</template>

<script setup>
import ReMdEditor from '@/components/dataInput/ReMdEditor.vue';

const val = ref('');
</script>

<style lang="scss" scoped>
.view-md-editor {
  width: 100%;
}
</style>

