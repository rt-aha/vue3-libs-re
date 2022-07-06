<template>
  <transition name="fade">
    <div class="re-dialog" v-show="visible" @click.self="closeDialog">
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
          <slot>body content</slot>

          <div class="btn-wrap">
            <re-button @click="handleConfirm">{{ confirmBtnText }}</re-button>
            <!-- <pr-button @click="handleCancel">{{ cancelBtnText }}</pr-button> -->
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { defineComponent, watch, getCurrentInstance } from 'vue';

import ReButton from '@/components/ReButton/index.vue'

export default defineComponent({
  name: 'AsyncDialog',
  components: {
    ReButton
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    footerPosition: {
      type: String,
      default: 'left',
    },
    template: {
      default: () => {},
    },
    data: {
      dafeult: () => ({}),
    },
    appendToBody: {
      type: Boolean,
      default: false,
    },
    confirmFn: {
      default: null,
    },
    cancelFn: {
      defualt: null,
    },
    confirmBtnText: {
      type: String,
      default: '確定',
    },
    cancelBtnText: {
      type: String,
      default: '取消',
    },
    callback: {
      type: Function,
      default: () => {},
    },
  },
  emits: ['beforeClose', 'update:visible'],
  setup(props, { emit }) {
    const internalInstance = getCurrentInstance();

    const closeDialog = (status) => {
      if (props.callback) {
        props.callback();
      }

      emit('update:visible', status);
    };

    watch(props.visible, (val) => {
      if (val) {
        document.body.classList.add('freeze-body');
        if (props.appendToBody) {
          document.body.appendChild(internalInstance);
        }
      } else {
        document.body.classList.remove('freeze-body');
      }
    });

    const handleConfirm = () => {
      closeDialog(true);
    };

    const handleCancel = () => {
      if (props.cancelFn) {
        props.cancelFn();
      }

      closeDialog(false);
    };

    return {
      closeDialog,
      handleConfirm,
      handleCancel,
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
