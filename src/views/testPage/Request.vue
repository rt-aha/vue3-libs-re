<template>
  <div class="v-request">v-Test</div>
</template>
<script>
import { defineComponent } from 'vue';
import { mockJsonPlaceholder } from '@/api/mockJsonPlaceholder';
import { loginPublicAPI } from '@/api/site';
import useRequest from '@/hooks/useRequest';

export default defineComponent({
  name: 'TestReqest',
  setup() {
    const { request: restfulReq } = useRequest(mockJsonPlaceholder);

    const { request: gqlReq } = useRequest(loginPublicAPI);

    restfulReq();
    gqlReq({
      in: {
        code: '',
        password: '',
      },
    });

    return {};
  },
});
</script>
<style lang="scss" scoped></style>
