import restful from '@/api/libs/restful';
import graphql from '@/api/libs/graphql';

const jsonplaceholderConfig = {
  baseURL: 'https://jsonplaceholder.typicode.com/',
  timeout: 100000,
};

const gqlConfig = {
  baseURL: import.meta.env.VITE_API_GQL_URL,
  timeout: 100000,
};

export const jsonplaceholderRequset = restful(jsonplaceholderConfig);
export const gqlReuqest = graphql(gqlConfig);
