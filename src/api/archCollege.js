import { highwealthgroupRestful as request } from '@/api';

export const getArchCollegeTypeAPI = async (payload) => {
  const res = await request({
    method: 'get',
    url: '/get_college_type.php',
    params: payload,
  });
  return res.data;
};

export const getArchCollegeListAPI = async (payload) => {
  const res = await request({
    method: 'get',
    url: '/get_college_list.php',
    params: payload,
  });
  return res.data;
};

export const getArchCollegeArticleAPI = async (payload) => {
  const res = await request({
    method: 'get',
    url: '/get_college_detail.php',
    params: payload,
  });
  return res.data;
};
