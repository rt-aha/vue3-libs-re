<template>
  <div class="re-period-picker">
    <div v-click-away="closeSelect" class="select" @click.stop="toggleExpand">
      <div class="select__active-wrap">
        <input class="select__field" readonly placeholder="請選擇" :value="inputValue">
      </div>
      <img
        class="select__drop-icon"
        :class="{
          'select__drop-icon--active': isExpand,
        }"
        src="@/assets/icon/icon-down.svg"
      >
    </div>
    <div class="select-options-wrap">
      <ReCollapseTransition :show="isExpand">
        <div class="select-options">
          <div class="radio-wrap">
            <ReButton v-for="p of periodOptions" :key="p.value" type="small-plain" @click="handleShortcut(p.value)">
              {{ p.label }}
            </ReButton>
          </div>
          <DatePicker v-model="middleDate" is-range popover-align="center" />
        </div>
      </ReCollapseTransition>
    </div>
  </div>
</template>

<script setup>
import dayjs from 'dayjs';
import { DatePicker } from 'v-calendar';
import ReCollapseTransition from '@/components/utility/ReCollapseTransition.vue';
import ReButton from '@/components/common/ReButton.vue';
import 'v-calendar/dist/style.css';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      start: dayjs().subtract(6, 'day').$d,
      end: dayjs().$d,
    }),
  },
});

const emit = defineEmits(['update:modelValue']);

const isExpand = ref(false);
const shortcut = ref('');
const date = ref({
  start: dayjs().subtract(6, 'day').$d,
  end: dayjs().$d,
});

const middleDate = computed({
  set: (val) => {
    date.value = val;
  },
  get: () => {
    return props.modelValue;
  },
});

const toggleExpand = () => {
  console.log('111');
  isExpand.value = !isExpand.value;
};

const openSelect = () => {
  isExpand.value = true;
};

const closeSelect = () => {
  isExpand.value = false;
};

const handleShortcut = (val) => {
  console.log('opt', val);
  const d = new Date();

  switch (val) {
    case 'yesterday':
      date.value = {
        // start: dayjs().subtract(1, 'day').$d.valueOf(),
        start: dayjs(new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1)).$d.valueOf(),
        end: dayjs(new Date(d.getFullYear(), d.getMonth(), d.getDate())).subtract(1, 'second').$d.valueOf(),
      };
      break;
    case 'week':
      date.value = {
        start: dayjs(new Date(d.getFullYear(), d.getMonth(), d.getDate())).subtract(6, 'day').$d.valueOf(),
        end: dayjs().$d.valueOf(),
      };
      break;
    case 'currMonth':
      date.value = {
        start: dayjs(new Date(d.getFullYear(), d.getMonth(), d.getDate())).subtract(1, 'month').add(1, 'day').$d.valueOf(),
        end: dayjs().$d.valueOf(),
      };
      break;
    default:
      date.value = {
        start: dayjs(new Date(d.getFullYear(), d.getMonth(), d.getDate())).$d.valueOf(),
        end: dayjs().$d.valueOf(),
      };
  }

  emit('update:modelValue', date.value);
};

const inputValue = computed(() => {
  return `${dayjs(date.value.start).format('YYYY/MM/DD')} ~ ${dayjs(date.value.end).format('YYYY/MM/DD')}`;
});

watch(() => date.value,
  (newValue) => {
    const newDateValue = {
      start: dayjs(newValue.start).$d.valueOf(),
      end: dayjs(newValue.end).$d.valueOf(),
    };

    // date.value = newDateValue;
    emit('update:modelValue', newDateValue);
  });

const periodOptions = [
  {
    label: '今日',
    value: 'today',
  },
  {
    label: '昨日',
    value: 'yesterday',
  },
  {
    label: '過去7天',
    value: 'week',
  },
  {
    label: '近一個月',
    value: 'currMonth',
  },
];
</script>

<style lang="scss" scoped>
.re-period-picker {
  /* box-shadow: 0 0 10px 3px $c-shadow; */
  position: relative;
  // width: 200px;
  cursor: pointer;
}

.select {
  &__field {
    @include font-style($c-black, 16, 400, 1px, 14px);
    width: 100%;
    cursor: pointer;
    background-color: transparent;
    border: 0;
    outline: 0;
  }
}

.select {
  @include padding(0 10px);
  @include flex();
  // width: 200px;
  position: relative;
  display: inline-block;
  height: auto;
  min-height: 36px;
  border: 1px solid $c-form-border;
  border-radius: 4px;

  &__active-wrap {
    flex: 1;
  }

  &__field {
    @include font-style($c-black, 14, 400, 1px, 14px);
    cursor: pointer;
    background-color: transparent;
    border: 0;
    outline: 0;
  }

  &__drop-icon {
    flex: none;
    width: 15px;
    margin-left: 10px;
    transition: 0.4s;

    /* @include position(tr, 50%, 10px); */

    /* transform: translateY(-50%) rotate(0deg); */
    transform: rotate(0deg);

    &--active {
      /* transform: translateY(-50%) rotate(180deg); */
      transform: rotate(180deg);
    }
  }
}

.select-options-wrap {
  @include position(tl, calc(100% + 5px), 0);
  z-index: 100;
  width: 100%;
  background-color: $c-white;
  border-radius: 5px;
  // border: 1px solid $c-input-bg;
}

.radio-wrap {
  @include padding(10px);
}
</style>

<style lang="scss">
.vc-container {
  width: 100%;
  // background-color: transparent;
  background-color: $c-white;
  border: 0;
}
</style>
