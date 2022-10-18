<template>
  <div class="re-avatar" :style="{ height: wh }">
    <div
      v-for="(d, idx) of avatarData"
      :key="d.src || d.name"
      class="re-avatar__content"
      :class="{ 're-avatar__group': isGroup }"
      :style="{ left: calcOffset(idx), width: wh, height: wh }"
    >
      <div
        v-if="avatarType(d) === 'src'"
        class="re-avatar__bg-img re-avatar__item"
        :style="{ 'background-image': `url(${d.src})` }"
      />
      <!-- :style="{ 'background-image': `url(${d.src})`, width: wh, height: wh }" -->

      <div v-if="avatarType(d) === 'name'" class="re-avatar__bg-name re-avatar__item">
        <!-- :style="{ width: wh, height: wh }" -->
        <p class="re-avatar__bg-name__text">
          {{ firstLetter(d.name) }}
        </p>
      </div>

      <img v-if="avatarType(d) === 'default'" class="re-avatar__item" :src="defaultAvatar">

      <div v-if="avatarType(d) === 'remaining'" class="re-avatar__remaining re-avatar__item">
        <p class="re-avatar__remaining__text">
          {{ d.remaining }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import avatarPlacholder from '@/assets/icon/avatar.svg';

const props = defineProps({
  size: {
    type: String,
    validator: val => ['small', 'default', 'large', 'custom'].includes(val),
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
  avatarList: {
    type: Array,
    default: () => [],
  },
  avatarListLimit: {
    type: [String, Number],
    default: 2,
  },
});

const sizeMapping = {
  small: '40px',
  default: '50px',
  large: '60px',
  custom: props.customSize,
};

const wh = computed(() => {
  let size = props.size;

  if (props.customSize) {
    size = 'custom';
  }

  return sizeMapping[size];
});

const isGroup = computed(() => {
  if (props.avatarList.length > 0) {
    return true;
  }

  return false;
});

const avatarData = computed(() => {
  if (isGroup.value) {
    const remaining = props.avatarList.length - Number(props.avatarListLimit);

    if (remaining > 0) {
      return [
        ...props.avatarList,
        {
          type: 'remaining',
          remaining,
        },
      ];
    }

    return props.avatarList;
  }

  const { src, name } = props;

  return [
    {
      src,
      name,
    },
  ];
});

const firstLetter = (val) => {
  return val.substring(0, 1);
};

const avatarType = (data) => {
  if (data.src) {
    return 'src';
  }

  if (data.name) {
    return 'name';
  }

  if (data.type === 'remaining') {
    return 'remaining';
  }

  return 'default';
};

const calcOffset = (idx) => {
  const sizeNum = wh.value.replace('px', '');
  const eachOffset = sizeNum * 0.3;

  return `${sizeNum * idx - eachOffset * idx}px`;
};
</script>

<style lang="scss" scoped>
.re-avatar {
  position: relative;
  width: auto;

  &__content {
    width: 100%;
  }

  &__group {
    @include position(tl, 0, 0);
    box-sizing: border-box;
    overflow: hidden;
    background-color: $c-lightgrey;
    border: 3px solid $c-white;
    border-radius: 50%;
  }

  &__item {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 50%;
  }

  &__bg-img {
    overflow: auto;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 50%;
  }

  &__bg-name {
    position: relative;
    overflow: hidden;
    background-color: #ccc;
    border-radius: 50%;

    &__text {
      @include position(center);
    }
  }

  &__remaining {
    position: relative;
    overflow: hidden;
    background-color: #ccc;
    border-radius: 50%;

    &__text {
      @include position(center);
      @include font-style($c-white, 14);
      @include padding(0 0 0 10px);

      &::before {
        @include position(tl, 50%, 0);
        content: "+";
        transform: translateY(-50%);
      }
    }
  }
}
</style>
