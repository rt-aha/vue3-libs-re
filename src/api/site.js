import { gqlReuqest } from '@/api';
import { loginPublic } from '@/api/gql/site';

export const loginPublicAPI = async (payload) => {
  const res = await gqlReuqest({
    data: {
      query: loginPublic,
      payload,
    },
  });

  return res;
};
