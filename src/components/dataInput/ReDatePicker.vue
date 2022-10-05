<template>
  <div class="re-date-picker">
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
          <DatePicker v-model="date" @change="handleChange" />
        </div>
      </ReCollapseTransition>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref, watch } from 'vue';
// import ReButton from '@/components/ReButton.vue';
import { DatePicker } from 'v-calendar';
import dayjs from 'dayjs';
import ReCollapseTransition from '@/components/utility/ReCollapseTransition.vue';
import 'v-calendar/dist/style.css';

// console.log(dayjs());

export default defineComponent({
  name: 'RePeriodPicker',
  components: {
    ReCollapseTransition,
    DatePicker,
    // ReButton,
  },
  props: {
    modelValue: {
      type: Date,
      default: new Date(),
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
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
      },
    );

    return {
      isExpand,
      toggleExpand,
      openSelect,
      closeSelect,
      date,
      shortcut,
      inputValue,
      handleChange,
    };
  },
});
</script>

<style lang="scss" scoped>
.re-date-picker {
  width: 100%;
  // width: 200px;
  cursor: pointer;
  /* box-shadow: 0 0 10px 3px $c-shadow; */
  position: relative;
}

.select {
  &__field {
    @include font-style($c-black, 14, 400, 1px, 14px);
    background-color: transparent;
    border: 0px;
    outline: 0px;
    cursor: pointer;
    width: 100%;
  }
}

.select {
  border: 1px solid $c-grey;
  /* background-color: #eee; */
  display: inline-block;
  min-height: 36px;
  height: auto;
  /* background: $c-input-bg; */
  border-radius: 4px;
  @include padding(0px 10px);
  @include flex();
  // width: 200px;
  position: relative;

  &__active-wrap {
    flex: 1;
  }

  &__field {
    @include font-style($c-black, 14, 400, 1px, 14px);
    background-color: transparent;
    border: 0px;
    outline: 0px;
    cursor: pointer;
  }

  &__drop-icon {
    flex: none;
    width: 15px;
    /* @include position(tr, 50%, 10px); */
    /* transform: translateY(-50%) rotate(0deg); */
    transform: rotate(0deg);
    transition: 0.4s;
    margin-left: 10px;

    &--active {
      /* transform: translateY(-50%) rotate(180deg); */
      transform: rotate(180deg);
    }
  }
}

.select-options-wrap {
  @include position(tl, calc(100% + 5px), 0);
  /* background-color: $c-input-bg; */
  background-color: $c-white;
  width: 100%;
  z-index: 100;
  border-radius: 5px;
  // border: 1px solid $c-input-bg;
}

.radio-wrap {
  @include padding(10px);
}
</style>

<style lang="scss">
.vc-container {
  // background-color: transparent;
  background-color: $c-white;
  border: 0px;
  width: 100%;
}
</style>
