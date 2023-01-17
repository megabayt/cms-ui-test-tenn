import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { Contentful } from "./components/Contentful";
import { Prismic } from "./components/Prismic";
import { Strapi } from "./components/Strapi";

export const getRoutes = () => [
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contentful",
        element: <Contentful />,
      },
      {
        path: "/contentful/:countryId",
        element: <Contentful />,
      },
      {
        path: "/contentful/:countryId/:regionId",
        element: <Contentful />,
      },
      {
        path: "/contentful/:countryId/:regionId/:cityId",
        element: <Contentful />,
      },
      {
        path: "/contentful/:countryId/:regionId/:cityId/:branchId",
        element: <Contentful />,
      },
      {
        path: "/prismic",
        element: <Prismic />,
      },
      {
        path: "/strapi",
        element: <Strapi />,
      },
    ],
  },
];
