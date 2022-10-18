<template>
  <div class="c-red-circle-button">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75 75">
      <path class="cls-1" d="M68.41,56a36,36,0,1,1-1.79-39.77" />
      <path class="cls-2" d="M70.55,37.5a33.05,33.05,0,1,1-33-33A33.05,33.05,0,0,1,70.55,37.5" />
    </svg>
    <p class="label-text-wrap">
      <span
        class="label-text"
        :style="{
          color: labelColor,
        }"
      >
        {{ label }}
      </span>
    </p>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'RedCircleButton',
  props: {
    label: {
      type: String,
      default: '',
    },
    labelColor: {
      type: String,
      default: '#111111',
    },
    routeInfo: {
      type: Object,
      default: () => ({}),
    },
  },
});
</script>

<style lang="scss" scoped>
.c-red-circle-button {
  @include flex();
  position: relative;
  height: 52px;
  cursor: pointer;

  &:hover {
    .red-circle {
      width: 0;
      height: 0;
      border: 6px solid $c-deepblue;
    }

    svg {
      .cls-1 {
        opacity: 0;
        transition-delay: 0s;
        d: path("M70.55,37.5a33.05,33.05,0,1,1-33-33A33.05,33.05,0,0,1,70.55,37.5");
      }

      .cls-2 {
        opacity: 1;
        stroke-width: 8px;
        transition-timing-function: ease-in-out;
        transition-duration: 0.2s;
        transition-property: d, stroke-width;
        d: path("M41.5,37.5a4,4,0,1,1-4-4,4,4,0,0,1,4,4");
      }
    }
  }
}

.red-circle-wrap {
  position: absolute;
  top: 50%;
  left: -28px;
  transform: translateY(-50%);
}

.red-circle {
  @include circle(52px);
  @include position(center);
  pointer-events: none;
  border: 3px solid $c-deepblue;
  transition: 0.3s;
}

.label-text-wrap {
  position: relative;
  z-index: 10;
  display: inline-block;
  // padding: 8px 10px 12px 0px;
  margin-bottom: 5px;
  margin-left: -4px;
  white-space: nowrap;
  border-radius: 4px;
}

.label-text {
  @include font-size();
  font-weight: bold;
  letter-spacing: 0.8px;
}

svg {
  width: 52px;

  .cls-1,
  .cls-2 {
    fill: none;
    stroke: #c30013;
    stroke-miterlimit: 10;
    stroke-width: 3px;
  }

  .cls-1 {
    transition-delay: 0.17s;
  }

  .cls-2 {
    opacity: 0;
    transition-timing-function: ease-in-out;
    transition-duration: 0.2s;
    transition-property: d, stroke-width, opacity;
  }
}
</style>
