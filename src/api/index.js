import restful from '@/api/libs/restful';
import graphql from '@/api/libs/graphql';

const restfulConfig = {
  baseURL: 'https://jsonplaceholder.typicode.com/',
  timeout: 100000,
};

const gqlConfig = {
  baseURL: `${import.meta.env.VITE_API_GQL_URL}/graphql`,
  timeout: 100000,
};

export const restfulRequest = restful(restfulConfig);
export const gqlReuqest = graphql(gqlConfig);
