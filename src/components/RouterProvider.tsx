import { FC, useMemo } from 'react';
import { createBrowserRouter, RouterProvider as RouterProviderOrig } from "react-router-dom";
import { getRoutes } from '../routes';

export const RouterProvider: FC = () => {
  const router = useMemo(() => createBrowserRouter(getRoutes()), []);

  return (
    <RouterProviderOrig router={router} />
  );
};
