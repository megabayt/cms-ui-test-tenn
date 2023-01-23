import { Typography } from 'antd';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <>
      <Link to="/contentful">
        <Typography.Link>Contentful</Typography.Link>
      </Link><br />
      <Link to="/strapi">
        <Typography.Link>Strapi</Typography.Link>
      </Link>
    </>
  );
}
