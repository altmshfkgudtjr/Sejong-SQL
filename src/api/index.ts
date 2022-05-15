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
  if (process.env.NODE_ENV === 'development') {
    console.group('API 호출 도중 오류가 발생하였습니다.');
    console.log(err);
    console.groupEnd();
  }
  return Promise.reject(err.name);
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
