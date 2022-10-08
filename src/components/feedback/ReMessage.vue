<template>
  <div
    class="re-message"
    :class="[
      {
        're-message--animate-in': activeType === 1,
        're-message--animate-out': activeType === 2,
      },
    ]"
    @animationend="handleAniamtionEnd"
    @click.self="close"
  >
    <div class="re-message__box">
      <div class="re-message__box__body">
        <ReMessageItem v-for="c of contentList" :key="c" :content="c" @close="close" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
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

const emit = defineEmits(['close']);
const contentList = ref([]);
const activeType = ref(0);

const handleAniamtionEnd = (e) => {
  if (e.animationName.includes('slideOut')) {
    activeType.value = 0;
    emit('close');
  }
};

const close = () => {
  contentList.value.shift();
  if (contentList.value.length === 0) {
    // 觸發動畫
    activeType.value = 2;
  }
};

onMounted(() => {
  activeType.value = 1;
});

watch(() => props.content, (newValue) => {
  contentList.value.push(newValue);
}, {
  immediate: true,
});
</script>

<style lang="scss" scoped>
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

.re-message {
  @include position(tl, 0, 50%);
  transform: translate(-50%, -200%);
  z-index: $zi-message;

  &--animate-in {
    animation: slideIn 0.2s forwards;
    .re-message__box {
    }
  }

  &--animate-out {
    animation: slideOut 0.2s;
    .re-modal__box {
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
