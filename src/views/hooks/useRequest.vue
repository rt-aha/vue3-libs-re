<template>
  <div class="c-use-reuqest">
    <ContentLayout>
      <template #first>
        <p>demo.vue</p>

        <pre v-highlightjs>
          <code class="javascript">
  import { defineComponent } from 'vue';
  import useRequest from '@/hooks/useRequest';
  import { mockJsonPlaceholder } from '@/api/mockJsonPlaceholder.js';

  export default defineComponent({
    name: 'UseRequest',
    setup() {
      const { req } = useRequest(mockJsonPlaceholder);

      const handleReq = async () => {
        const res = await req();

        console.log(res.value.data);
      };

      handleReq();

      return {};
    },
  });
          </code>
        </pre>
      </template>
      <template #second>
        <p>useRequest.vue</p>

        <pre v-highlightjs>
          <code class="javascript">
  import { ref } from 'vue';

  export default (requestApi) => {
    const isLoading = ref(false);
    const res = ref({});

    const req = async (args = {}, otherArgs = {}) => {
      try {
        isLoading.value = true;
        res.value = await requestApi(args, otherArgs);
        return res.value;
      } catch (e) {
        console.log('e...', e);
      } finally {
        isLoading.value = false;
      }
      return null;
    };

    return {
      res,
      req,
      isLoading,
    };
  };

          </code>
        </pre>
      </template>
    </ContentLayout>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import useRequest from '@/hooks/useRequest';
import { mockJsonPlaceholder } from '@/api/restfulTest.js';

export default defineComponent({
  name: 'UseRequest',
  setup() {
    const { req } = useRequest(mockJsonPlaceholder);
    const handleReq = async () => {
      const res = await req();
      console.log(res.value.data);
    };
    handleReq();
    return {};
  },
});
</script>

<style lang="scss">
@import "@/styles/libs/atom-one-dark";
</style>
