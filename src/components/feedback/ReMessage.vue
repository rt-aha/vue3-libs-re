<template>
  <div
    class="re-message"
    :class="[
      {
        're-message--animate-in': modalActive,
        're-message--animate-out': !modalActive,
      },
    ]"
    @animationend="handleAniamtionEnd"
    @click.self="close"
  >
    <div class="re-message__box">
      <div class="re-message__box__body">
        <template v-if="render">
          <component :is="render" v-bind="$props" @close="close" />
        </template>
        <template v-else>
          <ReMessageItem :content="content" @hide="hide" />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import ReButton from '@/components/common/ReButton.vue';
import ReMessageItem from '@/components/feedback/ReMessageItem.vue';

const props = defineProps({
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
});

const emit = defineEmits(['closeModal']);

// const internalInstance = getCurrentInstance();
const modalActive = ref(true);
// 傳給外層使用這個 hook 的內容;
const fulfillContent = ref(null);

const handleAniamtionEnd = (e) => {
  if (e.animationName.includes('slideOut')) {
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

const hide = () => {
  close();
};
</script>

<style lang="scss" scoped>
// @keyframes fadeIn {
//   from {
//     opacity: 0;
//   }
//   to {
//     opacity: 1;
//   }
// }

// @keyframes fadeOut {
//   from {
//     opacity: 1;
//   }
//   to {
//     opacity: 0;
//   }
// }

@keyframes slideIn {
  from {
    transform: translate(-50%, 0px);
  }
  to {
    transform: translate(-50%, 20px);
  }
}

@keyframes slideOut {
  from {
    transform: translate(-50%, 20px);
  }
  to {
    transform: translate(-50%, -100%)
  }
}

// .freeze-body {
//   overflow: hidden;
// }

.re-message {
  @include position(tl, 0, 50%);
  transform: translate(-50%, -200%);
  z-index: $zi-message;
  background-color: $c-white;
  border-radius: 4px;
  box-shadow: 3px 3px 6px rgba($c-black, 0.2);
  // animation: fadeIn 0.3s;

  &--animate-in {
    // animation: fadeIn 0.3s;
    animation: slideIn 0.2s forwards;
    .re-message__box {
    }
  }

  &--animate-out {
    // animation: fadeOut 0.3s;
    animation: slideOut 0.2s;
    .re-modal__box {
    }
  }

  &__box {
    // min-width: 320px;
    // @include position(tl, 0, 50%);
    // transform: translate(100%, -50%);
    // background-color: rgba($c-green, .8);
    // border-radius: 4px;

    &__body {
      @include padding(10px 20px);
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

.message-text {
  color: #333;
}
</style>
