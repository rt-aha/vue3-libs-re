import { gqlReuqest } from '@/api';
import { getSiteRule, uploadImage } from '@/api/gql/gqlTest';

export const getSiteRuleAPI = async (payload) => {
  const res = await gqlReuqest({
    data: {
      query: getSiteRule,
      payload,
    },
  });

  return res;
};

export const uploadImageAPI = async (payload, files) => {
  console.log('files', files);
  const res = await gqlReuqest({
    data: {
      query: uploadImage,
      payload,
    },
    file: files,
  });

  return res;
};
