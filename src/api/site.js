import { qiyuRestful as request } from '@/api';

export const getMetaAPI = async (payload) => {
  const res = await request({
    method: 'get',
    url: '/api/get_meta_data.php',
    params: payload,
  });
  return res.data;
};
