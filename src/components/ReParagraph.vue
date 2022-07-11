<template>
  <div class="c-paragraph">
    <div class="c-paragraph__section" v-for="(t, idx) of wording" :key="`${t.text}${idx}`" :style="t.style">
      <div :style="t.style ? t.style : null" v-if="t.render">
        <component :is="t.render" />
      </div>
      <div class="text-loop" :style="t.style ? t.style : null" v-else>
        <p
          :class="['text-loop__word', `text-loop__word--${t.type}`]"
          :style="i === 0 && t.style ? t.style : null"
          v-for="(w, i) of t.text"
          :key="`${w}+${i}`"
        >
          {{ w }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ReParagraph',
  props: {
    wording: {
      type: Array,
      default: () => [],
    },
  },
});
</script>
<style lang="scss" scoped>
.c-paragraph {
  width: 100%;
  .text {
    &:first-child {
      margin-top: 0;
    }
  }

  &__section {
    & + & {
      margin-top: 30px;
    }
  }
}

.text-loop {
  text-align: justify;
  text-align-last: left;
  word-break: break-all;

  & + & {
    margin-top: 30px;
  }

  &__word {
    display: block;
    text-align: justify;
    text-align-last: left;

    & + & {
      margin-top: 0;
    }

    &--large {
      @include font-style($c-main, 35, 700, 3px, 51px);
    }

    &--normal {
      @include font-normal();
      margin-top: 10px;

      &:first-child {
        margin-top: 10px;
      }
    }

    &--normal-indent {
      @include font-style($c-main, 16, 400, 1.6px, 28px);
      padding-left: 16px;
    }

    &--normal-bold {
      @include font-style($c-main, 16, 700, 1.6px, 28px);
      margin-top: 20px;
    }

    &--normal-underline {
      @include font-style($c-main, 16, 400, 1.6px, 28px);
      text-decoration: underline;
    }
  }
}
</style>
