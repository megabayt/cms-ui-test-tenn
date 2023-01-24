import { Spin, Row, Col } from 'antd';
import { Layout } from './Layout';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import * as contentful from "contentful";
import { useMemo } from 'react';

export const Contentful = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const lang = searchParams.get('lang');
  const preview = searchParams.get('preview');
  
  const client = useMemo(() => {
    return contentful.createClient({
      space: import.meta.env.VITE_CONTENTFUL_SPACE,
      accessToken: !preview ? import.meta.env.VITE_CONTENTFUL_DELIVERY_TOKEN : import.meta.env.VITE_CONTENTFUL_PREVIEW_TOKEN,
      host: !preview ? 'cdn.contentful.com' : 'preview.contentful.com',
    });
  }, [preview]);

  const { data, isLoading, isError } = useQuery(['strapi-data', lang], () => getData(client, lang ?? 'ru'));

  if (isError || !data) {
    return (
      <Row align="middle" justify="center" style={{ height: '100vh' }}>
        <Col span={1}>
          Произошла ошибка
        </Col>
      </Row>
    );
  }

  if (isLoading) {
    return (
      <Row align="middle" justify="center" style={{ height: '100vh' }}>
        <Col span={1}>
          <Spin size='large' />
        </Col>
      </Row>
    );
  }

  return (
    <Layout {...data} lang={lang || 'ru'} onChangeLang={(lang) => setSearchParams(prev => ({ ...prev, lang }))} />
  );
}

const getData = async (client: contentful.ContentfulClientApi, lang: string) => {
  const data = await Promise.all([
    client.getEntries({ content_type: 'banner', locale: lang }),
    client.getEntries({ content_type: 'championships', locale: lang }),
    client.getEntries({ content_type: 'match-of-the-day', locale: lang }),
    client.getEntries({ content_type: 'other-content', locale: lang }),
  ]);

  return {
    banners: data[0]
      ?.items
      ?.sort((a: any, b: any) => b.fields.Weight - a.fields.Weight)
      .slice(0, 2)
      .map((item: any) => ({
        link: item.fields.link,
        image: item.fields.image.fields.file.url
      })),
    championships: data[1]?.items?.map((item: any) => ({ id: item.sys.id, name: item.fields.name })),
    matchOfTheDay: {
      competitors: (data[2]?.items[0].fields as any)?.competitors,
      time: (data[2]?.items[0].fields as any)?.time,
      link: (data[2]?.items[0].fields as any)?.link,
    },
    restContent: (data[3]?.items[0].fields as any)?.text,
  }
};
