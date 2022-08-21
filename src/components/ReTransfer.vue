<template>
  <div class="re-transfer">
    <div class="transfer">
      <div class="transfer__options">
        <p>選項 總共</p>
        <re-checkbox-group v-model="value1" :optionConfig="options" direction="verticle" />
      </div>
      <div class="transfer__select"></div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import ReCheckboxGroup from '@/components/ReCheckboxGroup.vue';


export default defineComponent({
  name: 'ReTransfer',
  components: {
    ReCheckboxGroup,
  },
  props: {
    options: {
      type: Array,
      defualt: () => []
    }
  },
  setup() {
    const value1 = ref([]);
    const optionLength = 

    return {
      value1,
      transferOptions,
    };
  },
});
</script>

<style lang="scss" scoped>
.re-transfer {
}
.transfer {
  @include flex(flex-start, flex-start);
  width: 400px;
  border: 1px solid #ccc;
  border-radius: 4px;
  position: relative;

  &::before {
    content: '';
    width: 1px;
    height: 100%;
    @include position(tl, 0, 50%);
    background-color: #ccc;
  }

  &__options {
    width: 200px;
    @include padding(10px);
  }

  &__select {
    width: 200px;
    @include padding(10px);
  }
}
</style>
