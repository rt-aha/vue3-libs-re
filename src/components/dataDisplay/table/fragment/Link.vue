<template>
  <div class="c-f-link">
    <a class="link" href="https://yahoo.com.tw"> https://yahoo.com.tw </a>
  </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CompFragmentLink',
});
</script>
<style lang="scss" scoped>
.link {
  @include font-style($c-grey, 16, 500, 0.2px, 27px);
}
</style>
