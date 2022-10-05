<template>
  <div class="v-re-radio">
    <dev-section title="基本使用">
      <div>
        <dev-desc api="props" type="Array">
          options: e.g. [{label: 'aaa': value: 'aaa'}]
        </dev-desc>
        <ReRadio v-model="value1" :options="phoneOptions" />
      </div>
    </dev-section>

    <dev-section title="直的排列">
      <div>
        <dev-desc type="String">
          direction: 'verticle'
        </dev-desc>
        <ReRadio v-model="value2" :options="phoneOptions" direction="verticle" />
      </div>
    </dev-section>

    <dev-section title="radio被點擊時">
      <div>
        <dev-desc api="event">
          onChange 事件：點擊時觸發
        </dev-desc>
        <ReRadio v-model="value3" :options="phoneOptions" direction="verticle" @onChange="onChange" />
      </div>
    </dev-section>

    <dev-section title="自定義內容">
      <div>
        <dev-desc api="props" type="Array">
          options: e.g. [{...props, render: renderFunction}]
        </dev-desc>
        <ReRadio v-model="value4" :options="phoneOptions2" />
      </div>
    </dev-section>

    <dev-section title="禁用">
      <div>
        <dev-desc api="props" type="Array">
          options: e.g. [{...props, disabled: true}]
        </dev-desc>
        <ReRadio v-model="value5" :options="phoneOptions3" />
      </div>
    </dev-section>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import ReRadio from '@/components/dataInput/ReRadio.vue';
import { phoneOptions, phoneOptions2, phoneOptions3 } from '@/config/mockOptions';

export default defineComponent({
  name: 'ViewReRadio',
  components: {
    ReRadio,
  },
  setup() {
    const value1 = ref('');
    const value2 = ref('');
    const value3 = ref('');
    const value4 = ref('');
    const value5 = ref('');

    const onChange = (opt) => {
      console.log('change...', opt);
    };

    return {
      value1,
      value2,
      value3,
      value4,
      value5,
      phoneOptions,
      phoneOptions2,
      phoneOptions3,
      onChange,
    };
  },
});
</script>

<style lang="scss" scoped></style>
