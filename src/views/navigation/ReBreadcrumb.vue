<template>
  <div class="v-breadcrumb">
    <dev-section title="基本使用">
      <ReBreadcrumb :config="config" @onClick="onClick" />
    </dev-section>

    <dev-section title="凸顯當前頁面">
      <ReBreadcrumb :config="config" clarify @onClick="onClick" />
    </dev-section>

    <dev-section title="自訂義組件">
      <ReBreadcrumb :config="config2" @onClick="onClick" />
    </dev-section>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import ReBreadcrumb from '@/components/navigation/ReBreadcrumb.vue';
import DevBreadcrumbContent from '@/forDev/components/DevBreadcrumbContent.vue';

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

    const config2 = [
      {
        label: '首頁',
        name: 'home',
      },
      {
        label: '主頁面1',
        name: 'main',
        render: DevBreadcrumbContent,
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
      config2,
    };
  },
});
</script>

<style lang="scss" scoped></style>
