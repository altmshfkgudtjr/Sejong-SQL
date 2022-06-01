/**
 * 파일 업로드 실행 함수
 */
export const uploadFile = ({
  accept,
  multiple,
  callback,
}: {
  accept: string;
  multiple?: boolean;
  callback: (e: any) => void;
}) => {
  const onWindowFocus = () => {
    target.remove();
    window.removeEventListener('focus', onWindowFocus);
  };

  const onChange = e => {
    callback && callback(e);
    e.target.remove();
  };

  const target = document.createElement('input');
  target.style.opacity = '0';
  target.setAttribute('type', 'file');
  target.setAttribute('accept', accept);
  multiple && target.setAttribute('multiple', 'multiple');
  target.addEventListener('change', onChange);

  window.addEventListener('focus', onWindowFocus);

  document.body.appendChild(target);
  target.click();
};
