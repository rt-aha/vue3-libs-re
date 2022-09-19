<template>
  <div class="c-edit-survey">
    <ReImage :src="editIcon" alt="logo" width="20px" cursor @click="toSurveySales" />
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import ReImage from '@/components/global/ReImage.vue';
import editIcon from '@/assets/icon/icon_edit.svg';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'EditSurvey',
  components: {
    ReImage,
  },
  setup() {
    const router = useRouter();

    const toSurveySales = () => {
      router.push({
        name: 'customer-record',
      });
    };

    return {
      editIcon,
      toSurveySales,
    };
  },
});
</script>
<style lang="scss" scoped>
.c-edit-survey {
  display: inline-block;
}
</style>
