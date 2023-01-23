import { Spin, Row, Col } from 'antd';
import { Layout } from './Layout';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

export const Strapi = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const lang = searchParams.get('lang');

  const { data, isLoading, isError } = useQuery(['strapi-data', lang], () => getData(lang ?? 'ru'));

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
    <Layout {...data} lang={lang || 'ru'} onChangeLang={(lang) => setSearchParams({ lang })} />
  );
}

const getData = async (lang: string) => {
  const data = await Promise.all([
    axios.get(`https://strapi-test-tenn.onrender.com/api/banners?populate=Image&locale=${lang}`),
    axios.get(`https://strapi-test-tenn.onrender.com/api/championships?locale=${lang}`),
    axios.get(`https://strapi-test-tenn.onrender.com/api/match-of-the-day?locale=${lang}`),
    axios.get(`https://strapi-test-tenn.onrender.com/api/ostalnoj-kontent?locale=${lang}`),
  ]);

  return {
    banners: data[0]
      ?.data
      ?.data
      ?.sort((a: any, b: any) => b.attributes.Weight - a.attributes.Weight)
      .slice(0, 2)
      .map((item: any) => ({
        link: item.attributes.Link,
        image: `https://strapi-test-tenn.onrender.com${item.attributes.Image.data.attributes.url}`
      })),
    championships: data[1]?.data?.data?.map((item: any) => ({ id: item.id, name: item.attributes.name })),
    matchOfTheDay: {
      competitors: data[2]?.data?.data?.attributes?.competitors,
      time: data[2]?.data?.data?.attributes?.time,
      link: data[2]?.data?.data?.attributes?.link,
    },
    restContent: data[3]?.data?.data?.attributes?.text.replace(/\/uploads/g, 'https://strapi-test-tenn.onrender.com/uploads'),
  }
};
