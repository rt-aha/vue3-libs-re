<template>
  <div class="c-test-comp">
    c-test-comp

    <div v-if="btns && btns.length" class="btn-wrap">
      <div v-for="btn of btns" :key="btn.label" class="btn-wrap__btn">
        <ReButton @click="handleConfirm(btn.cb)">
          {{ btn.label }}
        </ReButton>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import ReButton from '@/components/common/ReButton.vue';

export default defineComponent({
  name: 'TestComp',
  components: {
    ReButton,
  },
  props: {
    btns: {
      type: Array,
      default: () => [],
    },
    desc: {
      type: String,
      default: '',
    },
    close: {
      type: Function,
      default: () => {},
    },
  },
  setup(_, { emit }) {
    const handleConfirm = (cb) => {
      if (cb) {
        cb();
      }
      emit('close', false);
    };

    return {
      handleConfirm,
    };
  },
});
</script>

<style lang="scss" scoped>
.btn-wrap {
  @include flex(center);
  margin-top: 30px;

  &__btn {
    & + & {
      margin-left: 10px;
    }
  }
}
</style>
