<template>
  <div v-for="d of data" :key="d.key" class="re-accordion" :class="{ 're-accordion--mt': mt }">
    <div class="re-accordion__content">
      <div class="title" @click="handleExpandStatus(d.key)">
        <p class="title__text">
          {{ d.title }}
        </p>
        <div class="title__expand">
          <img
            class="title__expand__icon"
            :class="{ 'title__expand__icon--active': expandStatus[d.key] }"
            src="@/assets/icon/icon-down.svg"
          >
        </div>
      </div>
      <ReCollapseTransition :show="expandStatus[d.key]">
        <div class="desc">
          <template v-if="d.renderContent">
            <component :is="d.renderContent" />
          </template>
          <div v-else-if="vhtml" class="vhtml-content" v-html="d.content" />
          <template v-else>
            <template v-if="Array.isArray(d.content)">
              <p v-for="w of d.content" :key="w" class="text-loop">
                {{ w }}
              </p>
            </template>
            <template v-else>
              <p class="text-loop">
                {{ d.content }}
              </p>
            </template>
          </template>
        </div>
      </ReCollapseTransition>
    </div>
  </div>
</template>

<script setup>
import ReCollapseTransition from '@/components/utility/ReCollapseTransition.vue';

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  mt: {
    type: Boolean,
    default: false,
  },
  vhtml: {
    type: Boolean,
    default: false,
  },
});

const route = useRoute();

const expandStatus = ref({});

const initExpandStatus = () => {
  const keysObj = props.data.reduce((obj, item) => {
    obj[item.key] = false;
    return obj;
  }, {});
  expandStatus.value = keysObj;
  let currExpandKey = '';

  return (key) => {
    if (key === currExpandKey) {
      expandStatus.value[currExpandKey] = false;
      currExpandKey = '';
      return;
    }

    if (currExpandKey) {
      expandStatus.value[currExpandKey] = false;
    }

    currExpandKey = key;
    expandStatus.value[key] = true;
  };
};

// 閉包初始化
let handleExpandStatus = initExpandStatus();

// 若有預設要打開的
const defaultExpand = () => {
  const expandKey = route.query.expand || '';
  if (expandKey) {
    handleExpandStatus(expandKey);
  }
};

onMounted(() => {
  defaultExpand();
});

watch(
  () => props.data,
  () => {
    handleExpandStatus = initExpandStatus();
  },
);
</script>

<style lang="scss" scoped>
.re-accordion {
  width: 100%;
  background-color: rgba($c-deepblue, 0.1);
  border-radius: 20px;

  &--mt {
    margin-top: 110px;
  }

  & + & {
    margin-top: 20px;
  }

  &__content {
    @include padding(24px 20px);
  }
}

.title {
  @include flex(space-between);
  cursor: pointer;

  &__text {
    @include font-style($c-deepblue, 20, 700, 1.6px, 28px);
  }

  &__expand {
    @include flex(center);
    position: relative;
    flex: none;
    width: 40px;
    height: 40px;
    margin-left: 15px;
    background-color: rgba($c-deepblue, 0.3);
    border-radius: 20px;

    &__icon {
      width: 20px;
      transition: 0.3s;
      transform: rotate(0deg);

      &--active {
        transform: rotate(180deg);
      }
    }
  }
}

.desc {
  @include padding(24px 0 0 0);
  margin-top: 20px;
  border-top: 1px solid rgba($c-deepblue, 0.5);

  &__text {
    @include font-style($c-deepblue, 16, 400, 4px);
  }
}

.text-loop {
  @include font-normal();
  text-align: justify;
}

.vhtml-content {
  @include font-style($c-deepblue, 16, 400, 4px);
}
</style>
