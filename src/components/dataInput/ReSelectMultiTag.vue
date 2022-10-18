<template>
  <div class="re-tag" :class="{ 're-tag--editable': editable }">
    <ul class="tag-list">
      <li
        v-for="tag of innerValue"
        :key="tag.value"
        ref="labelItemRef"
        class="tag-list__item"
        @click="handleClickItem(tag)"
      >
        <p class="tag-list__item__label">
          {{ tag.label }}
        </p>
        <div
          class="tag-list__item__remove"
          :class="{
            'tag-list__item__remove--disabled': tag.disabled,
          }"
          @click.stop="handleRemoveItem(tag)"
        >
          <img class="tag-list__item__remove__icon" src="@/assets/icon/close_form.svg">
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
// import ReInput from '@/components/ReInput.vue';

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  editable: {
    type: Boolean,
    default: false,
  },
  limit: {
    type: [String, Number, undefined],
    default: undefined,
  },
});
const emit = defineEmits(['update:modelValue', 'onClickItem', 'onRemoveItem', 'onAddTagWarning']);

const labelItemRef = ref(null);
const inputRef = ref(null);
const isAddStatus = ref(false);
const innerValue = ref([]);
const handleClickItem = (tag) => {
  emit('onClickItem', tag);
};

const handleRemoveItem = (tag) => {
  if (tag.disabled) { return; }

  const findIndex = innerValue.value.findIndex(item => item.value === tag.value);
  const targetTag = innerValue.value.splice(findIndex, 1);
  emit('onRemoveItem', targetTag[0]);
};

const toggleAddTagStatus = async () => {
  isAddStatus.value = !isAddStatus.value;
  if (isAddStatus.value) {
    await nextTick();
    inputRef.value.focus();
  }
};

const init = () => {
  innerValue.value = props.modelValue;
};

init();

watch(
  () => props.modelValue,
  () => {
    init();
  },
);
</script>

<style lang="scss" scoped>
.re-tag {
  @include padding(5px 0 0 0);
  width: 100%;
}

.tag-list {
  width: 100%;

  &__item {
    @include padding(2px 24px 2px 5px);
    @include inline-flex();
    position: relative;
    display: inline-block;
    margin-right: 5px;
    margin-bottom: 5px;
    vertical-align: bottom;
    cursor: pointer;
    background-color: $c-form-assist;
    border-radius: 4px;

    &--add {
      padding: 2px 5px !important;
      border: 1px dashed $c-form-assist;
    }

    &--add-input {
      padding: 2px !important;
      border: 1px dashed $c-form-assist;
    }

    &__label {
      @include font-style($c-form-main, 14);
    }

    &__remove {
      @include position(tr, 50%, 2px);
      transform: translateY(-50%);

      &--disabled {
        @include disabled;
      }

      &__icon {
        width: 20px;
        vertical-align: middle;
      }
    }

    &__add {
      /* @include position(tr, 50%, 5px);
      transform: translateY(-50%); */
      @include flex();

      &__icon {
        width: 16px;
      }
    }

    &__add-input {
      width: 100px;
      border: 0;

      /* height: 100%; */
      outline: 0;
    }
  }
}
</style>
