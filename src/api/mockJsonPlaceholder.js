import { jsonplaceholderRequset } from '@/api';

export const mockJsonPlaceholder = async () => {
  const res = await jsonplaceholderRequset({
    url: '/posts',
  });

  return res;
};
