/**
 * 문자열시간 한글 Formatter
 *
 * - 2021-07-08 -> 2021년 07월 08일
 */
export const koreanTimeFormatter = (time: string) => {
  if (!time) {
    return '';
  }

  const time_ = new Date(time + 'Z');
  const year_ = time_.getFullYear();
  const month_ = time_.getMonth() + 1;
  const day_ = time_.getDate();

  return `${year_}년 ${month_}월 ${day_}일`;
};
