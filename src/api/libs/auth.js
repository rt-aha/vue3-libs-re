import cusStorage from '@/utils/cusStorage';

export const getToken = (headers) => {
  const token = cusStorage.getItem('token') || '';
  const bearerToken = token ? `Bearer ${token}` : '';

  return {
    ...headers,
    Authorization: bearerToken,
  };
};

export const getResetPwToken = (headers) => {
  const token = cusStorage.getItem('reset-pw-token') || '';

  return {
    ...headers,
    Authorization: `Bearer ${token}`,
  };
};

export const no = {};
