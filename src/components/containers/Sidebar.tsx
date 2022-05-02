import { useState } from 'react';
// components
import SideLayout from 'components/layouts/Side';

/** 사이드바 */
const Sidebar = () => {
  const [isLoaded] = useState(false);

  return (
    <SideLayout>
      {!isLoaded && <div>Loading...</div>}
      {isLoaded && (
        <>
          <h1>수업</h1>
          <h2>
            데이터베이스 <strong>신희재</strong>
          </h2>
          <p>연습문제</p>
          <p>1주차</p>
        </>
      )}
    </SideLayout>
  );
};

export default Sidebar;
