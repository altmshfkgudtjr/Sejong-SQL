import axios from 'axios';

/**
 * Request 성공 handler
 */
const requestSuccessHandler = config => {
  // Next.js ServerSideRendering
  if (typeof window === 'undefined') {
    return config;
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
  if (res.status === 200) {
    return res.data;
  } else {
    return responseErrorHandler(res.data);
  }
};

/**
 * Response 실패 handler
 */
const responseErrorHandler = err => {
  // TODO API 서버 연결 후에, 바꾸기
  return Promise.reject('API 서버 연결 후에 변경해주세요.');
  // return Promise.reject(err.response.data);
};

/**
 * Axios 객체
 */
const request = axios.create({
  headers: {
    'Content-Type': 'application/json, charset=utf8',
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
