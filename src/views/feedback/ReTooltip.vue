<template>
  <div class="v-tooltip">
    <dev-section title="基本使用">
      <re-tooltip label="這個按鈕說明">
        <re-button size="small"> 小按鈕 </re-button>
      </re-tooltip>
    </dev-section>
    <dev-section title="基本使用">
      <re-tooltip label="新增">
        <img class="demo-icon" src="@/assets/icon/add.svg" />
      </re-tooltip>
      <re-tooltip label="編輯">
        <img class="demo-icon" src="@/assets/icon/edit.svg" />
      </re-tooltip>
      <re-tooltip label="刪除">
        <img class="demo-icon" src="@/assets/icon/delete.svg" />
      </re-tooltip>
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
