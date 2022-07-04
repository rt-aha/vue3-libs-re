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
    isLoading,
    req,
  };
};
