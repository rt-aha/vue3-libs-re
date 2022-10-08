<template>
  <div class="re-upload-preview">
    <div class="re-upload-preview__content">
      <div class="preview-box">
        <div class="preview-box__frame">
          <div v-if="isLoading" class="preview-box__frame__loading">
            <re-loading />
          </div>
          <template v-else>
            <img class="preview-box__frame__image" :src="snapImage || attachment.file">
            <div class="preview-box__frame__overlay" @click="openPreviewModal">
              <img
                v-if="attachment.type === 'video'"
                class="preview-box__frame__overlay__play-icon"
                src="@/assets/icon/play.svg"
              >
            </div>
          </template>
        </div>

        <!-- v-if="$attrs.preview.image" -->

        <div class="preview-box__info">
          <p class="preview-box__info__name">
            {{ attachment.name }}
          </p>
          <p class="preview-box__info__size">
            ({{ attachment.size }})
          </p>

          <div class="preview-box__info__action" @click="removeFile">
            <img class="preview-box__info__action__delete" src="@/assets/icon/close_white.svg">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import useModal from '@/hooks/useModal';
import ReUploadPreviewVideoModalContent from '@/components/dataInput/ReUploadPreviewVideoModalContent.vue';
const props = defineProps({
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
});

const { modal } = useModal();

const file = ref({});
const snapImage = ref('');
const isLoading = ref(false);

const removeFile = () => {
  emit('removeFile', props.attachment.id);
};

const handlePreview = () => {
  isLoading.value = true;
  if (!props.attachment.file) {
    return;
  }

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
      isLoading.value = false;

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

    video.addEventListener('timeupdate', timeupdate);
    video.preload = 'metadata';
    video.src = videoTempUrl;
    video.muted = true;
    video.playsInline = true;
    video.play();
  };

  fileReader.readAsArrayBuffer(props.attachment.file);
};

const openPreviewModal = () => {
  modal({
    data: {
      videoSource: props.attachment.file || '',
      imageSource: props.attachment.file || '',
      type: props.attachment.type,
    },
    render: ReUploadPreviewVideoModalContent,
  });
};

onMounted(() => {
  if (props.attachment.type === 'video') {
    handlePreview();
    // createTempVideoSource();
  }
});
</script>

<style lang="scss" scoped>
.re-upload-preview {
  width: 150px;
  /* height: 210px; */
  @include flex(flex-start, flex-start);
  margin-bottom: 10px;
  margin-right: 5px;

  &__content {
  }
}

.preview-box {
  width: 100%;
  position: relative;

  &__frame {
    width: 150px;
    height: 150px;
    border: 1px solid $c-grey;
    box-sizing: border-box;
    position: relative;

    &__loading {
      @include position(center);
    }

    &__image {
      display: inline-block;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    &__overlay {
      @include position(tl, 0, 0);
      width: 100%;
      height: 100%;
      transition: 0.4s;
      cursor: pointer;

      &:hover {
        background-color: rgba($c-black, 0.5);
      }

      &__play-icon {
        @include position(center);
      }
    }
  }

  &__info {
    width: 100%;
    @include font-style($c-grey, 14, 300);
    display: inline-block;

    &__name {
      width: 100%;
      @include font-style($c-black, 14);
      @include word-ellipsis(2);
      word-break: break-all;
    }

    &__size {
      @include font-style($c-grey, 14);
    }

    &__action {
      @include position(tr, 5px, 5px);
      @include circle(20px);
      @include flex(center);
      background-color: $c-red;

      &__delete {
        width: 16px;
        cursor: pointer;
      }
    }
  }
}

.invisible-video {
  display: none;
}
</style>
