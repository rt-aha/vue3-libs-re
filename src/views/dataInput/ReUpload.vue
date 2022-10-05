<template>
  <div class="v-re-upload">
    <dev-section title="基本使用，上傳圖片">
      <ReUpload v-model="fileList1" />
    </dev-section>
    <dev-section title="多圖上傳">
      <ReUpload v-model="fileList1" multiple />
    </dev-section>

    <dev-section title="預覽設定：行列">
      <ReUpload v-model="fileList1" multiple upload-size-limit="10000000" />
    </dev-section>

    <dev-section title="預覽設定：方塊">
      <ReUpload
        v-model="fileList1"
        multiple
        upload-size-limit="10000000"
        :preview="{
          use: true,
          type: 'box',
        }"
      />
    </dev-section>

    <dev-section title="上傳數量限制">
      <ReUpload v-model="fileList1" upload-count-limit />
    </dev-section>

    <dev-section title="壓縮:待處理">
      <ReUpload
        v-model="fileList1"
        :compress="{
          use: false,
        }"
      />
    </dev-section>
    <dev-section
      title="允許格式，寫在accept上是可以繞過的，所以是在js內判斷。預設圖片允許'jpg', 'jpeg', 'png'，影片允許'mov', 'quicktime', 'mp4'，"
    >
      <ReUpload
        v-model="fileList1"
        :accept="{
          image: ['jpg', 'jpeg', 'png'],
          video: ['mov', 'quicktime', 'mp4'],
        }"
      />
    </dev-section>

    <dev-section title="檔案大小限制：以kb為單位，預設1024，e.g. 2048">
      <ReUpload v-model="fileList2" upload-size-limit="2048">
        <!-- <re-button>
          <span class="btn-wrap__upload">上傳</span>
        </re-button> -->
      </ReUpload>
    </dev-section>

    <dev-section title="基本使用，上傳影片，影片預覽待處理">
      <ReUpload v-model="fileList2" upload-size-limit="10000000">
        <!-- <re-button>
          <span class="btn-wrap__upload">上傳</span>
        </re-button> -->
      </ReUpload>
    </dev-section>

    <!-- <ReUpload /> -->
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import ReUpload from '@/components/dataInput/ReUpload.vue';
// import ReButton from '@/components/dataInput/ReButton.vue';

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
