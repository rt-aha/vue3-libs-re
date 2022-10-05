<template>
  <div class="v-home">
    <div class="v-home__content">
      <p class="title">
        Vue3 Libs for Easy Life(?)
      </p>
      <router-link :to="{ name: 'button' }">
        <ReButton>Entry</ReButton>
      </router-link>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import ReButton from '@/components/common/ReButton.vue';

export default defineComponent({
  name: 'Home',
  components: {
    ReButton,
  },
});
</script>

<style lang="scss" scoped>
.v-home {
  width: 100%;
  height: 100%;
  @include flex(center, center);
  text-align: center;
}

.title {
  @include font-style($c-deepblue, 20, 400, 1px);
  margin-bottom: 30px;
}
</style>
