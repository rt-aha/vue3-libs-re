<template>
  <div class="c-survey-status" :class="[`c-survey-status--type--${calcType}`]">
    <p class="c-survey-status__text">
      {{ convertStatusToString }}
    </p>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'SurveyStatus',
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const calcType = computed(() => {
      if (props.data.surveyStatus > 4) {
        return 'green';
      }

      return 'red';
    });

    const convertStatusToString = computed(() => {
      if (props.data.surveyStatus > 4) {
        return '已完成';
      }

      return '未完成';
    });

    return {
      calcType,
      convertStatusToString,
    };
  },
});
</script>

<style lang="scss" scoped>
.c-survey-status {
  @include padding(5px 12px);
  display: inline-block;
  border-radius: 4px;

  &--type {
    &--green {
      background-color: rgba($c-green, 0.1);

      .c-survey-status__text {
        @include font-style($c-green, 14);
      }
    }

    &--red {
      background-color: rgba($c-red, 0.1);

      .c-survey-status__text {
        @include font-style($c-red, 14);
      }
    }
  }

  &__text {
  }
}
</style>
