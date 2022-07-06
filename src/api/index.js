import restful from '@/api/libs/restful';

const jsonplaceholderConfig = {
  baseURL: 'https://jsonplaceholder.typicode.com/',
  timeout: 100000,
};

export const jsonplaceholderRequset = restful(jsonplaceholderConfig);
