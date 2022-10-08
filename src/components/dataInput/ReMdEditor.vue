<template>
  <div class="c-md-editor">
    <v-md-editor v-model="mdTexts" height="400px" />
  </div>
</template>

<script setup>
import useValidate from '@/hooks/useValidate';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
});
const emit = defineEmits(['update:modelValue']);

const mdTexts = ref('');
const { validFn } = useValidate();
const updateValue = (value) => {
  emit('update:modelValue', value);
};

watch(
  () => mdTexts.value,
  (newValue) => {
    updateValue(newValue);
  },
);

const init = () => {
  mdTexts.value = props.modelValue;
};

init();
</script>

<style lang="scss"></style>
