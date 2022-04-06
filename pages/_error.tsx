const ErrorPage = ({ statusCode, errorMessage }) => {
  return (
    <>
      <h1>{statusCode}: Error</h1>
      <h2>{errorMessage}</h2>
    </>
  );
};

export async function getServerSideProps({ res, err }) {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return {
    props: {
      statusCode,
      errorMessage: `${err}`,
    },
  };
}

export default ErrorPage;
