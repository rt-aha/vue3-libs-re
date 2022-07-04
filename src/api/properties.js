import { qiyuRestful as request } from '@/api';

export const getPropertyTypeListAPI = async (payload) => {
  const res = await request({
    method: 'get',
    url: '/api/get_data_type.php',
    params: payload,
  });
  return res.data;
};

export const getPropertyAreaListAPI = async (payload) => {
  const res = await request({
    method: 'get',
    url: '/api/get_country.php',
    params: payload,
  });
  return res.data;
};

// 暫時關閉
// export const getPropertyApproachListAPI = async (payload) => {
//   const res = await request({
//     method: 'get',
//     url: '/api/get_method.php',
//     params: payload,
//   });
//   return res.data;
// };

export const getPropertyYearListAPI = async (payload) => {
  const res = await request({
    method: 'get',
    url: '/api/get_make_year.php',
    params: payload,
  });
  return res.data;
};

export const getPropertiesDataAPI = async (payload) => {
  const res = await request({
    method: 'post',
    url: '/api/get_property.php',
    params: payload,
  });
  return res.data;
};
