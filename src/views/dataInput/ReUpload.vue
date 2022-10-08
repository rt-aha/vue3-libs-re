<template>
  <div class="v-re-upload">
    <dev-section title="基本使用，上傳圖片">
      <div class="wrap">
        <ReUpload v-model="fileList1" />
      </div>
    </dev-section>
    <dev-section title="多圖上傳">
      <div class="wrap">
        <dev-props type="Boolean" prop-name="multiple" text="上傳多個檔案" />
        <ReUpload v-model="fileList2" multiple />
      </div>
    </dev-section>

    <dev-section title="預覽設定：行列">
      <div class="wrap">
        <dev-props
          type="Object" prop-name="preview" text="是否用預覽，預設 {use: false, type: ''}, type=row 一行一行顯示, type=box 一格一格顯示"
        />
        <dev-desc text="e.g. {use: true, type: 'row'}" />
        <ReUpload
          v-model="fileList3" multiple
          :preview="{
            use: true,
            type: 'row',
          }"
        />

        <dev-desc text="e.g. {use: true, type: 'box'}" mt />
        <ReUpload
          v-model="fileList4"
          multiple
          :preview="{
            use: true,
            type: 'box',
          }"
        />
      </div>
    </dev-section>

    <dev-section title="上傳數量限制">
      <div class="wrap">
        <dev-props type="Number | String" prop-name="upload-count-limit" text="限制上傳數量" />
        <dev-desc text="e.g. 3" />
        <ReUpload v-model="fileList5" :upload-count-limit="3" />
      </div>
    </dev-section>

    <dev-section title="壓縮:待處理">
      <div class="wrap">
        <dev-props type="Object" prop-name="compress" text="壓縮" />
        <dev-desc text="e.g. { use: true, limitWidth: 1000, limitHeight: 1000, defaultExt: '', }" />
        <ReUpload
          v-model="fileList6"
          :compress="{
            use: true,
            limitWidth: 1000,
            limitHeight: 1000,
            defaultExt: '',
          }"
        />
      </div>
    </dev-section>
    <dev-section title="允許格式">
      <div class="wrap">
        <dev-props type="Object" prop-name="accept" text="寫在accept上是可以繞過的，所以是在js內判斷。預設圖片允許'jpg', 'jpeg', 'png'，影片允許'mov', 'quicktime', 'mp4'" />
        <dev-desc text="e.g. { image: ['jpg', 'jpeg', 'png'], video: ['mov', 'quicktime', 'mp4'] }" />
        <ReUpload
          v-model="fileList7"
          :accept="{
            image: ['jpg', 'jpeg', 'png'],
            video: ['mov', 'quicktime', 'mp4'],
          }"
        />
      </div>
    </dev-section>

    <dev-section title="檔案大小限制">
      <div class="wrap">
        <dev-props type="Number | String" prop-name="upload-size-limit" text="限制上傳大小，以kb為單位，預設 1024" />
        <dev-desc text="e.g. 2048" />
        <ReUpload v-model="fileList8" upload-size-limit="2048" />
      </div>
    </dev-section>
  </div>
</template>

<script setup>
import ReUpload from '@/components/dataInput/ReUpload.vue';

const fileList1 = ref([]);
const fileList2 = ref([]);
const fileList3 = ref([]);
const fileList4 = ref([]);
const fileList5 = ref([]);
const fileList6 = ref([]);
const fileList7 = ref([]);
const fileList8 = ref([]);
</script>

<style lang="scss" scoped></style>
