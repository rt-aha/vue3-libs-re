<template>
  <div class="re-upload-file">
    <div class="upload-box">
      <input
        ref="uploadInputRef"
        type="file"
        class="file-input"
        :multiple="multiple && 'multiple'"
        :disabled="isDisabled"
        @change="handleFileChange"
      >

      <!-- FIXED: 不知為何包了 re-button 無法生效 -->

      <div class="trigger-scope" @click="handleClick">
        <slot>
          <ReButton @click.prevent>
            <span class="btn-wrap__upload">上傳</span>
          </ReButton>
        </slot>
      </div>
    </div>

    <div v-if="preview.use && preview.type === 'row'" class="preview-row-wrapper">
      <ReUploadPreviewRow
        v-for="(attachment, index) of attachments"
        :key="attachment.name + index"
        :attachment="attachment"
        :preview="preview"
        @removeFile="removeFile"
      />
    </div>
    <div v-if="preview.use && preview.type === 'box'" class="preview-box-wrapper">
      <ReUploadPreviewBox
        v-for="(attachment, index) of attachments"
        :key="attachment.name + index"
        :attachment="attachment"
        :preview="preview"
        @removeFile="removeFile"
      />
    </div>
  </div>
</template>

<script setup>
import ReButton from '@/components/common/buttonCollection/ReButton.vue';
import ReUploadPreviewRow from '@/components/dataInput/ReUploadPreviewRow.vue';
import ReUploadPreviewBox from '@/components/dataInput/ReUploadPreviewBox.vue';

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  // 允許上傳多個圖片
  multiple: {
    type: Boolean,
    default: false,
  },
  // 壓縮設定
  compress: {
    type: Object,
    default: () => ({
      use: false,
      limitWidth: 1000,
      limitHeight: 1000,
      defaultExt: '', // 設定圖片壓縮格副檔名
    }),
  },
  // 允許格式
  accept: {
    type: Object,
    default: () => ({
      image: ['jpg', 'jpeg', 'png'],
      video: ['mov', 'quicktime', 'mp4'],
    }),

    // ['jpg', 'jpeg', 'png', 'gif']
  },
  // 檔案大小限制，以kb計算，預設 1024kb = 1mb
  uploadSizeLimit: {
    type: [Number, String],
    default: 1024,
  },
  // 上傳檔案個數限制
  uploadCountLimit: {
    type: [Number, String],
    default: 5,
  },
  preview: {
    type: Object,
    default: () => ({
      use: false,
      type: '', // default: 一行一行的圖片、圖片名稱、圖片大小
    }),
  },
});
const emit = defineEmits(['update:modelValue', 'handleMessage']);

const attachments = ref([]);
const files = ref([]);
const acceptExt = ref([]);
const uploadInputRef = ref(null);
// 避免同個頁面有兩個 re-upload 導致，id-for 關聯錯誤

const isDisabled = computed(() => {
  if (!props.multiple) {
    if (attachments.value.length === 1) {
      return true;
    }
  }

  return false;
});

const init = () => {
  if (props.modelValue.length !== 0) {
    attachments.value = props.modelValue;
  }
};
const isAllowedUpdate = (type) => {
  if (type === 'single') {
    return !props.multiple && attachments.value.length === 1;
  }

  if (type === 'multiple') {
    if (props.multiple && files.value.length > Number(props.uploadCountLimit)) {
      return true;
    }

    if (props.multiple && files.value.length + attachments.value.length > Number(props.uploadCountLimit)) {
      return true;
    }
  }

  if (type === 'ext') {
    // const acceptExt = ['gif'];
    const acceptList = [...props.accept.image, ...props.accept.video];
    for (const file of files.value) {
      const fileType = file.type.split('/')[1];
      if (!acceptList.includes(fileType)) {
        return true;
      }
    }
  }

  if (type === 'size') {
    for (const file of files.value) {
      const fileKbSize = Math.ceil(file.size / 1024);

      if (fileKbSize > Number(props.uploadSizeLimit)) {
        return true;
      }
    }
  }

  return false;
};
const handleMessage = (info) => {
  const { code, errorMessage } = info;

  emit('handleMessage', {
    isDisabled: props.isDisabled,
    error: {
      code,
      message: errorMessage,
    },
  });
};
const updateValue = () => {
  emit('update:modelValue', attachments.value);
  // this.triggerValidate('change', this.attachments);
  handleMessage({});
};
const updateFiles = (file, fileName, fileSize, fileType) => {
  attachments.value.push({
    id: nanoid(),
    name: fileName,
    size: `${(fileSize / 1024).toFixed(2)}Kb`,
    file,
    type: fileType,
  });
  updateValue();
};
const removeFile = (id) => {
  attachments.value = attachments.value.filter(ele => ele.id !== id);
  updateValue();
  handleMessage({});
};
const handleClick = (e) => {
  console.log('uploadInputRef.value', uploadInputRef.value);
  uploadInputRef.value.value = null;
  uploadInputRef.value.click();
};
const handleFileChange = (event) => {
  files.value = event.target.files;
  // 僅能上傳一張時，判斷是否已上傳
  if (isAllowedUpdate('single')) {
    const err = '檔案上傳限制1張';
    console.error(err);
    handleMessage({ code: 1, errorMessage: err });
    return;
  }

  // 可上傳多張時，判斷是否是否已達上傳個數限制
  if (isAllowedUpdate('multiple')) {
    const err = `檔案上傳限制${props.uploadCountLimit}張`;
    console.error(err);
    handleMessage({ code: 2, errorMessage: err });
    return;
  }

  // 驗證副檔名是否正確
  if (isAllowedUpdate('ext')) {
    const err = '不支援該格式，請確認';
    console.error(err);
    handleMessage({ code: 3, errorMessage: err });
    return;
  }

  // 驗證檔案大小是否過大
  if (isAllowedUpdate('size')) {
    const err = `請勿上傳超過${props.uploadSizeLimit}Kb的檔案`;
    console.error(err);
    handleMessage({ code: 4, errorMessage: err });
    return;
  }

  handlePreview();
};
const handlePreview = () => {
  console.log('files.value', files.value);

  // files.value.forEach((file) => {
  for (const file of files.value) {
    const fileType = file.type.split('/')[1];

    if (props.accept.image.includes(fileType)) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const { use: useCompress, limitWidth: w, limitHeight: h } = props.compress;
        const targetResult = e.target.result;

        if (useCompress) {
          compressFile(targetResult, w, h, file, updateFiles);
        }
        else {
          updateFiles(targetResult, file.name, file.size, 'image');
        }
      };
    }

    if (props.accept.video.includes(fileType)) {
      updateFiles(file, file.name, file.size, 'video');
    }
  }
  // });
};

