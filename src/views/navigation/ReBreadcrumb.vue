<template>
  <div class="v-breadcrumb">
    Breadcrumb 施工中 ...
    <dev-section title="基本使用"> <re-breadcrumb :config="config" @onClick="onClick" /> </dev-section>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import ReBreadcrumb from '@/components/navigation/ReBreadcrumb.vue';

export default defineComponent({
  name: 'ViewBreadcrumb',
  components: {
    ReBreadcrumb,
  },
  setup() {
    const config = [
      {
        label: '首頁',
        name: 'home',
      },
      {
        label: '主頁面1',
        name: 'main',
      },
      {
        label: '次頁面1',
        name: 'sub',
      },
    ];

    const onClick = (item) => {
      console.log('item', item);
    };

    return {
      config,
      onClick,
    };
  },
});
</script>

<style lang="scss" scoped></style>
