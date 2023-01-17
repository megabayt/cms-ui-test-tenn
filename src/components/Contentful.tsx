import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import * as contentful from "contentful";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const client = contentful.createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE,
  accessToken: import.meta.env.VITE_CONTENTFUL_TOKEN,
});

export const Contentful = () => {
  const params = useParams();

  const { pathname } = useLocation();

  const [response, setResponse] = useState<any>([]);

  const items = response?.items as Array<any>
    || response?.fields?.regions as Array<any>
    || response?.fields?.cities as Array<any>
    || response?.fields?.branches as Array<any>
    || [];

  useEffect(() => {
    if (params.branchId) {
      client.getEntry(params.branchId).then(setResponse);
    } else if (params.cityId) {
      client.getEntry(params.cityId).then(setResponse);
    } else if (params.regionId) {
      client.getEntry(params.regionId).then(setResponse);
    } else if (params.countryId) {
      client.getEntry(params.countryId).then(setResponse);
    } else {
      client.getEntries({ content_type: 'country' }).then(setResponse);
    }
  }, [params]);

  return (
    <>
      <h1>{response?.fields?.name ?? response?.fields?.address ?? 'Страны'}</h1>
      <ul>
        {items.map((item, index) => (
          <li key={item?.sys?.id || index}>
            <Link to={`${pathname}/${item?.sys?.id}`}>
              {item?.fields?.name ?? item?.fields?.address}
            </Link>
          </li>
        ))}
      </ul>
      {documentToReactComponents(response?.fields?.howTo)}
    </>
  )
};
