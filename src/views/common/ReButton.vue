<template>
  <div class="v-re-button">
    <dev-section title="基礎">
      <ReButton>Button</ReButton>
    </dev-section>

    <dev-section title="基本使用">
      <ReButton> 預設按鈕 </ReButton>
      <ReButton :disabled="true">
        disabled按鈕
      </ReButton>
      <ReButton type="border">
        border按鈕
      </ReButton>
      <ReButton type="plain">
        plain按鈕
      </ReButton>
    </dev-section>
    <dev-section title="前綴、後綴">
      <ReButton>
        <template #prefix>
          pre
        </template>按鈕
      </ReButton>
      <ReButton>
        <template #prefix>
          pre
        </template>
        按鈕
        <template #suffix>
          suf
        </template>
      </ReButton>
      <ReButton>
        預設按鈕<template #suffix>
          suf
        </template>
      </ReButton>
    </dev-section>

    <dev-section title="帶 loading">
      <ReButton :is-loading="true">
        按紐
      </ReButton>
      <ReButton :is-loading="true" type="border">
        border按鈕
      </ReButton>
      <ReButton :is-loading="true" type="plain">
        plain按鈕
      </ReButton>
      <ReButton :is-loading="true" size="small">
        小按鈕
      </ReButton>
    </dev-section>

    <dev-section title="小 size">
      <ReButton size="small">
        小按鈕
      </ReButton>
    </dev-section>

    <dev-section title="圓形">
      <ReButton extra="circle">
        circle
      </ReButton>
      <ReButton :style="{ 'border-color': '#CD5C5C', 'color': '#CD5C5C' }" type="border">
        按紐
      </ReButton>
    </dev-section>

    <dev-section title="自訂背景色">
      <ReButton bg-color="#CD5C5C">
        按紐
      </ReButton>
    </dev-section>

    <dev-section title="自訂邊框顏色、內容文字顏色">
      <ReButton :style="{ 'border-color': '#CD5C5C', 'color': '#CD5C5C' }" type="border">
        按紐
      </ReButton>
    </dev-section>

    <dev-section title="其他">
      <PbfButton>按鈕</PbfButton>
    </dev-section>

    <dev-section title="其他">
      <RedCircleButton label="按鈕" />
    </dev-section>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import ReButton from '@/components/common/buttonCollection/ReButton.vue';
import PbfButton from '@/components/common/buttonCollection/PbfButton.vue';
import RedCircleButton from '@/components/common/buttonCollection/RedCircleButton.vue';

export default defineComponent({
  name: 'ViewReButton',
  components: {
    ReButton,
    PbfButton,
    RedCircleButton,
  },
});
</script>

<style lang="scss" scoped></style>
