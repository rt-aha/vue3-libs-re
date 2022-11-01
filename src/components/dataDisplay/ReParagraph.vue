<template>
  <div class="c-paragraph">
    <div
      v-for="(t, idx) of wording" :key="`${t.text}${idx}`" class="c-paragraph__section" :style="t.style"
      :class="{
        'c-paragraph__section--next': t.nextParagraph,
      }"
    >
      <div v-if="t.render" :style="t.style ? t.style : null">
        <component :is="t.render" />
      </div>
      <div
        v-else class="text-loop" :class="[`text-loop--${t.type}`]" :style="t.style ? t.style : null"
      >
        <p
          v-for="(w, i) of t.text" :key="`${w}+${i}`"
          class="text-loop__word"
          :data-order="`${i + 1}.`"
          :class="[`text-loop__word--${t.type}`]"
          :style="i === 0 && t.style ? t.style : null"
        >
          {{ w }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  wording: {
    type: Array,
    default: () => [],
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
    // & + & {
    //   margin-top: 30px;
    // }

    &--next {
      margin-top: 28px;
    }
  }
}

.text-loop {
  text-align: justify;
  text-align-last: left;
  word-break: break-all;

  &--normal-indent-counter {
    counter-increment: num;
  }

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

    &--note {
      @include font-style($c-note, 16, 400, 0.8px, 26px);
    }

    &--normal {
      @include font-style($c-paragraph-normal, 16, 400, 0.8px, 26px);
      // margin-top: 15px;
    }

    &--normal-vital {
      @include font-style($c-red, 16, 400, 0.8px, 26px);
      // margin-top: 15px;
    }

    &--normal-bold {
      @include font-style($c-paragraph-normal, 16, 700, 1.6px, 28px);
      // margin-top: 20px;
    }

    &--normal-underline {
      @include font-style($c-paragraph-normal, 16, 400, 1.6px, 28px);
      text-decoration: underline;
    }

    &--normal-indent {
      @include font-style($c-paragraph-normal, 16, 400, 1.6px, 26px);
      padding-left: 16px;
    }

    &--normal-indent-dot {
      @include font-style($c-paragraph-normal, 16, 400, 0.8px, 26px);
      position: relative;
      margin-left: 16px;

      &::before {
        @include position(tl, 50%, -11px);
        @include circle(4px);
        display: inline-block;
        content: "";
        background-color: $c-paragraph-normal;
        transform: translateY(-50%);
      }
    }

    &--normal-indent-counter {
      @include font-style($c-paragraph-normal, 16, 400, 0.8px, 26px);
      position: relative;
      margin-left: 16px;
      counter-increment: num;

      &::before {
        @include position(tl, 0, -16px);
        // transform: translateY();
        content: attr(data-order);
      }
    }
  }
}
</style>
