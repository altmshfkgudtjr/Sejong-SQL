// components
import Layout from 'components/layouts';
import { MainLayout } from 'sjds/layouts';

/** 홈 페이지 */
const HomePage = () => {
  return (
    <>
      <MainLayout as="section">
      </MainLayout>
      <div style={{ height: '200px' }} />
    </>
  );
};

HomePage.getLayout = page => {
  return <Layout>{page}</Layout>;
};

export default HomePage;
