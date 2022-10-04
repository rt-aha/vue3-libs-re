<template>
  <div class="re-period-picker">
    <div class="select" @click.stop="toggleExpand" v-click-away="closeSelect">
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
        <div class="select-options">
          <div class="radio-wrap">
            <ReButton v-for="p of periodOptions" :key="p.value" type="small-plain" @click="handleShortcut(p.value)">
              {{ p.label }}
            </ReButton>
          </div>
          <DatePicker v-model="date" is-range popover-align="center" />
        </div>
      </ReCollapseTransition>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from 'vue';
import dayjs from 'dayjs';
import { DatePicker } from 'v-calendar';
import ReCollapseTransition from '@/components/utility/ReCollapseTransition.vue';
import ReButton from '@/components/common/ReButton.vue';
import 'v-calendar/dist/style.css';

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
      default: () => ({
        start: dayjs().subtract(6, 'day').$d,
        end: dayjs().$d,
      }),
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const isExpand = ref(false);
    const shortcut = ref('');
    const date = ref({
      start: dayjs().subtract(6, 'day').$d,
      end: dayjs().$d,
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
        label: '本月',
        value: 'currMonth',
      },
    ];

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
            start: dayjs().subtract(1, 'day').$d.valueOf(),
            end: dayjs().subtract(1, 'day').$d.valueOf(),
          };
          break;
        case 'week':
          date.value = {
            start: dayjs().subtract(6, 'day').$d.valueOf(),
            end: dayjs().$d.valueOf(),
          };
          break;
        case 'currMonth':
          date.value = {
            start: dayjs(new Date(d.getFullYear(), d.getMonth(), 1)).$d.valueOf(),
            end: dayjs().$d.valueOf(),
          };
          break;
        default:
          date.value = {
            start: dayjs().$d.valueOf(),
            end: dayjs().$d.valueOf(),
          };
      }

      console.log('date.value', date.value);

      emit('update:modelValue', date.value);
    };

    const inputValue = computed(() => {
      return `${dayjs(date.value.start).format('YYYY/MM/DD')} ~ ${dayjs(date.value.end).format('YYYY/MM/DD')}`;
    });

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
.re-period-picker {
  // width: 200px;
  cursor: pointer;
  /* box-shadow: 0 0 10px 3px $c-shadow; */
  position: relative;
}

.select {
  &__field {
    @include font-style($c-black, 16, 400, 1px, 14px);
    background-color: transparent;
    border: 0px;
    outline: 0px;
    cursor: pointer;
    width: 100%;
  }
}

.select {
  display: inline-block;
  border: 1px solid $c-form-border;
  min-height: 36px;
  height: auto;
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
