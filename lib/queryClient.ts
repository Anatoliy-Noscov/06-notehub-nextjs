import { QueryClient, QueryKey } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const prefetchQuery = async <T>(
  key: QueryKey,
  fn: () => Promise<T>,
): Promise<QueryClient> => {
  await queryClient.prefetchQuery({ queryKey: key, queryFn: fn });
  return queryClient;
};
