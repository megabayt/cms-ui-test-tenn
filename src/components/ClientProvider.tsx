import { FC, PropsWithChildren, useMemo } from 'react';
import { QueryClient, QueryClientProvider as QueryClientProviderOrig } from "react-query";

export const QueryClientProvider: FC<PropsWithChildren> = ({ children }) => {
  const client = useMemo(() => new QueryClient(), []);

  return (
    <QueryClientProviderOrig client={client}>
      {children}
    </QueryClientProviderOrig>
  );
};
