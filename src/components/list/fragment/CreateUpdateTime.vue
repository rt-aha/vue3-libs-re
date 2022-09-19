<template>
  <div class="c-create-update-time">
    111
    <!-- <p>{{ time.start }}</p>
    <p>{{ time.end }}</p> -->
  </div>
</template>
<script>
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'CreateUpdateTime',
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    // const time = computed(() => {
    //   console.log('props.data');
    //   const [start, end] = props.data.updateTime;
    //   return {
    //     start,
    //     end,
    //   };
    // });
    // return {
    //   time,
    // };
  },
});
</script>
<style lang="scss" scoped>
.c-create-update-time {
  @include font-style($c-black, 14, normal, 0.2px, 27px);
}
</style>
