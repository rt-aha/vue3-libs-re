<template>
  <div class="re-date-picker">
    <!--  -->
    <div class="select" @click.stop="toggleExpand">
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
        <div v-click-away="closeSelect" class="select-options">
          <DatePicker v-model="date" @change="handleChange" />
        </div>
      </ReCollapseTransition>
    </div>
  </div>
</template>

<script setup>
import { DatePicker } from 'v-calendar';
import dayjs from 'dayjs';
import ReCollapseTransition from '@/components/utility/ReCollapseTransition.vue';
import 'v-calendar/dist/style.css';

const props = defineProps({
  modelValue: {
    type: Date,
    default: new Date(),
  },
});
const emit = defineEmits(['update:modelValue']);

const isExpand = ref(false);
const shortcut = ref('');
const date = ref('');

const toggleExpand = () => {
  isExpand.value = !isExpand.value;
};

const openSelect = () => {
  isExpand.value = true;
};

const closeSelect = () => {
  // console.log('date.value', date.value);
  // console.log('props.modelValue', props.modelValue);
  // console.log(date.value, props.modelValue);

  isExpand.value = false;
};

const inputValue = computed(() => {
  return dayjs(props.modelValue).format('YYYY/MM/DD');
});

const handleChange = (v) => {

};

const init = () => {
  date.value = props.modelValue;
};

init();

// 看有沒有辦法不要用 watch
watch(
  () => date.value,
  () => {
    emit('update:modelValue', date.value);
    // closeSelect();
  },
);
</script>

<style lang="scss" scoped>
.re-date-picker {
  /* box-shadow: 0 0 10px 3px $c-shadow; */
  position: relative;
  width: 100%;
  // width: 200px;
  cursor: pointer;
}

.select {
  &__field {
    @include font-style($c-form-main, 14, 400, 1px, 14px);
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
  position: relative;
  height: auto;
  min-height: 36px;
  border: 1px solid $c-form-assist;
  border-radius: 4px;

  &__active-wrap {
    flex: 1;
  }

  &__field {
    @include font-style($c-form-main, 14, 400, 1px, 14px);
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
    transform: rotate(0deg);

    &--active {
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
}

.radio-wrap {
  @include padding(10px);
}
</style>

<style lang="scss">
.vc-container {
  width: 100%;
  background-color: $c-white;
  border: 0;
}
</style>
