import restful from '@/api/libs/restful';

const highwealthgroupConfig = {
  baseURL: `${import.meta.env.VITE_API_HIGHWEALTHGROUP}`,
  timeout: 100000,
};

const qiyuConfig = {
  baseURL: `${import.meta.env.VITE_API_QIYU}`,
  timeout: 100000,
};

export const highwealthgroupRestful = restful(highwealthgroupConfig);
export const qiyuRestful = restful(qiyuConfig);
