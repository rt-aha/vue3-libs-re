<template>
  <div class="c-test-comp">
    c-test-comp

    <div class="btn-wrap" v-if="btns && btns.length">
      <div class="btn-wrap__btn" v-for="btn of btns" :key="btn.label">
        <re-button @click="handleConfirm(btn.cb)">{{ btn.label }}</re-button>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import ReButton from '@/components/ReButton.vue';

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
  margin-top: 30px;
  @include flex(center);

  &__btn {
    & + & {
      margin-left: 10px;
    }
  }
}
</style>
