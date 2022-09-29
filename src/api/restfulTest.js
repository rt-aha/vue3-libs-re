import { restfulRequest } from '@/api';

export const mockJsonPlaceholder = async () => {
  const res = await restfulRequest({
    url: '/users',
  });

  return res;
};
