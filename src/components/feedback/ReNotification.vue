<template>
  <div
    class="re-notification"
    :class="[
      {
        're-notification--animate-in': activeType === 1,
        're-notification--animate-out': activeType === 2,
      },
    ]"
    @animationend="handleAniamtionEnd"
    @click.self="close"
  >
    <div class="re-notification__box">
      <div class="re-notification__box__body">
        <ReNotificationItem v-for="c of contentList" :key="c" :content="c" @close="close" />
      </div>
    </div>
  </div>
</template>

<script setup>
import ReNotificationItem from '@/components/feedback/ReNotificationItem.vue';

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
    transform: translate(0, -100px);
  }

  to {
    transform: translate(-20px, -100px);
  }
}
@keyframes slideOut {
  from {
    transform: translate(-20px, -100px);
  }

  to {
    transform: translate(200px, -100px);
  }
}

.re-notification {
  @include position(tr, 200px, 0);
  z-index: $zi-notification;
  transform: translate(-50%, -200%);

  &--animate-in {
    animation: slideIn 0.2s forwards;

    .re-notification__box {
    }
  }

  &--animate-out {
    animation: slideOut 0.2s;

    .re-modal__box {
    }
  }
}

.btn-wrap {
  @include flex(center);
  margin-top: 30px;

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
