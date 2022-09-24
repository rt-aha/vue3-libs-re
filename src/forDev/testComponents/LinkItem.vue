<template>
  <div class="c-link-item">
    <a class="link" target="_blank" rel="noreferrer noopener" :href="link">
      <span class="link__label"> {{ label }} <img class="link__icon" src="@/assets/icon/link.svg" /></span>
    </a>
  </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LinkItem',

  props: {
    label: {
      type: String,
      default: '',
    },
    link: {
      type: String,
      default: '',
    },
  },
});
</script>
<style lang="scss" scoped>
.link {
  // @include flex();
  cursor: pointer;

  &__label {
    display: inline-block;
    @include font-normal();
    text-decoration: underline;
    cursor: pointer;
    line-height: 30px;
  }

  &__icon {
    display: inline-block;
    margin-left: 10px;
  }
}
</style>
