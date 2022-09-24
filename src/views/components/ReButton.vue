<template>
  <div class="v-re-button">
    <dev-section title="基礎">
      <ReButton>Button</ReButton>
    </dev-section>

    <dev-section title="基本使用">
      <re-button> 預設按鈕 </re-button>
      <re-button :disabled="true"> disabled按鈕 </re-button>
      <re-button type="border"> border按鈕 </re-button>
      <re-button type="plain"> plain按鈕 </re-button>
    </dev-section>
    <dev-section title="前綴、後綴">
      <re-button><template #prefix>pre</template>按鈕</re-button>
      <re-button>
        <template #prefix>pre</template>
        按鈕
        <template #suffix>suf</template>
      </re-button>
      <re-button>預設按鈕<template #suffix>suf</template></re-button>
    </dev-section>

    <dev-section title="帶 loading">
      <re-button :isLoading="true">按紐</re-button>
      <re-button :isLoading="true" type="border"> border按鈕 </re-button>
      <re-button :isLoading="true" type="plain"> plain按鈕 </re-button>
      <re-button :isLoading="true" size="small"> 小按鈕 </re-button>
    </dev-section>

    <dev-section title="小 size">
      <re-button size="small"> 小按鈕 </re-button>
    </dev-section>

    <dev-section title="圓形">
      <re-button extra="circle">circle</re-button>
      <re-button :style="{ 'border-color': '#CD5C5C', color: '#CD5C5C' }" type="border">按紐</re-button>
    </dev-section>

    <dev-section title="自訂背景色">
      <re-button bgColor="#CD5C5C">按紐</re-button>
    </dev-section>

    <dev-section title="自訂邊框顏色、內容文字顏色">
      <re-button :style="{ 'border-color': '#CD5C5C', color: '#CD5C5C' }" type="border">按紐</re-button>
    </dev-section>

    <dev-section title="其他">
      <pbf-button>按鈕</pbf-button>
    </dev-section>

    <dev-section title="其他">
      <red-circle-button label="按鈕" />
    </dev-section>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import ReButton from '@/components/buttonCollection/ReButton.vue';
import PbfButton from '@/components/buttonCollection/PbfButton.vue';
import RedCircleButton from '@/components/buttonCollection/RedCircleButton.vue';

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
