<template>
  <div class="v-re-input">
    <dev-section title="基本用法">
      <ReInput v-model="value1" placeholder="輸入框" />
    </dev-section>

    <dev-section title="禁用">
      <div class="wrap">
        <dev-props type="Boolean" prop-name="disabled" text="禁用" />
        <ReInput v-model="value2" disabled />
      </div>
    </dev-section>

    <dev-section title="密碼">
      <div class="wrap">
        <dev-props type="String" prop-name="type=password" text="密碼格式" />
        <ReInput v-model="value3" type="password" />

        <dev-desc mt text="密碼禁用效果" />
        <ReInput v-model="value3" type="password" disabled />
      </div>
    </dev-section>

    <dev-section title="左右固定">
      <div class="wrap">
        <dev-slots slot-name="left" text="左固定內容" />
        <dev-slots slot-name="right" text="右固定內容" />
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

    <dev-section title="前綴與後綴">
      <div class="wrap">
        <dev-slots slot-name="prefix" text="前綴" />

        <ReInput v-model="value5">
          <template #prefix>
            <img class="user-icon" src="@/assets/icon/user.svg">
          </template>
        </ReInput>

        <dev-slots slot-name="suffix" text="後綴" mt />
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
    const value1 = ref('');
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
