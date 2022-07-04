import { highwealthgroupRestful as request } from '@/api';

export const getHotVideoTypeAPI = async (payload) => {
  const res = await request({
    method: 'get',
    url: '/get_video_type.php',
    params: payload,
  });
  return res.data;
};

export const getHotVideoListAPI = async (payload) => {
  const res = await request({
    method: 'get',
    url: '/get_video_list.php',
    params: payload,
  });
  return res.data;
};
