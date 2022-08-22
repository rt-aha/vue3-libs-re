<template>
  <transition name="fade">
    <div class="re-dialog" v-show="visible" @click.self="close">
      <div
        class="re-dialog__box"
        :class="[
          {
            're-dialog__box--slide-top-in': visible,
            're-dialog__box--slide-top-out': !visible,
          },
        ]"
      >
        <div class="re-dialog__box__body">
          <component :is="render" v-bind="$props" @close="close" />

          <div class="btn-wrap" v-if="btns && btns.length && renderType === 'normal'">
            <div class="btn-wrap__btn" v-for="btn of btns" :key="btn.label">
              <re-button @click="() => handleBtn(btn.cb)">{{ btn.label }}</re-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { defineComponent, watch, getCurrentInstance } from 'vue';
import ReButton from '@/components/ReButton.vue';

export default defineComponent({
  name: 'AsyncDialog',
  components: {
    ReButton,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    render: {
      default: null,
    },
    data: {
      dafeult: () => ({}),
    },
    btns: {
      type: Array,
      default: () => [],
    },
    desc: {
      type: String,
      default: '',
    },
    renderType: {
      type: String,
      default: '',
    },
  },
  emits: ['beforeClose', 'update:visible'],
  setup(props, { emit }) {
    const internalInstance = getCurrentInstance();

    const close = (status) => {
      emit('update:visible', status);
    };

    const handleBtn = (cb) => {
      if (cb) {
        cb();
      }
      close(false);
    };

    watch(
      () => props.visible,
      (val) => {
        if (val) {
          document.body.classList.add('freeze-body');
          document.body.appendChild(internalInstance);
        } else {
          document.body.classList.remove('freeze-body');
        }
      },
    );

    return {
      close,
      handleBtn,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/utils/_transition.scss';

.freeze-body {
  overflow: hidden;
}

.re-dialog {
  position: fixed;
  top: 0;
  left: 0;
  z-index: $zi-dialog;
  width: 100%;
  height: 100%;
  background-color: rgba(#333, 0.5);

  &__box {
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 320px;
    transform: translate(-50%, -50%);
    background-color: $c-white;

    &__body {
      /* @include padding(10px); */
      @include padding(50px 75px);
    }
  }
}

.btn-wrap {
  margin-top: 30px;
  @include flex(center);

  &__btn {
    & + & {
      margin-left: 10px;
    }
  }
}

@keyframes slideTopIn {
  from {
    transform: translate(-50%, calc(-50% - 30px));
  }

  to {
    transform: translate(-50%, -50%);
  }
}

@keyframes slideTopOut {
  from {
    transform: translate(-50%, -50%);
  }

  to {
    transform: translate(-50%, calc(-50% - 30px));
  }
}
</style>
