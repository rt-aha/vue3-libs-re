<template>
  <div class="v-accordion">
    <dev-section title="基本使用">
      <div class="wrap">
        <re-accordion :data="aboutUsServices" />
      </div>
    </dev-section>

    <dev-section title="可放入組件：待處理">
      <div class="wrap">...</div>
    </dev-section>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import ReAccordion from '@/components/dataDisplay/ReAccordion.vue';
import { aboutUsServices } from '@/config/mockAccordionConfig';

export default defineComponent({
  name: 'ViewAccordion',
  components: {
    ReAccordion,
  },
  setup() {
    return {
      aboutUsServices,
    };
  },
});
</script>

<style lang="scss" scoped></style>
