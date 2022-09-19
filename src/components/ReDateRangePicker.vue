<template>
  <div class="re-date-range-picker">
    <div class="select" @click.stop="toggleExpand">
      <div class="select__active-wrap">
        <input class="select__field" readonly placeholder="請選擇" :value="inputValue" />
      </div>
      <img
        class="select__drop-icon"
        :class="{
          'select__drop-icon--active': isExpand,
        }"
        src="@/assets/icon/icon-down.svg"
      />
    </div>
    <div class="select-options-wrap">
      <ReCollapseTransition :show="isExpand">
        <div class="select-options" v-click-away="closeSelect">
          <div class="radio-wrap">
            <!-- <ReRadio :options="periodOptions" v-model="shortcut" @onChange="handleShortcut" /> -->
            <ReButton v-for="p of periodOptions" :key="p.value" type="small-plain" @click="handleShortcut(p.value)">
              {{ p.label }}
            </ReButton>
          </div>
          <DatePicker v-model="date" is-range />
        </div>
      </ReCollapseTransition>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, computed, watch } from 'vue';
import ReCollapseTransition from '@/components/ReCollapseTransition.vue';
import ReButton from '@/components/ReButton.vue';
import { DatePicker } from 'v-calendar';
import dayjs from 'dayjs';
import 'v-calendar/dist/style.css';

// console.log(dayjs());

export default defineComponent({
  name: 'RePeriodPicker',
  components: {
    ReCollapseTransition,
    DatePicker,
    ReButton,
  },
  props: {
    modelValue: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
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
        label: '本月',
        value: 'currMonth',
      },
    ];

    const isExpand = ref(false);
    const shortcut = ref('');
    const date = ref({
      start: dayjs().$d,
      end: dayjs().$d,
    });

    const toggleExpand = () => {
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
            start: dayjs().subtract(1, 'day').$d,
            end: dayjs().subtract(1, 'day').$d,
          };
          break;
        case 'week':
          date.value = {
            start: dayjs().subtract(6, 'day').$d,
            end: dayjs().$d,
          };
          break;
        case 'currMonth':
          date.value = {
            start: new Date(d.getFullYear(), d.getMonth(), 1),
            end: dayjs().$d,
          };
          break;
        default:
          date.value = {
            start: dayjs().$d,
            end: dayjs().$d,
          };
      }

      emit('update:modelValue', date.value);
    };

    const inputValue = computed(() => {
      return `${dayjs(date.value.start).format('YYYY/MM/DD')} ~ ${dayjs(date.value.end).format('YYYY/MM/DD')}`;
    });

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
      periodOptions,
      handleShortcut,
      inputValue,
    };
  },
});
</script>
<style lang="scss" scoped>
.re-date-range-picker {
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
