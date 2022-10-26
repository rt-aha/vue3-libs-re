<template>
  <div class="v-avatar">
    <dev-section title="基本使用，尺寸：小、預設、大">
      <div class="wrap">
        <dev-props type="String" prop-name="size" text="small, default, large，預設 default" />
        <dev-desc text="size=small" />
        <ReAvatar size="small" src="https://cdn.iconscout.com/icon/free/png-256/avatar-373-456325.png" />
        <dev-desc text="size=defualt" mt />
        <ReAvatar src="https://cdn.iconscout.com/icon/free/png-256/avatar-373-456325.png" />
        <dev-desc text="size=large" mt />
        <ReAvatar size="large" src="https://cdn.iconscout.com/icon/free/png-256/avatar-373-456325.png" />
      </div>
    </dev-section>
    <dev-section title="自訂尺寸大小">
      <div class="wrap">
        <dev-props type="String" prop-name="custom-size" text="自訂寬度" />
        <ReAvatar src="https://cdn.iconscout.com/icon/free/png-256/avatar-373-456325.png" custom-size="100px" />
      </div>
    </dev-section>
    <dev-section title="預設沒圖片時">
      <div class="wrap">
        <ReAvatar size="large" />
      </div>
    </dev-section>
    <dev-section title="自訂沒圖片時的預設圖片">
      <div class="wrap">
        <dev-props type="Image" prop-name="default-avatar" text="自訂沒有圖時的預設圖片" />
        <ReAvatar size="large" :default-avatar="defaultAvatar" />
      </div>
    </dev-section>
    <dev-section title="用名字第一個字">
      <div class="wrap">
        <dev-props type="String" prop-name="name" text="給name字串，會自動取得第一個字" />
        <ReAvatar size="small" name="Vicky" />
      </div>
    </dev-section>
    <dev-section title="頭像群" verticle>
      <div class="wrap">
        <dev-props type="{src: '', name: ''}[]" prop-name="avatar-list" text="優先度：圖片來源(src) > 名字(name)" />
        <dev-props type="String | Number" prop-name="avatar-list-limit" text="給一數字決定顯示的數量" />
        <dev-desc text="avatar-list-limit=3" />
        <ReAvatar :avatar-list="avatarList" size="small" :default-avatar="defaultAvatar" avatar-list-limit="3" />
        <dev-desc text="avatar-list-limit=2" mt />
        <ReAvatar :avatar-list="avatarList" size="default" :default-avatar="defaultAvatar" avatar-list-limit="2" />
        <dev-desc text="avatar-list-limit=5" mt />
        <ReAvatar :avatar-list="avatarList" size="large" :default-avatar="defaultAvatar" avatar-list-limit="5" />
      </div>
    </dev-section>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import ReAvatar from '@/components/dataDisplay/ReAvatar.vue';
import defaultAvatar from '@/forDev/icons/defaultAvatar.svg';

export default defineComponent({
  name: 'ViewAvatar',
  components: {
    ReAvatar,
  },
  setup() {
    const avatarList = [
      {
        src: 'https://cdn.iconscout.com/icon/free/png-256/avatar-373-456325.png',
        name: 'Lucy',
      },
      {
        // src: 'https://cdn-icons-png.flaticon.com/512/147/147142.png',
        name: 'Luara',
      },
      {
        // src: 'https://cdn-icons-png.flaticon.com/512/194/194938.png',
        // name: 'Luke',
      },
      {
        // src: 'https://cdn-icons-png.flaticon.com/512/194/194938.png',
        // name: 'Luke',
      },
    ];

    return {
      defaultAvatar,
      avatarList,
    };
  },
});
</script>

<style lang="scss" scoped></style>
