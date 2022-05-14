import { useQuery } from 'react-query';
import { useEffect } from 'react';
// api
import * as userAPIs from 'api/user';
// lib
import baseOption from 'lib/reactQueryOptions';

/**
 * User Controller
 */
const useAuth = () => {
  const { status, error, data } = useQuery(
    ['signupAPI'],
    () => userAPIs.signupAPI({ userId: 1 }),
    baseOption,
  );

  useEffect(() => {
    if (status === 'success') {
      console.log(data);
    } else {
      console.log('Wait...');
    }
  }, [status, error, data]);

  return null;
};

export default useAuth;
