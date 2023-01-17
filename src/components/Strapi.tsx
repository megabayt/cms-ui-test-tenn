import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown'

export const Strapi = () => {
  const params = useParams();

  const { pathname } = useLocation();

  const [response, setResponse] = useState<any>([]);

  const items = response?.data?.attributes?.regions?.data as Array<any>
    || response?.data?.attributes?.cities?.data as Array<any>
    || response?.data?.attributes?.branches?.data as Array<any>
    || response?.data as Array<any>;

  console.log(response?.data, items);

  useEffect(() => {
    if (params.branchId) {
      fetch(`https://strapi-test-tenn.onrender.com/api/branches/${params.branchId}`).then((res) => res.json()).then(setResponse);
    } else if (params.cityId) {
      fetch(`https://strapi-test-tenn.onrender.com/api/cities/${params.cityId}?populate=branches`).then((res) => res.json()).then(setResponse);
    } else if (params.regionId) {
      fetch(`https://strapi-test-tenn.onrender.com/api/regions/${params.regionId}?populate=cities`).then((res) => res.json()).then(setResponse);
    } else if (params.countryId) {
      fetch(`https://strapi-test-tenn.onrender.com/api/countries/${params.countryId}?populate=regions`).then((res) => res.json()).then(setResponse);
    } else {
      fetch('https://strapi-test-tenn.onrender.com/api/countries/').then((res) => res.json()).then(setResponse);
    }
  }, [params]);

  return (
    <>
      <h1>{response?.data?.attributes?.name ?? response?.data?.attributes?.Address ?? 'Страны'}</h1>
      <ul>
        {Array.isArray(items) && items.map((item, index) => (
          <li key={item?.id || index}>
            <Link to={`${pathname}/${item?.id}`}>
              {item?.attributes?.name ?? item?.attributes?.Address}
            </Link>
          </li>
        ))}
      </ul>
      <ReactMarkdown children={response?.data?.attributes?.HowTo} />
    </>
  )
};
