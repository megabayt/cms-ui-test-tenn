import { Contentful } from "./components/Contentful";
import { Home } from "./components/Home";
import { Strapi } from "./components/Strapi";

export const getRoutes = () => [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/contentful",
    element: <Contentful />,
  },
  {
    path: "/strapi",
    element: <Strapi />,
  },
];
