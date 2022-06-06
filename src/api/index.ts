import axios from 'axios';
// apis
import * as userAPIs from 'api/user';
// utils
import * as storageUtils from 'utils/storage';
import { developmentLog, axiosErrorLogFormat } from 'utils/log';

/**
 * Request 성공 handler
 */
const requestSuccessHandler = config => {
  // Next.js ServerSide
  if (typeof window === 'undefined') {
    return config;
  }

  const accessToken =
    storageUtils.getSessionStorage('ssql-accessToken') ||
    storageUtils.getLocalStorage('ssql-accessToken');

  if (accessToken && !config.headers.Authorization) {
    Object.assign(config.headers, { Authorization: `Bearer ${accessToken}` });
  }

  return config;
};

/**
 * Request 실패 handler
 */
const requestErrorHandler = err => {
  return Promise.reject(err);
};

/**
 * Response 성공 handler
 */
const responseSuccessHandler = res => {
  if (200 <= res.status && res.status < 300) {
    return res.data;
  } else {
    return responseErrorHandler(res.data);
  }
};

/**
 * Response 실패 handler
 */
const responseErrorHandler = async err => {
  const {
    response: { status: statusCode, data },
    config: previousConfig,
  } = err;

  if (statusCode === 401 && data.msg === 'JWT Token has expired') {
    developmentLog('Access Token이 유효하지 않습니다.');
    const res = await userAPIs.getTokenAPI();
    if (res) {
      developmentLog('JWT Token을 갱신하고, 실패한 API를 재호출합니다.', () => {
        console.log(`URL: ${previousConfig.url}`);
      });
      request.request({ ...previousConfig });
    }
  }

  return Promise.reject(axiosErrorLogFormat(err));
};

/**
 * Axios 객체
 */
const request = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Cache-Control': 'no-cache',
  },
});

/**
 * Axios Request 미들웨어
 */
request.interceptors.request.use(
  config => requestSuccessHandler(config),
  err => requestErrorHandler(err),
);

/**
 * Axios Response 미들웨어
 */
request.interceptors.response.use(
  res => responseSuccessHandler(res),
  err => responseErrorHandler(err),
);

export default request;
