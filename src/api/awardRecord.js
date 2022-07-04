import { qiyuRestful as request } from '@/api';

export const getAwardRecordDataAPI = async (payload) => {
  const res = await request({
    method: 'get',
    url: '/api/get_prize.php',
    params: payload,
  });
  return res.data;
};
