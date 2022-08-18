<template>
  <div class="v-badge">
    <dev-section title="基本使用">
      <div class="row">
        <div class="row__cell">
          <re-badge :value="val.a">
            <re-button>按鈕</re-button>
          </re-badge>
        </div>
        <div class="row__cell">
          <re-badge :value="val.b">
            <re-button>按鈕</re-button>
          </re-badge>
        </div>
        <div class="row__cell">
          <re-badge :value="val.c">
            <re-button>按鈕</re-button>
          </re-badge>
        </div>
      </div>
    </dev-section>

    <dev-section title="顏色">
      <div class="row">
        <div class="row__cell">
          <re-badge color="#cd853f" value="35">
            <re-button>按鈕</re-button>
          </re-badge>
        </div>
        <div class="row__cell">
          <re-badge color="#4caf50">
            <re-button>按鈕</re-button>
          </re-badge>
        </div>
        <div class="row__cell">
          <re-badge color="#cd5c5c">
            <re-button>按鈕</re-button>
          </re-badge>
        </div>
      </div>
    </dev-section>

    <dev-section title="上限">
      <re-badge color="#cd5c5c" :value="val.c" limit="100">
        <re-button>按鈕</re-button>
      </re-badge>
    </dev-section>

    <dev-section title="是否顯示0">
      <div class="row">
        <div class="row__cell">
          <re-badge color="#cd5c5c" value="0">
            <re-button>按鈕</re-button>
          </re-badge>
        </div>
        <div class="row__cell">
          <re-badge color="#cd5c5c" value="0" :showZero="false">
            <re-button>按鈕</re-button>
          </re-badge>
        </div>
      </div>
    </dev-section>

    <dev-section title="小紅點，按鈕">
      <div class="row">
        <div class="row__cell">
          <re-badge color="#cd5c5c" dot>
            <re-button>按鈕</re-button>
          </re-badge>
        </div>
        <div class="row__cell">
          <re-badge color="#cd5c5c" dot> 通知 </re-badge>
        </div>
      </div>
    </dev-section>

    <dev-section title="左邊">
      <re-badge color="#032f60" position="left"> 通知 </re-badge>
    </dev-section>

    <dev-section title="右邊">
      <re-badge color="#032f60" position="right"> 通知 </re-badge>
    </dev-section>

    <dev-section title="左邊，小紅點">
      <re-badge color="#cd5c5c" position="right" dot> 通知 </re-badge>
    </dev-section>

    <dev-section title="右邊，小綠點">
      <re-badge color="#4caf50" position="left" dot> 通知 </re-badge>
    </dev-section>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import ReBadge from '@/components/ReBadge.vue';
import ReButton from '@/components/ReButton.vue';

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

<style lang="scss" scoped>
.row {
  @include flex();

  &__cell {
    & + & {
      margin-left: 25px;
    }
  }
}
</style>
