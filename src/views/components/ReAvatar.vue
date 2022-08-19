<template>
  <div class="v-avatar">
    <p>待 Image 組件做好回來改</p>

    <dev-section title="基本使用，尺寸：小、預設、大">
      <re-avatar size="small" src="https://cdn.iconscout.com/icon/free/png-256/avatar-373-456325.png" />
      <re-avatar src="https://cdn.iconscout.com/icon/free/png-256/avatar-373-456325.png" />
      <re-avatar size="large" src="https://cdn.iconscout.com/icon/free/png-256/avatar-373-456325.png" />
    </dev-section>
    <dev-section title="自訂尺寸大小">
      <re-avatar src="https://cdn.iconscout.com/icon/free/png-256/avatar-373-456325.png" customSize="100px" />
    </dev-section>
    <dev-section title="預設沒圖片時">
      <re-avatar size="large" />
    </dev-section>
    <dev-section title="自訂沒圖片時的預設圖片">
      <re-avatar size="large" :defaultAvatar="defaultAvatar" />
    </dev-section>

    <dev-section title="用名字第一個字開頭英文">
      <re-avatar size="small" name="Vicky" />
    </dev-section>

    <dev-section title="頭像群">
      <re-avatar :avatarGroup="avatarGroup" size="large" :defaultAvatar="defaultAvatar" />
    </dev-section>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import ReAvatar from '@/components/ReAvatar.vue';
import defaultAvatar from '@/forDev/icons/defaultAvatar.svg';

export default defineComponent({
  name: 'ViewAvatar',
  components: {
    ReAvatar,
  },
  setup() {
    const avatarGroup = [
      {
        src: 'https://cdn.iconscout.com/icon/free/png-256/avatar-373-456325.png',
        name: 'Lucy',
      },
      {
        src: 'https://cdn.iconscout.com/icon/free/png-256/avatar-373-456325.png',
        name: 'Luke',
      },
      {
        src: 'https://cdn.iconscout.com/icon/free/png-256/avatar-373-456325.png',
        name: 'Luara',
      },
    ];

    return {
      defaultAvatar,
      avatarGroup,
    };
  },
});
</script>

<style lang="scss" scoped></style>
