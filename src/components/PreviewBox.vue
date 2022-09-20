<template>
  <div class="r-preview-box">
    <div class="r-preview-box__content">
      <div class="r-preview-box__content__photo" :style="`background-image: url(${snapImage || attachment.file});`" />
      <!-- v-if="$attrs.preview.image" -->
      <p class="r-preview-box__content__info">
        <span v-if="$attrs.preview.name">{{ attachment.name }}</span>
        <span v-if="$attrs.preview.size">({{ attachment.size }})</span>
      </p>
    </div>

    <video
      ref="invisibleVideoRef"
      class="invisible-video"
      width="320"
      height="150"
      controls="controls"
      @loadedmetadata="getVideoDuration"
    >
      <source ref="videoSourceRef" />
    </video>

    <div class="r-preview-box__action">
      <span class="r-preview-box__action__delete" @click="removeFile">刪除</span>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  name: 'RePreviewBox',
  props: {
    attachment: {
      type: Object,
      default: () => ({
        file: '',
        name: '',
        size: '',
        id: '',
        type: 'image', // image, video, other
      }),
    },
  },
  setup(props, { emit }) {
    const file = ref({});
    const snapImage = ref('');
    const videoSourceRef = ref(null);
    const invisibleVideoRef = ref(null);

    const removeFile = () => {
      emit('removeFile', props.attachment.id);
    };

    const handlePreview = () => {
      if (!props.attachment.file) {
        return;
      }

      videoSourceRef.value.src = URL.createObjectURL(props.attachment.file);

      invisibleVideoRef.value.load();
      // this.attachment.videos.forEach() {}
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const blob = new Blob([fileReader.result], { type: props.attachment.file.type });

        const videoTempUrl = URL.createObjectURL(blob);

        const video = document.createElement('video');

        const snapImageFn = () => {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
          const image = canvas.toDataURL();

          snapImage.value = image;

          canvas.toBlob(async (blobFile) => {
            const formData = new FormData();
            formData.append('file', blobFile, 'image.png');
          }, 'image/png');

          const success = image.length > 100000;
          if (success) {
            URL.revokeObjectURL(videoTempUrl);
          }

          return success;
        };

        const timeupdate = () => {
          if (snapImageFn()) {
            video.removeEventListener('timeupdate', timeupdate);
            video.pause();
          }
        };
        video.addEventListener('loadeddata', () => {
          if (snapImageFn()) {
            video.removeEventListener('timeupdate', timeupdate);
          }
        });

        video.addEventListener('timeupdate', timeupdate);
        video.preload = 'metadata';
        video.src = videoTempUrl;
        // Load video in Safari / IE11
        video.muted = true;
        video.playsInline = true;
        video.play();
      };

      fileReader.readAsArrayBuffer(props.attachment.file);
    };

    onMounted(() => {
      console.log('props.attachment', props.attachment);
      console.log(props.attachment.type === 'video');
      if (props.attachment.type === 'video') {
        handlePreview();
      }
    });

    return {
      file,
      snapImage,
      removeFile,
      videoSourceRef,
      invisibleVideoRef,
    };
  },
});
</script>

<style lang="scss" scoped>
.r-preview-box {
  @include flex();
  margin-top: 5px;

  &__content {
    @include flex();
    flex: 1;

    &__photo {
      display: inline-block;
      width: 30px;
      height: 30px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      overflow: hidden;
    }

    &__info {
      @include font-style($c-grey, 14, 300);
      display: inline-block;
      margin-left: 10px;
    }
  }

  &__action {
    flex: none;
    width: 30px;
    &__delete {
      @include font-style($c-grey, 14);
      cursor: pointer;
    }
  }
}

.invisible-video {
  display: none;
}
</style>
