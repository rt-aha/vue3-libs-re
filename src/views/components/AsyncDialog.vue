<template>
  <div class="v-async-dialog">AsyncDialog 施工中 ...
    <button @click="toggleModal">trigger</button>

    
  </div>
</template>

<script>
import { defineComponent } from 'vue';
// import AsyncDialog from '@/components/AsyncDialog/index.vue'

import useAsyncDialog from '@/hooks/useAsyncDialog';

export default defineComponent({
  name: 'ViewAsyncDialog',
  components: {
    // AsyncDialog
  },
  setup() {
    const { asyncDialog } = useAsyncDialog();

    const toggleModal = () => {
      asyncDialog({
        desc: '刪除成功',
      });
    }


    return {
      toggleModal

    }
  }
});
</script>

<style lang="scss" scoped></style>
