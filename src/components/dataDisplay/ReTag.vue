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
          v-if="editable"
          class="tag-list__item__remove"
          :class="{
            'tag-list__item__remove--disabled': tag.disabled,
          }"
          @click.stop="handleRemoveItem(tag)"
        >
          <img class="tag-list__item__remove__icon" src="@/assets/icon/close.svg">
        </div>
      </li>
      <li
        v-show="editable && !isAddStatus"
        class="tag-list__item tag-list__item--add"
        :style="{
          height: labelItemHeight,
        }"
        @click="toggleAddTagStatus"
      >
        <div class="tag-list__item__add">
          <img class="tag-list__item__add__icon" src="@/assets/icon/add.svg">
        </div>
      </li>
      <li
        v-show="editable && isAddStatus"
        class="tag-list__item tag-list__item--add-input"
        :style="{
          height: labelItemHeight,
        }"
      >
        <input
          ref="inputRef"
          v-model="addValue"
          class="tag-list__item__add-input"
          @blur="toggleAddTagStatus"
          @keydown.enter="addTag"
        >
      </li>
    </ul>
  </div>
</template>

<script setup>
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
const labelItemHeight = ref('');
const addValue = ref();
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
  emit('update:modelValue', innerValue.value);
};

const toggleAddTagStatus = async () => {
  isAddStatus.value = !isAddStatus.value;
  if (isAddStatus.value) {
    await nextTick();
    inputRef.value.focus();
  }
};

const addTag = () => {
  console.log('add tag!');
  const isExist = innerValue.value.find(item => item.label === addValue.value);
  if (isExist) {
    console.warn('標籤名重複！');
    emit('onAddTagWarning', 'repeat');

    return;
  }

  if (props.limit) {
    const isReachLimitation = innerValue.value.length >= Number(props.limit);

    if (isReachLimitation) {
      console.warn(`已達所設定${props.limit}上限`);
      emit('onAddTagWarning', 'limit');

      return;
    }
  }

  const addLabelItem = {
    value: addValue.value,
    label: addValue.value,
  };

  innerValue.value.push(addLabelItem);
  emit('update:modelValue', innerValue.value);
  addValue.value = '';
};

const init = () => {
  innerValue.value = props.modelValue;
};

const getLabelHeight = () => {
  const lastLabelItem = labelItemRef.value[labelItemRef.value.length - 1];
  labelItemHeight.value = `${lastLabelItem.clientHeight + 2}px`;
};

init();

onMounted(() => {
  getLabelHeight();
});
</script>

<style lang="scss" scoped>
/* * {
  outline: 1px solid #f00;
} */

.re-tag {
  width: 100%;

  &--editable {
    .tag-list__item {
      @include padding(2px 24px 2px 5px);
    }
  }
}
.tag-list {
  width: 100%;

  &__item {
    display: inline-block;
    vertical-align: bottom;
    margin-right: 10px;
    margin-bottom: 10px;
    border: 1px solid $c-deepblue;
    border-radius: 4px;
    @include padding(2px 5px);
    @include inline-flex();
    cursor: pointer;
    position: relative;

    &--add {
      border: 1px dashed $c-deepblue;
      padding: 2px 5px !important;
    }

    &--add-input {
      border: 1px dashed $c-deepblue;
      padding: 2px !important;
    }

    &__label {
      @include font-style($c-deepblue, 14);
    }

    &__remove {
      @include position(tr, 50%, 2px);
      transform: translateY(-50%);

      &--disabled {
        opacity: 0.2;
        cursor: not-allowed;
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
      /* height: 100%; */
      outline: 0;
      border: 0;
      width: 100px;
    }
  }
}
</style>
