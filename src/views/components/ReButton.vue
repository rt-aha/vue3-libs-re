<template>
  <div class="v-re-button">
    ReButton 施工中 ...

    <div>
      <ReButton>Button</ReButton>
    </div>

  </div>
</template>

<script>
import { defineComponent } from 'vue';
import ReButton from '@/components/ReButton/index.vue'

export default defineComponent({
  name: 'ViewReButton',
  components: {
    ReButton
  }
});
</script>

<style lang="scss" scoped>
</style>
