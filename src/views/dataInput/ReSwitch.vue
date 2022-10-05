<template>
  <div class="v-re-switch">
    <dev-section title="基本使用：小、預設、大">
      <ReSwitch v-model="value1" size="small" />
      <ReSwitch v-model="value1" />
      <ReSwitch v-model="value1" size="large" />
    </dev-section>

    <dev-section title="禁用狀態">
      <ReSwitch v-model="value1" disabled />
    </dev-section>

    <dev-section title="自定義寬度">
      <ReSwitch v-model="value1" width="60px" />
      <ReSwitch v-model="value1" width="100px" />
    </dev-section>

    <dev-section title="自定義高度">
      <ReSwitch v-model="value1" custom-size="60px" />
      <ReSwitch v-model="value1" custom-size="40px" />
    </dev-section>

    <dev-section title="自定義顏色">
      <ReSwitch
        v-model="value1"
        :color="{
          on: '#032f60',
          off: '#cd5c5c',
        }"
      />

      <ReSwitch
        v-model="value1"
        :color="{
          on: '#032f60',
        }"
      />

      <ReSwitch
        v-model="value1"
        :color="{
          off: '#cd5c5c',
        }"
      />
    </dev-section>

    <dev-section title="帶字段，字段較長時透過 width 調整寬度">
      <ReSwitch
        v-model="value1"
        :switch-label="{
          on: 'on',
          off: 'off',
        }"
      />

      <ReSwitch
        v-model="value1"
        width="100px"
        :switch-label="{
          on: 'Enable',
          off: 'Disable',
        }"
      />
    </dev-section>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import ReSwitch from '@/components/dataInput/ReSwitch.vue';

export default defineComponent({
  name: 'ViewReSwitch',
  components: {
    ReSwitch,
  },
  setup() {
    const value1 = ref(true);

    return {
      value1,
    };
  },
});
</script>

<style lang="scss" scoped></style>
