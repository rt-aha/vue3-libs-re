<template>
  <div class="v-re-input">
    <dev-section title="基本用法">
      <ReInput v-model="value1" />
    </dev-section>

    <dev-section title="禁用">
      <div class="wrap">
        <dev-desc type="boolean">
          disabled：禁用
        </dev-desc>
        <ReInput v-model="value2" disabled />
      </div>
    </dev-section>

    <dev-section title="密碼">
      <div class="wrap">
        <dev-desc type="boolean">
          disabled：禁用
        </dev-desc>
        <ReInput v-model="value3" type="password" />

        <dev-desc mt>
          密碼禁用效果
        </dev-desc>
        <ReInput v-model="value3" type="password" disabled />
      </div>
    </dev-section>

    <dev-section title="前後固定">
      <div class="wrap">
        <dev-desc api="slot">
          left
        </dev-desc>
        <dev-desc api="slot">
          right
        </dev-desc>
        <ReInput v-model="value4">
          <template #left>
            http://
          </template>
          <template #right>
            .com
          </template>
        </ReInput>
      </div>
    </dev-section>

    <dev-section title="前綴與後綴 ">
      <div class="wrap">
        <dev-desc api="slot">
          prefix
        </dev-desc>
        <ReInput v-model="value5">
          <template #prefix>
            <img class="user-icon" src="@/assets/icon/user.svg">
          </template>
        </ReInput>

        <dev-desc api="slot" mt>
          suffix
        </dev-desc>
        <ReInput v-model="value5">
          <template #suffix>
            <img class="dollar-icon" src="@/assets/icon/dollar.svg">
          </template>
        </ReInput>
      </div>
    </dev-section>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import ReInput from '@/components/dataInput/ReInput.vue';

export default defineComponent({
  name: 'ViewReInput',
  components: {
    ReInput,
  },
  setup() {
    const value1 = ref('abc');
    const value2 = ref('efb');
    const value3 = ref('hij');
    const value4 = ref('klm');
    const value5 = ref('nop');

    return {
      value1,
      value2,
      value3,
      value4,
      value5,
    };
  },
});
</script>

<style lang="scss" scoped>
.user-icon {
  width: 20px;
}

.dollar-icon {
  width: 20px;
}
</style>
