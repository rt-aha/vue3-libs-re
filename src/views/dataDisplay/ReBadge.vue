<template>
  <div class="v-badge">
    <dev-section title="基本使用">
      <div class="wrap">
        <dev-desc text="個位數" />
        <ReBadge :value="val.a">
          <ReButton>按鈕</ReButton>
        </ReBadge>

        <dev-desc text="十位數" mt />
        <ReBadge :value="val.b">
          <ReButton>按鈕</ReButton>
        </ReBadge>

        <dev-desc text="百位數" mt />
        <ReBadge :value="val.c">
          <ReButton>按鈕</ReButton>
        </ReBadge>
      </div>
    </dev-section>

    <dev-section title="顏色">
      <div class="wrap">
        <dev-props type="String" prop-name="color" text="自訂顏色，色號" />
        <dev-desc text="color=#cd853f" />
        <ReBadge color="#cd853f" value="35">
          <ReButton>按鈕</ReButton>
        </ReBadge>

        <dev-desc text="color=#4caf50" mt />
        <ReBadge color="#4caf50">
          <ReButton>按鈕</ReButton>
        </ReBadge>

        <dev-desc text="color=#cd5c5c" mt />
        <ReBadge color="#cd5c5c">
          <ReButton>按鈕</ReButton>
        </ReBadge>
      </div>
    </dev-section>

    <dev-section title="上限">
      <div class="wrap">
        <dev-props type="String|Number" prop-name="limit" text="輸入上限，超過上限以+表示，預設沒上限" />
        <ReBadge color="#cd5c5c" :value="val.c" limit="100">
          <ReButton>按鈕</ReButton>
        </ReBadge>
      </div>
    </dev-section>

    <dev-section title="是否顯示0">
      <div class="wrap">
        <dev-props type="Boolean" prop-name="show-zero" text="是否顯示0，預設 false 不顯示" />
        <dev-desc text="show-zero=true" />
        <ReBadge color="#cd5c5c" value="0" show-zero>
          <ReButton>按鈕</ReButton>
        </ReBadge>

        <dev-desc text="show-zero=false" mt />
        <ReBadge color="#cd5c5c" value="0">
          <ReButton>按鈕</ReButton>
        </ReBadge>
      </div>
    </dev-section>

    <dev-section title="小紅點，按鈕">
      <div class="wrap">
        <dev-props type="Boolean" prop-name="dot" text="顯示小紅點" />
        <dev-desc text="按鈕" />
        <ReBadge color="#cd5c5c" dot>
          <ReButton>按鈕</ReButton>
        </ReBadge>

        <dev-desc text="文字" mt />
        <ReBadge color="#cd5c5c" dot>
          通知
        </ReBadge>
      </div>
    </dev-section>

    <dev-section title="左邊">
      <div class="wrap">
        <dev-props type="String" prop-name="position" text="left, right，顯示在左邊/右邊" />

        <dev-desc text="position=left" mt />
        <ReBadge color="#032f60" position="left">
          通知
        </ReBadge>

        <dev-desc text="position=right" mt />
        <ReBadge color="#032f60" position="right">
          通知
        </ReBadge>

        <dev-desc text="混合使用" mt />
        <dev-desc text="小紅點 color=#cd5c5c position=right dot=true" />
        <ReBadge color="#cd5c5c" position="right" dot>
          通知
        </ReBadge>

        <dev-desc text="小綠點 color=#4caf50 position=left dot=true" mt />
        <ReBadge color="#4caf50" position="left" dot>
          通知
        </ReBadge>
      </div>
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
