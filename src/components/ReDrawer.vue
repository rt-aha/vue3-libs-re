<template>
  <div
    class="re-drawer"
    :class="[
      {
        're-drawer--animate-in': drawerActive,
        're-drawer--animate-out': !drawerActive,
      },
    ]"
    @animationend="handleAniamtionEnd"
    @click.self="close"
  >
    <div
      class="re-drawer__box"
      :style="{
        width,
      }"
    >
      <div class="re-drawer__box__body">
        <template v-if="render">
          <component :is="render" v-bind="$props" @close="close" />
        </template>
        <template v-else>
          <div v-html="content"></div>

          <div class="btn-wrap" v-if="btns && btns.length">
            <div class="btn-wrap__btn" v-for="btn of btns" :key="btn.label">
              <re-button @click="() => handleBtn(btn.cb)">{{ btn.label }}</re-button>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import ReButton from '@/components/ReButton.vue';

export default defineComponent({
  name: 'ReDrawer',
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
    width: {
      type: String,
      default: '220px',
    },
  },
  emits: ['closeModal'],
  setup(props, { emit }) {
    // const internalInstance = getCurrentInstance();
    const drawerActive = ref(true);
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
      drawerActive.value = false;
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
      drawerActive,
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
    transform: translateX(100%);
  }
  to {
    transform: translateX(0%);
  }
}

@keyframes slideOut {
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(100%);
  }
}

.freeze-body {
  overflow: hidden;
}

.re-drawer {
  position: fixed;
  top: 0;
  left: 0;
  z-index: $zi-drawer;
  width: 100%;
  height: 100%;
  background-color: rgba(#333, 0.5);
  animation: fadeIn 0.3s;

  &--animate-in {
    animation: fadeIn 0.3s;
    .re-drawer__box {
      animation: slideIn 0.2s forwards;
    }
  }

  &--animate-out {
    animation: fadeOut 0.3s;
    .re-drawer__box {
      animation: slideOut 0.2s forwards;
    }
  }

  &__box {
    position: absolute;
    top: 0;
    right: 0;
    min-width: 320px;
    transform: translateX(0%);
    background-color: $c-white;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
    height: 100%;
    @include padding(30px 0);

    &__body {
      height: 100%;
      overflow-y: auto;
      @include padding(0 40px);
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
</style>
