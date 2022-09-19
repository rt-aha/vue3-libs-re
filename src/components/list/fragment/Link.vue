<template>
  <div class="c-f-link">
    <a class="link" href="https://www.highwealth.com.tw/index.php"> https://www.highwealth.com.tw/index.php </a>
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
  @include font-style($c-lightblue1, 16, 500, 0.2px, 27px);
}
</style>
