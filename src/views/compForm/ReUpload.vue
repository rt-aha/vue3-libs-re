<template>
  <div class="v-re-upload">
    <dev-section title="基本使用，上傳圖片">
      <re-upload v-model="fileList1">
        <!-- <re-button>
          <span class="btn-wrap__upload">上傳</span>
        </re-button> -->
      </re-upload>
    </dev-section>

    <dev-section title="基本使用，上傳影片">
      <re-upload v-model="fileList2" uploadSizeLimit="1000000">
        <!-- <re-button>
          <span class="btn-wrap__upload">上傳</span>
        </re-button> -->
      </re-upload>
    </dev-section>

    <!-- <ReUpload /> -->
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import ReUpload from '@/components/ReUpload.vue';
// import ReButton from '@/components/ReButton.vue';

export default defineComponent({
  name: 'ViewReUpload',
  components: {
    ReUpload,
    // ReButton,
  },
  setup() {
    const fileList1 = ref([]);
    const fileList2 = ref([]);

    return {
      fileList1,
      fileList2,
    };
  },
});
</script>

<style lang="scss" scoped></style>
