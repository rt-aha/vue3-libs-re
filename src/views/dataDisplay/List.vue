<template>
  <div class="v-list">
    <dev-section title="基本使用">
      <ReListIndex :config="customerManagementConfig" :content-data="mockData" />
    </dev-section>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import ReListIndex from '@/components/dataDisplay/list/ReListIndex.vue';
import { customerManagementConfig } from '@/config/listMockConfig.js';

export default defineComponent({
  name: 'ViewList',
  components: { ReListIndex },
  setup() {
    const mockData = Array.from({ length: 20 }).map((_, index) => ({
      key: index,
      name: `name${index}`,
      salesName: `sales${index}`,
      customerName: `customer${index}`,
      phone: '0987654321',
      email: 'abc@aa.bb',
      status: Math.random() > 0.5 ? 'Yes' : 'No',
      record: '',
      edit: '',
      surveyStatus: Math.floor(Math.random() * 10),
      updateTime: '2022-05-08 14:05',
    }));

    return {
      mockData,
      customerManagementConfig,
    };
  },
});
</script>

<style lang="scss"></style>
