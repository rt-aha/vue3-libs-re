<template>
  <div class="re-upload-preview-video-modal-content">
    <template v-if="data.type === 'image'">
      <img class="preview-img" :src="data.imageSource">
    </template>
    <template v-if="data.type === 'video'">
      <video ref="videoDom" class="preview-video" width="320" height="150" controls>
        <source :src="videoSrc" type="video/mp4">
      </video>
    </template>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});

// props
const videoDom = ref(null);
const videoSrc = ref('');

const createTempVideoSource = () => {
  const { videoSource } = props.data;
  videoSrc.value = URL.createObjectURL(videoSource);
  videoDom.value.load();
};

onMounted(() => {
  if (props.data.type === 'video') {
    createTempVideoSource();
  }
});
</script>

<style lang="scss">
.preview-img {
  width: 60vw;
  height: 60vh;
  object-fit: contain;
}

.preview-video {
  width: 60vw;
  height: 60vh;
}
</style>
