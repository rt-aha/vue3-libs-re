<template>
  <div class="v-accordion">
    <dev-section title="基本使用">
      <div class="wrap">
        <dev-desc text="使用方式參考 @/config/mockAccordion" />
        <ReAccordion :data="aboutUsServices" />
      </div>
    </dev-section>

    <dev-section title="可放入組件">
      <div class="wrap">
        <ReAccordion :data="workReportBudget" />
      </div>
    </dev-section>
  </div>
</template>

<script setup>
import ReAccordion from '@/components/dataDisplay/ReAccordion.vue';
import { aboutUsServices, workReportBudget } from '@/config/mockAccordion';
</script>