const compressFile = (imgBase64Data, maxWidth, maxHeight, file, updateFiles) => {
  // 建立一個圖片物件和Canvas
  const img = new Image();
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  // 圖片連結為
  img.src = imgBase64Data;
  // 讀取完圖片後
  img.onload = () => {
    // 圖片原始尺寸
    const originWidth = img.width;
    const originHeight = img.height;

    // 設定目標初始化尺寸
    let targetWidth = originWidth;
    let targetHeight = originHeight;

    // 若原始寬度大於最大寬度，或原始高度大於最大高度
    if (originWidth > maxWidth || originHeight > maxHeight) {
      // 且原始寬高比大於最大寬高比
      if (originWidth / originHeight > maxWidth / maxHeight) {
        // 如上傳圖的寬度大於最大寬，設定目標寬等於最大寬
        // 高度按照寬度比例縮放
        targetWidth = maxWidth;
        targetHeight = Math.round(maxWidth * (originHeight / originWidth));
      }
      else {
        // 高度大於寬度，以高度為基準，按高度比例縮放
        targetHeight = maxHeight;
        targetWidth = Math.round(maxHeight * (originWidth / originHeight));
      }
    }

    // 設定canvas寬高
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    // 清除canvas並重繪(壓縮)
    context.clearRect(0, 0, targetWidth, targetHeight);
    context.drawImage(img, 0, 0, targetWidth, targetHeight);

    // 若沒設定預設則用原圖片副檔名
    const fileType = props.compress.defaultExt || file.type.split('/')[1];
    const base64String = canvas.toDataURL(`image/${fileType}`, 1.0);
    updateFiles(base64String, file.name, file.size, 'image');
  };
};

init();
handleMessage({});
</script>

<style lang="scss" scoped>
.upload-desc {
  color: $c-black;
  font-size: 12px;
  margin-bottom: 5px;
}

.video-box {
  display: inline-block;
  position: relative;
  width: 100px;
  height: 100px;
  margin-top: 10px;
  margin-right: 10px;
  border-radius: 6px;
  overflow: hidden;
}

.vidoe-cover {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  background-color: rgba($c-black, 0.5);
}

.video-img {
  width: 100px;
  height: 100px;
  object-fit: contain;
}

.cancel-video {
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 120;
}

.progress-bar {
  position: absolute;
  bottom: 5px;
  left: 50%;
  z-index: 120;
  transform: translateX(-50%);
  width: 92px;
  height: 3px;
  background-color: rgba($c-black, 0.3);
  border-radius: 1.5px;
}

.ing-persent {
  width: 30%;
  height: 3px;
  background-color: $c-deepblue;
  border-radius: 1.5px;
}

.re-upload {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 50%;
  z-index: 120;
  transform: translateX(-50%);
  width: 100px;
  height: 36px;
  background-color: rgba($c-black, 0.5);

  &__box {
  }

  &__icon {
    display: inline-block;
    vertical-align: middle;
    color: $c-white;
  }

  &__text {
    display: inline-block;
    vertical-align: middle;
    color: $c-white;
    font-size: 12px;
  }
}

.trigger-scope {
  display: inline-block;
}

.plus-box {
  text-align: center;

  &__icon {
    display: inline-block;
    position: relative;
    width: 40px;
    height: 40px;

    &::before {
      @include position(center);
      content: "";
      display: inline-block;
      width: 20px;
      height: 2px;
      background-color: $c-grey;
      border-radius: 1px;
    }

    &::after {
      @include position(center);
      content: "";
      display: inline-block;
      width: 2px;
      height: 20px;
      background-color: $c-grey;
      border-radius: 1px;
    }
  }
}

.file-input {
  display: none;
}

.label-cell {
  font-size: 14px;
  text-align: center;

  & + & {
    margin-top: 5px;
  }
}

.photo-box {
  width: 100px;
  height: 100px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 6px;
  overflow: hidden;
}

.error-wrapper {
  width: 100%;
  height: 16px;
  line-height: 16px;

  &__text {
    color: #f00;
    font-size: 12px;
  }
}

.preview-row-wrapper {
  width: 100%;
  margin-top: 10px;
}

.preview-box-wrapper {
  width: 100%;
  margin-top: 10px;
  @include flex(flex-start, flex-start);
  flex-wrap: wrap;
}
</style>
