import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { typo } from 'sjds';
// hooks
import useInformation from 'hooks/commons/useInformation';
// components
import { TextButton } from 'sjds/components/buttons';

/**
 * 대시보드 이동 경로
 */
const Breadcrumb = () => {
  const { query, pathname } = useRouter();
  const classId = parseInt(query.classId as string, 10);
  const weekId = parseInt(query.weekId as string, 10);
  const problemId = parseInt(query.problemId as string, 10);

  const [historyList, setHistoryList] = useState<History[]>([]);

  const { className, weekName, problemTitle } = useInformation({ classId, weekId, problemId });

  useEffect(() => {
    const routeList = pathname.split('/').slice(1);
    if (routeList.length === 0) {
      return;
    }

    let url = '/dashboard';
    const initValue: History[] = [];
    /* tslint:disable */
    const history_ = routeList.reduce((prev, curr, idx, arr) => {
      let name = '';

      /* SKIP */
      if (curr === 'dashboard') {
        return prev;
      }
      if (curr === 'new') {
        return prev;
      }
      if (curr === 'manage') {
        return prev;
      }

      /* Path */
      if (curr === 'class' && arr[idx + 1] === 'new') {
        prev.push({
          name: '새로운 분반',
          route: url + `/class/new`,
        });
        return prev;
      }
      if (curr === 'week' && arr[idx + 1] === 'new') {
        prev.push({
          name: '새로운 주차',
          route: url + `/week/new`,
        });
        return prev;
      }
      if (curr === 'problem' && arr[idx + 1] === 'new') {
        prev.push({
          name: '새로운 문제',
          route: url + `/problem/new`,
        });
        return prev;
      }
      if (curr === 'edit' && arr[idx - 1] === '[classId]') {
        prev.push({
          name: '분반 수정',
          route: url + `/edit`,
        });
        return prev;
      }
      if (curr === 'edit' && arr[idx - 1] === '[weekId]') {
        prev.push({
          name: '주차 수정',
          route: url + `/edit`,
        });
        return prev;
      }
      if (curr === 'edit' && arr[idx - 1] === '[problemId]') {
        prev.push({
          name: '문제 수정',
          route: url + `/edit`,
        });
        return prev;
      }
      if (curr === 'member' && arr[idx + 1] === 'manage') {
        prev.push({
          name: '학생 관리',
          route: url + `/member/manage`,
        });
        return prev;
      }
      if (curr === 'analytics') {
        prev.push({
          name: '통계',
          route: url + `/analytics`,
        });
        return prev;
      }

      /* 고유 식별값 */
      if (curr === '[classId]') {
        name = className;
        url += `/${classId}`;
      }
      if (curr === '[weekId]') {
        name = weekName;
        url += `/${weekId}`;
      }
      if (curr === '[problemId]') {
        name = problemTitle;
        url += `/${problemId}`;
      }

      prev.push({ name, route: url });
      return prev;
    }, initValue);

    setHistoryList(history_);
  }, [pathname, classId, weekId, problemId, className, weekName, problemTitle]);

  const LinkList = historyList.map((history, idx) => (
    <LinkWrapper key={idx}>
      <i>{historyList.length !== idx && '/'}</i>
      <Link href={history.route} passHref>
        <LinkButton isLast={historyList.length === idx + 1} size="ExtraSmall">
          {history.name}
        </LinkButton>
      </Link>
    </LinkWrapper>
  ));

  return <Wrapper>{LinkList}</Wrapper>;
};

const Wrapper = styled.ul`
  display: flex;
  align-items: center;
`;

const LinkWrapper = styled.li`
  display: flex;
  align-items: center;
  height: 36px;

  & > i {
    display: inline-block;
    margin: 0 4px;
  }

  &:first-of-type {
    & > i {
      margin-left: 0;
    }
  }
`;

const LinkButton = styled(TextButton)<{ isLast: boolean }>`
  display: inline-block;
  ${typo.value3};
  color: ${({ isLast, theme }) => (isLast ? theme.text.f1 : theme.text.f4)};
`;

type History = {
  name: string;
  route: string;
};

export default Breadcrumb;
