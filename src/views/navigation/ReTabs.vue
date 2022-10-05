<template>
  <div class="v-tabs">
    <dev-section title="基本使用">
      <ReTabs v-model="tab" :tabs-config="tabsConfig" @change="handleTab">
        <template #sport>
          sport
        </template>
        <template #entertainment>
          entertainment
        </template>
        <template #life>
          life
        </template>
      </ReTabs>
    </dev-section>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import ReTabs from '@/components/navigation/ReTabs.vue';

export default defineComponent({
  name: 'ViewTabs',
  components: {
    ReTabs,
  },
  setup() {
    const tab = ref('sport');

    const handleTab = (tabInfo) => {
      if (tabInfo?.name) {
        tab.value = tabInfo.name;
      }
    };

    const tabsConfig = [
      {
        label: '運動',
        name: 'sport',
      },
      {
        label: '娛樂',
        name: 'entertainment',
      },
      {
        label: '生活',
        name: 'life',
      },
    ];

    return {
      tab,
      handleTab,
      tabsConfig,
    };
  },
});
</script>

<style lang="scss" scoped></style>
