<template>
  <div class="v-table">
    <ReTableIndex :config="surveyListConfig" :content-data="mockData" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import ReTableIndex from '@/components/dataDisplay/table/ReTableIndex.vue';
import { surveyListConfig } from '@/config/tableMockConfig';

export default defineComponent({
  name: 'ViewTable',
  components: { ReTableIndex },
  setup() {
    const mockData = Array.from({ length: 20 }).map((_, index) => ({
      key: index,
      area: '大台北地區',
      name: '鉑金愛悅',
      type: '商辦',
      date: '2022-08-19 10:00',
      link: 'https://www.highwealth.com.tw/index.php',
    }));

    return {
      mockData,
      surveyListConfig,
    };
  },
});
</script>

<style lang="scss"></style>
