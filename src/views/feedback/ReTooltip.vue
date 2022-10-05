<template>
  <div class="v-tooltip">
    <dev-section title="基本使用">
      <ReTooltip label="這個按鈕說明">
        <ReButton size="small">
          小按鈕
        </ReButton>
      </ReTooltip>
    </dev-section>
    <dev-section title="基本使用">
      <ReTooltip label="新增">
        <img class="demo-icon" src="@/assets/icon/add.svg">
      </ReTooltip>
      <ReTooltip label="編輯">
        <img class="demo-icon" src="@/assets/icon/edit.svg">
      </ReTooltip>
      <ReTooltip label="刪除">
        <img class="demo-icon" src="@/assets/icon/delete.svg">
      </ReTooltip>
    </dev-section>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import ReTooltip from '@/components/feedback/ReTooltip.vue';
import ReButton from '@/components/common/ReButton.vue';

export default defineComponent({
  name: 'ViewTooltip',
  components: {
    ReTooltip,
    ReButton,
  },
});
</script>

<style lang="scss" scoped>
.demo-icon {
  cursor: pointer;
}
</style>
