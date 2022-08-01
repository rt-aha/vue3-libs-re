<template>
  <div
    class="re-switch"
    :class="{
      're-switch--active': modelValue,
    }"
  >
    <input class="re-switch__field" :id="uuid" type="checkbox" :value="activeStatus" @change="handleChange" />
    <label
      class="re-switch-box"
      :class="[
        {
          're-button--disabled': disabled,
        },
      ]"
      :for="uuid"
    >
      <span class="on-label" v-show="modelValue">{{ switchLabel.on }}</span>
      <span class="off-label" v-show="!modelValue">{{ switchLabel.off }}</span>
      <div class="re-switch-box__bar"></div>
    </label>
  </div>
</template>

<script>
import { defineComponent, computed, getCurrentInstance } from 'vue';
import { v4 as uuid } from 'uuid';

export default defineComponent({
  name: 'ReReSwitch',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    switchLabel: {
      type: Object,
      default: () => ({
        on: 'on',
        off: 'off',
      }),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const validFn = getCurrentInstance().parent.ctx.validateFields;
    const handleChange = (e) => {
      if (props.disabled) return;
      emit('update:modelValue', e.target.value === 't' ? false : true);
      validFn('change');
    };

    const activeStatus = computed(() => {
      return props.modelValue ? 't' : 'f';
    });

    return {
      activeStatus,
      handleChange,
      uuid: uuid(),
    };
  },
});
</script>

<style lang="scss" scoped>
.re-switch {
  width: 50px;
  height: 24px;
  border-radius: 12px;
  background-color: $c-switch--off;
  @include padding(2px);
  cursor: pointer;
  transition: 0.3s;
  position: relative;

  &--active {
    background-color: $c-switch--active;

    .re-switch-box {
      display: inline-block;

      &__bar {
        transform: translateX(26px);
      }
    }
  }

  &__field {
    @include position(center);
    z-index: -1;
  }
}

.re-switch-box {
  width: 100%;
  height: 20px;
  position: relative;

  &__bar {
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: $c-white;
    transition: 0.3s;
    position: relative;
    z-index: 10;
  }

  &--disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
}

.on-label {
  width: 24px;
  text-align: center;
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 2px;
  transform: translateY(-50%) scale(0.8);
  @include font-style($c-white, 12px);
  z-index: 5;
}

.off-label {
  width: 24px;
  text-align: center;
  display: inline-block;
  position: absolute;
  top: 50%;
  right: 2px;
  transform: translateY(-50%) scale(0.8);
  @include font-style($c-white, 12px);
  z-index: 5;
}
</style>
