import { highwealthgroupRestful as request } from '@/api';

export const getNewsTypeAPI = async (payload) => {
  const res = await request({
    method: 'get',
    url: '/get_news_type.php',
    params: payload,
  });
  return res.data;
};

export const getNewsListAPI = async (payload) => {
  const res = await request({
    method: 'get',
    url: '/get_news_list.php',
    params: payload,
  });
  return res.data;
};

export const getNewsArticleaPI = async (payload) => {
  const res = await request({
    method: 'get',
    url: '/get_news_detail.php',
    params: payload,
  });
  return res.data;
};
