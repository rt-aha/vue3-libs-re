<template>
  <div class="v-request">
    <dev-section title="Restful">
      <ReButton @click="restfulRequest">Restful</ReButton>
    </dev-section>
    <dev-section title="Graphql">
      <ReButton @click="graphqlRequest">Graphql</ReButton>
    </dev-section>

    <dev-section title="graphqlUpload">
      <div class>
        <input
          type="file"
          ref="inputRef"
          class="file-input"
          @change="handleFileChange"
          accept="image/png, image/jpeg, image/jpg"
        />

        <ReButton @click="triggerUpload">Upload</ReButton>
      </div>
    </dev-section>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
import { mockJsonPlaceholder } from '@/api/restfulTest';
import { getSiteRuleAPI, uploadImageAPI } from '@/api/gqlTest';
import useRequest from '@/hooks/useRequest';
import ReButton from '@/components/common/ReButton.vue';

export default defineComponent({
  name: 'TestReqest',
  components: {
    ReButton,
  },
  setup() {
    const { request: restfulReq } = useRequest(mockJsonPlaceholder);
    const { request: gqlReq } = useRequest(getSiteRuleAPI);
    const { request: imageUploadGqlReq } = useRequest(uploadImageAPI);

    const file = ref();
    const inputRef = ref(null);

    const restfulRequest = () => {
      restfulReq();
    };
    const graphqlRequest = () => {
      gqlReq({
        in: 'Cookie',
      });
    };

    const handleFileChange = (event) => {
      console.log(event);
      file.value = event.target.files;

      console.log(1);
      imageUploadGqlReq({
        file: file.value,
        in: {
          type: 'Avator',
        },
      });

      console.log(2);
    };

    const triggerUpload = () => {
      inputRef.value.click();
    };

    return {
      restfulRequest,
      graphqlRequest,
      handleFileChange,
      inputRef,
      triggerUpload,
    };
  },
});
</script>
<style lang="scss" scoped></style>
