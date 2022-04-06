/** 현재 ScrollTop 반환 */
export const getScrollTop = () => {
  return Math.max(document.documentElement.scrollTop, document.body.scrollTop, window.scrollY);
};
