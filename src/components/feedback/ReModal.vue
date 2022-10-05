<template>
  <div
    class="re-modal"
    :class="[
      {
        're-modal--animate-in': modalActive,
        're-modal--animate-out': !modalActive,
      },
    ]"
    @animationend="handleAniamtionEnd"
    @click.self="close"
  >
    <div class="re-modal__box">
      <div class="re-modal__box__body">
        <template v-if="render">
          <component :is="render" v-bind="$props" @close="close" />
        </template>
        <template v-else>
          <div v-html="content" />

          <div v-if="btns && btns.length" class="btn-wrap">
            <div v-for="btn of btns" :key="btn.label" class="btn-wrap__btn">
              <ReButton @click="() => handleBtn(btn.cb)">
                {{ btn.label }}
              </ReButton>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import ReButton from '@/components/common/ReButton.vue';

export default defineComponent({
  name: 'ReModal',
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
    content: {
      type: String,
      default: '',
    },
    renderType: {
      type: String,
      default: '',
    },
  },
  emits: ['closeModal'],
  setup(props, { emit }) {
    // const internalInstance = getCurrentInstance();
    const modalActive = ref(true);
    // 傳給外層使用這個 hook 的內容;
    const fulfillContent = ref(null);

    const handleAniamtionEnd = (e) => {
      if (e.animationName.includes('fadeOut')) {
        emit('closeModal', fulfillContent.value);
      }
    };

    const close = (content) => {
      fulfillContent.value = content;
      // 觸發動畫
      modalActive.value = false;
    };

    const handleBtn = async (cb) => {
      if (cb) {
        await cb();
      }
      close();
    };

    return {
      close,
      handleBtn,
      modalActive,
      handleAniamtionEnd,
    };
  },
});
</script>

<style lang="scss" scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes slideIn {
  from {
    transform: translate(-50%, -50%) translateY(-30px);
  }
  to {
    transform: translate(-50%, -50%) translateY(0);
  }
}

@keyframes slideOut {
  from {
    transform: translate(-50%, -50%) translateY(0);
  }
  to {
    transform: translate(-50%, -50%) translateY(-30px);
  }
}

.freeze-body {
  overflow: hidden;
}

.re-modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: $zi-modal;
  width: 100%;
  height: 100%;
  background-color: rgba(#333, 0.5);
  animation: fadeIn 0.3s;

  &--animate-in {
    animation: fadeIn 0.3s;
    .re-modal__box {
      animation: slideIn 0.2s forwards;
    }
  }

  &--animate-out {
    animation: fadeOut 0.3s;
    .re-modal__box {
      animation: slideOut 0.2s forwards;
    }
  }

  &__box {
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 320px;
    transform: translate(-50%, -50%);
    background-color: $c-white;
    border-radius: 12px;

    &__body {
      @include padding(50px 40px);
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
