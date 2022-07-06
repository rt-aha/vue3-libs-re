<template>
  <div class="c-use-reuqest">
    <content-layout>
      <template v-slot:first>
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
      <template v-slot:second>
        <p>useRequest.js</p>

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
    </content-layout>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import useRequest from '@/hooks/useRequest';
import { mockJsonPlaceholder } from '@/api/mockJsonPlaceholder.js';
import ContentLayout from '../../components/Global/ContentLayout.vue';

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
  components: { ContentLayout },
});
</script>
<style lang="scss">
@import '@/styles/libs/atom-one-dark.scss';
</style>
