import styled, { useTheme } from 'styled-components';
import { useState } from 'react';
// components
import SideLayout from 'components/layouts/Side';
import { Icon } from 'sjds/components/icons';
import SidebarBadge from 'components/presenters/sidebar/Badge';
import SidebarClassToggle from 'components/presenters/sidebar/ClassToggle';
import WeekButton from 'components/presenters/sidebar/WeekButton';

/** 사이드바 */
const Sidebar = () => {
  const currentTheme = useTheme();

  const [isLoaded] = useState(true);

  return (
    <SideLayout>
      {!isLoaded && <div>Loading...</div>}
      {isLoaded && (
        <>
          <CategoryWrapper>
            <ClassWrapper>
              <SidebarBadge>
                <Icon name="ic_class" width={16} height={16} fill={currentTheme.text.f4} />
                수업
              </SidebarBadge>

              <SidebarClassToggle classId="2" name="데이터베이스" managerName="신희재">
                <WeekButton classId="2" weekId="1" name="1주차" />
                <WeekButton classId="2" weekId="2" name="2주차" />
                <WeekButton classId="2" weekId="3" name="3주차" />
                <WeekButton classId="2" weekId="4" name="4주차" />
              </SidebarClassToggle>
            </ClassWrapper>

            <ClassWrapper>
              <SidebarClassToggle
                classId="1"
                name="연습문제"
                managerName="신희재"
              ></SidebarClassToggle>
            </ClassWrapper>
          </CategoryWrapper>

          <CategoryWrapper>
            <ClassWrapper>
              <SidebarBadge>
                <Icon name="ic_setting" width={16} height={16} fill={currentTheme.text.f4} />
                관리
              </SidebarBadge>

              <SidebarClassToggle classId="3" name="데이터베이스 실습" managerName="서정민">
                <WeekButton classId="3" weekId="1" name="연습문제" />
                <WeekButton classId="3" weekId="2" name="1주차 - 원하는 데이터 선택" />
                <WeekButton classId="3" weekId="3" name="2주차 - 원하는 조건문 추가" />
                <WeekButton classId="3" weekId="4" name="3주차 - 데이터베이스의 꽃, JOIN문" />
              </SidebarClassToggle>
            </ClassWrapper>
          </CategoryWrapper>
        </>
      )}
    </SideLayout>
  );
};

const CategoryWrapper = styled.div`
  margin-bottom: 40px;
`;

const ClassWrapper = styled.div`
  margin-bottom: 16px;
`;

export default Sidebar;
