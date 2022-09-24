<template>
  <div class="v-re-switch">
    <dev-section title="基本使用：小、預設、大">
      <re-switch v-model="value1" size="small" />
      <re-switch v-model="value1" />
      <re-switch v-model="value1" size="large" />
    </dev-section>

    <dev-section title="禁用狀態">
      <re-switch v-model="value1" disabled />
    </dev-section>

    <dev-section title="自定義寬度">
      <re-switch v-model="value1" width="60px" />
      <re-switch v-model="value1" width="100px" />
    </dev-section>

    <dev-section title="自定義高度">
      <re-switch v-model="value1" customSize="60px" />
      <re-switch v-model="value1" customSize="40px" />
    </dev-section>

    <dev-section title="自定義顏色">
      <re-switch
        v-model="value1"
        :color="{
          on: '#032f60',
          off: '#cd5c5c',
        }"
      />

      <re-switch
        v-model="value1"
        :color="{
          on: '#032f60',
        }"
      />

      <re-switch
        v-model="value1"
        :color="{
          off: '#cd5c5c',
        }"
      />
    </dev-section>

    <dev-section title="帶字段，字段較長時透過 width 調整寬度">
      <re-switch
        v-model="value1"
        :switchLabel="{
          on: 'on',
          off: 'off',
        }"
      />

      <re-switch
        v-model="value1"
        width="100px"
        :switchLabel="{
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
