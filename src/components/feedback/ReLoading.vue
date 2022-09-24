<template>
  <div class="c-loading" :class="`c-loading--${color}`">
    <div class="loader loader--style2" title="1">
      <svg
        version="1.1"
        id="loader-1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="20px"
        height="20px"
        viewBox="0 0 50 50"
        style="enable-background: new 0 0 50 50"
        xml:space="preserve"
      >
        <path
          fill="#000"
          d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"
        >
          <animateTransform
            attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Loading',
  props: {
    color: {
      type: String,
      default: '',
    },
  },
});
</script>
<style lang="scss" scoped>
.c-loading {
  @include flex(center);
  margin: 10px;

  svg path,
  svg rect {
    fill: $c-main;
  }

  &--white {
    svg path,
    svg rect {
      fill: $c-white;
    }
  }

  &--grey {
    svg path,
    svg rect {
      fill: $c-text1;
    }
  }
}
.loader {
  text-align: center;
  display: inline-block;
}
</style>
