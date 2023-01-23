import React from 'react';
import { Layout as LayoutAntd, Row, Col, Card, Typography } from 'antd';

const { Header, Footer, Sider, Content } = LayoutAntd;
const { Title, Text, Link } = Typography;

const headerStyle: React.CSSProperties = {
  textAlign: 'left',
  color: '#000',
  height: 64,
  paddingLeft: 24,
  lineHeight: '64px',
  background: '#fff',
  border: '1px solid #000',
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  color: '#000',
  background: '#fff',
  border: '1px solid #000',
  padding: 24,
  maxWidth: 860,
};

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#000',
  background: '#fff',
  border: '1px solid #000',
};

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#000',
  background: '#fff',
  border: '1px solid #000',
};

export const Layout = ({
  banners,
  championships,
  matchOfTheDay,
  restContent,
  lang,
  onChangeLang,
} : {
  banners?: {
    image: string;
    link: string;
  }[];
  championships?: {
    id: number;
    name: string;
  }[];
  matchOfTheDay?: {
    competitors: string;
    time: string;
    link: string;
  };
  restContent?: string;
  lang: string;
  onChangeLang: (newLang: 'ru' | 'en') => void;
}) => {
  const toggleLang = () => {
    if (!lang || lang === 'ru') {
      onChangeLang('en');
    } else {
      onChangeLang('ru');
    }
  }

  return (
    <LayoutAntd>
      <Header style={headerStyle}>
        <Row justify="space-between">
          <Col span={1}>
            <Text>
              {lang === 'ru' ? 'Лого' : 'Logo'}
            </Text>
          </Col>
          <Col span={2} onClick={toggleLang}>
            <Link>
              {lang || "ru"}
            </Link>
          </Col>
        </Row>
      </Header>
      <LayoutAntd style={{ justifyContent: 'center' }}>
        <Content style={contentStyle}>
          {banners && (
            <Row gutter={14}>
              <Col span={12}>
                {banners[0] && <Link href={banners[0].link} target="_blank">
                  <Card bodyStyle={{ borderRadius: 8, padding: 0, overflow: 'hidden', height: 154, background: `url(${banners[0].image}) no-repeat center center`, backgroundSize: 'cover' }}>
                  </Card>
                </Link>}
              </Col>
              <Col span={12}>
                {banners[1] && <Link href={banners[1].link} target="_blank">
                  <Card bodyStyle={{ borderRadius: 8, padding: 0, overflow: 'hidden', height: 154, background: `url(${banners[1].image}) no-repeat center center`, backgroundSize: 'cover' }}>
                  </Card>
                </Link>}
              </Col>
            </Row>
          )}
          {matchOfTheDay ? (
            <Row>
              <Col span={24} style={{ textAlign: "left" }}>
                <Link href={matchOfTheDay.link} target="_blank">
                  <Title level={3}>{lang === 'ru' ? 'Матч дня' : 'Match of the day'}</Title>
                  <Text>{matchOfTheDay.competitors}</Text><br/>
                  <Text>{matchOfTheDay.time}</Text>
                </Link>
              </Col>
            </Row>
          ) : null}
          <Row>
            <Col span={24} style={{ textAlign: "left" }}>
              <Title level={3}>
                {lang === 'ru' ? 'Остальной контент' : 'Other content'}
              </Title>
              <div dangerouslySetInnerHTML={{ __html: restContent ?? '' }} />
            </Col>
          </Row>
        </Content>
        <Sider style={siderStyle}>
          {championships?.map(((item) => (
            <div key={item.id}>
              <Text>{item.name}</Text>
            </div>
          )))}
        </Sider>
      </LayoutAntd>
    </LayoutAntd>
  );
};
