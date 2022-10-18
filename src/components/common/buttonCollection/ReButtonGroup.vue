<template>
  <div class="re-button-group" :class="[`re-button-group--${btnType}`]">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ReButtonGroup',
  data() {
    return {
      btnType: 'default',
    };
  },
  mounted() {
    this.getBtnType();
  },
  methods: {
    getBtnType() {
      const children = this.$children;

      // 只查第一層
      for (const ele of children) {
        if (ele.$options.name === 'ReButton') {
          this.btnType = ele.type;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.re-button-group {
  &--default {
    .re-button + .re-button {
      margin-left: 1px;
    }

    .re-button {
      border-radius: 0;

      &:first-child {
        @include cus-radius(4px, 0, 0, 4px);
      }

      &:last-child {
        @include cus-radius(0, 4px, 4px, 0);
      }
    }
  }

  &--border {
    .re-button + .re-button {
      margin-left: 0;
    }

    .re-button {
      border-right-width: 0;
      border-radius: 0;

      &:hover {
        opacity: 1;
      }

      &:first-child {
        @include cus-radius(4px, 0, 0, 4px);
      }

      &:last-child {
        @include cus-radius(0, 4px, 4px, 0);
        border-right-width: 1px;
      }
    }
  }
}
</style>
