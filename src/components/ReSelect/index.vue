<template>
  <div class="re-select">
    <div class="select" @click.stop="toggleExpand">
      <p class="select__field">{{ innerValue }}</p>
      <img class="select__drop-icon" :class="{
        'select__drop-icon--active': isExpand
      }" src="@/assets/icon/icon-down.svg" />
    </div>
    <!-- @click="toggleExpand" -->
    <div class="select-options-wrap">
    <ReCollapseTransition :show="isExpand">
      <div class="select-options" v-click-away="closeSelect">
        <ul class="select-option-list">
          <li class="select-option-list__item" v-for="opt of optionConfig" :key="opt.value" @click="() => handleOption(opt)">
            <p class="select-option-list__item__label">
              {{ opt.label }}
            </p>
          </li>
        </ul>
      </div>
    </ReCollapseTransition>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, watch, computed } from 'vue';
import ReCollapseTransition from '@/components/ReCollapseTransition.vue';

export default defineComponent({
  name: 'ReSelect',
  components: {
    ReCollapseTransition
  },
  props: {
    modelValue: {
      default: ''
    },
    optionConfig: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update:modelValue'],
  setup(props, {emit}) {
    const isExpand = ref(false);

    const setInitValue = () => {
      innerValue.value = props.modelValue;
    }

    const toggleExpand = () => {
      isExpand.value = !isExpand.value
    }

    const openSelect = () => {
      isExpand.value = true
    }

    const closeSelect = () => {
      isExpand.value = false
    }

    const handleOption = (opt) => {
      emit('update:modelValue', opt.value)
      isExpand.value = false;
    }

    const innerValue = computed(() => {
      const valueObj = props.optionConfig.find(item => {
        return item.value === props.modelValue
      })

      return valueObj?.label || ''

    })

    watch(() => props.modelValue, () => {
      setInitValue()
    }, { immediate: true })

    return {
      innerValue,
      toggleExpand,
      isExpand,
      handleOption,
      openSelect,
      closeSelect,
    }
  }
});
</script>
<style lang="scss" scoped>
.re-select {
  width: 200px;
  cursor: pointer;
  box-shadow: 0 0 10px 3px $c-shadow;
  position: relative;
}

.select {
  background-color: #eee;
  display: inline-block;
  height: 36px;
  border-bottom: 1px solid $c-main;
  @include padding(0px 10px);
  @include flex();
  width: 200px;
  position: relative;

  &__field {
    @include font-style($c-black, 14, 400, 1px, 14px);
    background-color: transparent;
    border: 0px;
    outline: 0px;
  }

  &__drop-icon {
    width: 15px;
    @include position(tr, 50%, 10px);
    transform: translateY(-50%) rotate(0deg);
    transition: .4s;

    &--active {
      transform: translateY(-50%) rotate(180deg);
    }
  }
}

.select-options-wrap {
  @include position(tl, 100%, 0);
  background-color: $c-white;
  width: 100%;
}

.select-option-list {

  &__item {
    @include padding(0px 10px);
    @include flex();
    height: 36px;
    cursor: pointer;

    &:hover {
      background-color: rgba($c-main, 0.2);
    }

    &__label {
      @include font-style($c-black, 14, 400, 1px, 14px);


    }
  }
}
</style>
