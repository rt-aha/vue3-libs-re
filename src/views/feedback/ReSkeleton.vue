<template>
  <div class="v-skeleton">
    <dev-section title="基本使用：長條形">
      <div class="wrap">
        <ReSkeleton />
      </div>
    </dev-section>
    <dev-section title="基本使用：圓型">
      <div class="wrap">
        <ReSkeleton type="circle" wh="60px" />
      </div>
    </dev-section>
    <dev-section title="設定高度">
      <div class="wrap">
        <ReSkeleton bold="30px" />
      </div>
    </dev-section>

    <dev-section title="設定上、下外距">
      <div class="wrap">
        <ReSkeleton />
        <ReSkeleton mt="10px" mb="10px" />
        <ReSkeleton />
        <ReSkeleton type="circle" wh="60px" mt="30px" mb="30px" />
      </div>
    </dev-section>
    <dev-section title="設定背景色">
      <div class="wrap">
        <ReSkeleton />
        <ReSkeleton mt="10px" mb="10px" bg-color="#cd853f" />
        <ReSkeleton />
        <ReSkeleton type="circle" wh="60px" bg-color="#4caf50" mt="10px" mb="10px" />
      </div>
    </dev-section>
    <dev-section title="設定圓角">
      <div class="wrap">
        <ReSkeleton round="4px" />
        <ReSkeleton mt="10px" mb="10px" bg-color="#cd853f" round="4px" />
        <ReSkeleton round="4px" />
      </div>
    </dev-section>
    <dev-section title="設定動畫：淡入淡出">
      <div class="wrap">
        <ReSkeleton bg-color="#4caf50" round="4px" animate-fade-in-out />
        <ReSkeleton mt="10px" mb="10px" bg-color="#cd853f" round="4px" animate-fade-in-out />
        <ReSkeleton round="4px" bg-color="#cd5c5c" animate-fade-in-out />
        <ReSkeleton type="circle" wh="60px" mt="30px" mb="30px" animate-fade-in-out />
      </div>
    </dev-section>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import ReSkeleton from '@/components/feedback/ReSkeleton.vue';

export default defineComponent({
  name: 'ViewSkeleton',
  components: { ReSkeleton },
});
</script>

<style lang="scss" scoped></style>
