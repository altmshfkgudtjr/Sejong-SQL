/**
 * 로그
 * - Only Development Mode
 * @param title 로그 그룹명
 * @param fn 로그 실행 함수
 */
export const developmentLog = (title: string, fn?: () => void) => {
  if (process.env.NODE_ENV === 'development') {
    console.group(title);
    fn && fn();
    console.groupEnd();
  }
};

/**
 * 에러 로그 포맷
 * - Only Development Mode
 * @param err Axios Response Error Object
 */
export const axiosErrorLogFormat = err => {
  const {
    response: { status: statusCode },
  } = err;

  if (process.env.NODE_ENV === 'development') {
    Promise.reject(`${err.name} - ${err.message}

[에러코드]
• ${statusCode}

[메소드]
• ${err.config.method.toUpperCase()}

[URL]
• ${err.request.responseURL}

[반환값]
${
  typeof err.response.data === 'string'
    ? err.response.data.slice(0, 150) + '...더 읽기'
    : JSON.stringify(err.response.data, undefined, 2)
}

`);
  }

  return err;
};
