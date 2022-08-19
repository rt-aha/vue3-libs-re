<template>
  <div class="re-avatar">
    <div class="group" v-if="isGroup">group</div>

    <div v-else>
      <div
        v-if="avatarType === 'src'"
        class="re-avatar__bg-img"
        :style="{ 'background-image': `url(${src})`, width: wh, height: wh }"
      ></div>

      <div v-if="avatarType === 'name'" class="re-avatar__bg-name" :style="{ width: wh, height: wh }">
        <p class="re-avatar__bg-name__text">{{ firstLetter }}</p>
      </div>

      <img v-if="avatarType === 'default'" :src="defaultAvatar" :style="{ width: wh, height: wh }" />
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import avatarPlacholder from '@/assets/icon/avatar.svg';

export default defineComponent({
  name: 'ReAvatar',
  props: {
    size: {
      type: String,
      validator: (val) => ['small', 'default', 'large', 'custom'].includes(val),
      default: 'default',
    },
    src: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    // type: {
    //   type: String,
    //   default: 'src',
    // },
    customSize: {
      type: String,
      default: '',
    },
    defaultAvatar: {
      type: String,
      default: avatarPlacholder,
    },
    avatarGroup: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const firstLetter = computed(() => {
      return props.name.substring(0, 1);
    });

    const avatarType = computed(() => {
      if (props.src) {
        return 'src';
      }

      if (props.name) {
        return 'name';
      }

      return 'default';
    });

    const wh = computed(() => {
      if (props.customSize) {
        return props.customSize;
      }

      switch (props.size) {
        case 'small':
          return '40px';
        case 'defualt':
          return '50px';
        case 'large':
          return '60px';
        default:
          return '50px';
      }
    });

    const isGroup = computed(() => {
      if (props.avatarGroup.length > 0) {
        return true;
      }

      return false;
    });

    return {
      firstLetter,
      avatarType,
      wh,
      isGroup,
    };
  },
});
</script>

<style lang="scss" scoped>
.re-avatar {
  &__bg-img {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  &__bg-name {
    position: relative;
    background-color: #ccc;
    border-radius: 50%;

    &__text {
      @include position(center);
    }
  }
}
</style>
