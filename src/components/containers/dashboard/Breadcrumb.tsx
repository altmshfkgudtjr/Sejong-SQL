import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { typo } from 'sjds';
// components
import { TextButton } from 'sjds/components/buttons';

/**
 * 대시보드 이동 경로
 */
const Breadcrumb = () => {
  const { query, pathname } = useRouter();
  const [historyList, setHistoryList] = useState<History[]>([]);

  useEffect(() => {
    const routeList = pathname.split('/').slice(1);
    if (routeList.length === 1) {
      return;
    }

    let url = '/dashboard';
    const historyList_ = routeList.slice(1).map(route => {
      if (route === '[classId]') {
        url += `/${query.classId}`;
      }
      if (route === '[weekId]') {
        url += `/${query.weekId}`;
      }
      if (route === '[problemId]') {
        url += `/${query.problemId}`;
      }

      return {
        name: 'Sample',
        route: url,
      };
    });

    setHistoryList(historyList_);
  }, [query, pathname]);

  const LinkList = historyList.map((history, idx) => (
    <LinkWrapper key={idx}>
      <Link href={history.route} passHref>
        <LinkButton isLast={historyList.length === idx + 1} size="ExtraSmall">
          {history.name}
        </LinkButton>
      </Link>
      <i>{historyList.length !== idx + 1 && '/'}</i>
    </LinkWrapper>
  ));

  return <Wrapper>{LinkList}</Wrapper>;
};

const Wrapper = styled.ul`
  display: flex;
  align-items: center;
`;

const LinkWrapper = styled.li`
  & > i {
    margin: 0 8px;
  }
`;

const LinkButton = styled(TextButton)<{ isLast: boolean }>`
  display: inline-block;
  ${typo.subvalue2};
  color: ${({ isLast, theme }) => (isLast ? theme.text.f1 : theme.text.f4)};
`;

type History = {
  name: string;
  route: string;
};

export default Breadcrumb;
