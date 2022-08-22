<template>
  <div class="re-transfer">
    <div class="transfer">
      <div class="transfer__options">
        <p class="total-count">總共 {{ optionLength }} 個選項</p>
        <re-checkbox-group v-model="value1" :options="options" direction="verticle" />
      </div>
      <div class="transfer__select">
        <ul>
          <li v-for="opt of selectedOptions" :key="opt.value">{{ opt.label }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import ReCheckboxGroup from '@/components/ReCheckboxGroup.vue';

export default defineComponent({
  name: 'ReTransfer',
  components: {
    ReCheckboxGroup,
  },
  props: {
    options: {
      type: Array,
      defualt: () => [],
    },
  },
  setup(props) {
    const value1 = ref([]);
    const optionLength = computed(() => props.options.length);
    const selectedOptions = computed(() => {
      return props.options.filter((item) => {
        return value1.value.find((item2) => item2 === item.value);
      });
    });

    return {
      value1,
      optionLength,
      selectedOptions,
    };
  },
});
</script>

<style lang="scss" scoped>
.re-transfer {
}
.transfer {
  @include flex(flex-start, flex-start);
  width: 500px;
  border: 1px solid #ccc;
  border-radius: 4px;
  position: relative;
  height: 200px;

  &::before {
    content: '';
    width: 1px;
    height: 100%;
    @include position(tl, 0, 50%);
    background-color: #ccc;
  }

  &__options {
    flex: none;
    width: 50%;
    @include padding(10px);
    height: 100%;
    overflow: auto;
  }

  &__select {
    flex: none;
    width: 50%;
    @include padding(10px);
  }
}

.total-count {
  margin-bottom: 10px;
}
</style>
