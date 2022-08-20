<template>
  <div class="v-re-button">
    ReButton 施工中 ...

    <dev-section title="基礎">
      <ReButton>Button</ReButton>
    </dev-section>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import ReButton from '@/components/ReButton.vue';

export default defineComponent({
  name: 'ViewReButton',
  components: {
    ReButton,
  },
});
</script>

<style lang="scss" scoped></style>
