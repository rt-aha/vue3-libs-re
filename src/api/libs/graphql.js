/* eslint-disable */
import axios from 'axios';
import { getToken } from './auth';
import { formatResponse } from './formatResponse';
import interceptor from './interceptor';
import validate from './validate';
import { print } from 'graphql/language/printer';

const toGraphqlPayload = (gqlSyntax, variables) => {
  console.log('print(gqlSyntax)',print(gqlSyntax))
  return {
    query: print(gqlSyntax),
    variables,
  };
};


/**
 *
 * @param {string} baseURL
 * @param {number} timeout optional, 預設 1000
 * @param {object} headers optional, 設定預設 headers
 * @param {version} string optional, 預設空字串 '', e.g. '/v1'
 * @param {useAuth} boolean optional, 預設true
 * @param {authFunc} function  optional, 取得token方式, 預設從localStorage取token
 * @param {formatResponse} function optional, request回傳格式, 預設回傳狀態碼與資料
 * @param {interceptor} object optional, 攔截器function {reqSuccess, reqFail, resSuccess, resFail}
 */
const graphql = ({
  baseURL = '',
  timeout = 1000,
  headers: defaultHeaders = {},
  version: ver = '',
  useAuth: auth = true,
  authFunc: getTokenFunc = getToken,
  formatResponse: formatResponseFunc = formatResponse,
  interceptor: interceptorFunc = interceptor,
}) => {
  if (!validate('baseURL', baseURL)) return;

  const xhr = axios.create({
    baseURL,
    timeout,
    headers: defaultHeaders,
  });

  xhr.interceptors.request.use(interceptorFunc.reqSuccess, interceptorFunc.reqFail);
  xhr.interceptors.response.use(interceptorFunc.resSuccess, interceptorFunc.resFail);

  return async ({
    headers = {},
    method = 'post',
    url = '',
    params = {},
    data = {},
    version = ver,
    authFunc = getTokenFunc,
    useAuth = auth,
    formatResponse = formatResponseFunc,
    ...rest
  }) => {
    if (!validate('method', method)) return;

    // 合併預設headers和特定headers
    headers = {
      ...defaultHeaders,
      ...headers,
    };

    if (useAuth) {
      headers = authFunc(headers);
    }

    try {
      const res = await xhr.request({
        headers,
        method,
        url: '',
        params: params || {},
        data: toGraphqlPayload(data.query, data.payload),
        ...rest,
      });

      return formatResponse(res);
    } catch (err) {
      return new Error(err);
    }
  };
};

export default graphql;
