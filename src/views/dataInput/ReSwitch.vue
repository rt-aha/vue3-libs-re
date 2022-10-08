<template>
  <div class="v-re-switch">
    <dev-section title="基本使用">
      <div class="wrap">
        <ReSwitch v-model="value1" />
      </div>
    </dev-section>
    <dev-section title="基本使用：小、大">
      <div class="wrp">
        <dev-props type="String" prop-name="size" text="small: 小, large: 大" />
        <dev-desc text="e.g. large" />
        <ReSwitch v-model="value1" size="small" />

        <dev-desc text="e.g. small" mt />
        <ReSwitch v-model="value1" size="large" />
      </div>
    </dev-section>

    <dev-section title="禁用狀態">
      <div>
        <dev-props type="Boolean" prop-name="disabled" text="禁用" />
        <ReSwitch v-model="value1" disabled />
      </div>
    </dev-section>

    <dev-section title="自定義寬度">
      <div class="wrap">
        <dev-props type="String" prop-name="width" text="自訂寬度" />
        <dev-desc text="e.g. 60px" />
        <ReSwitch v-model="value1" width="60px" />

        <dev-desc text="e.g. 100px" mt />
        <ReSwitch v-model="value1" width="100px" />
      </div>
    </dev-section>

    <dev-section title="自定義高度">
      <div class="wrap">
        <dev-props type="String" prop-name="custom-size" text="自義高度" />
        <dev-desc text="e.g. 60px" />
        <ReSwitch v-model="value1" custom-size="60px" />

        <dev-desc text="e.g. 40px" mt />
        <ReSwitch v-model="value1" custom-size="40px" />
      </div>
    </dev-section>

    <dev-section title="自定義顏色">
      <div class="wrap">
        <dev-props type="String" prop-name="color" text="自訂開關顏色" />

        <dev-desc text="e.g. {on: '#032f60', off: '#cd5c5c'}" />
        <ReSwitch
          v-model="value1"
          :color="{
            on: '#032f60',
            off: '#cd5c5c',
          }"
        />

        <dev-desc text="e.g. {on: '#032f60'}" mt />
        <ReSwitch
          v-model="value1"
          :color="{
            on: '#032f60',
          }"
        />
        <dev-desc text="e.g. {off: '#cd5c5c' }" mt />
        <ReSwitch
          v-model="value1"
          :color="{
            off: '#cd5c5c',
          }"
        />
      </div>
    </dev-section>

    <dev-section title="自訂義字段">
      <div class="wrap">
        <dev-props type="String" prop-name="switch-label" text="可自訂 on, off 的字段" />
        <dev-desc text="e.g. {on: 'on', off: 'off'}" />
        <ReSwitch
          v-model="value1"
          :switch-label="{
            on: 'on',
            off: 'off',
          }"
        />

        <dev-desc text="e.g. {on: 'Enable', off: 'Disable'}" mt />
        <ReSwitch
          v-model="value1"
          width="100px"
          :switch-label="{
            on: 'Enable',
            off: 'Disable',
          }"
        />
      </div>
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
