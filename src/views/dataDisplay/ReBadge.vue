<template>
  <div class="v-badge">
    <dev-section title="基本使用">
      <ReBadge :value="val.a">
        <ReButton>按鈕</ReButton>
      </ReBadge>

      <ReBadge :value="val.b">
        <ReButton>按鈕</ReButton>
      </ReBadge>

      <ReBadge :value="val.c">
        <ReButton>按鈕</ReButton>
      </ReBadge>
    </dev-section>

    <dev-section title="顏色">
      <ReBadge color="#cd853f" value="35">
        <ReButton>按鈕</ReButton>
      </ReBadge>

      <ReBadge color="#4caf50">
        <ReButton>按鈕</ReButton>
      </ReBadge>

      <ReBadge color="#cd5c5c">
        <ReButton>按鈕</ReButton>
      </ReBadge>
    </dev-section>

    <dev-section title="上限">
      <ReBadge color="#cd5c5c" :value="val.c" limit="100">
        <ReButton>按鈕</ReButton>
      </ReBadge>
    </dev-section>

    <dev-section title="是否顯示0">
      <ReBadge color="#cd5c5c" value="0">
        <ReButton>按鈕</ReButton>
      </ReBadge>

      <ReBadge color="#cd5c5c" value="0" :show-zero="false">
        <ReButton>按鈕</ReButton>
      </ReBadge>
    </dev-section>

    <dev-section title="小紅點，按鈕">
      <ReBadge color="#cd5c5c" dot>
        <ReButton>按鈕</ReButton>
      </ReBadge>

      <ReBadge color="#cd5c5c" dot>
        通知
      </ReBadge>
    </dev-section>

    <dev-section title="左邊">
      <ReBadge color="#032f60" position="left">
        通知
      </ReBadge>
    </dev-section>

    <dev-section title="右邊">
      <ReBadge color="#032f60" position="right">
        通知
      </ReBadge>
    </dev-section>

    <dev-section title="左邊，小紅點">
      <ReBadge color="#cd5c5c" position="right" dot>
        通知
      </ReBadge>
    </dev-section>

    <dev-section title="右邊，小綠點">
      <ReBadge color="#4caf50" position="left" dot>
        通知
      </ReBadge>
    </dev-section>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import ReBadge from '@/components/dataDisplay/ReBadge.vue';
import ReButton from '@/components/common/ReButton.vue';

export default defineComponent({
  name: 'ViewBadge',
  components: {
    ReBadge,
    ReButton,
  },
  setup() {
    const val = {
      a: 3,
      b: 12,
      c: 156,
    };

    return {
      val,
    };
  },
});
</script>

<style lang="scss" scoped></style>
