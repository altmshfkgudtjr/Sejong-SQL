import { QueryClient, QueryClientProvider } from 'react-query';

/**
 * React-Query 객체 옵션
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 5,
      staleTime: 1000 * 30,
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,

      retry: 2,
    },
  },
});

/**
 * React-Query Component Provider
 */
const QueryProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      {children}
    </QueryClientProvider>
  );
};

export default QueryProvider;
