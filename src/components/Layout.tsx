import { Link, Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <nav>
        <ul style={{ display: 'flex', listStyle: 'none', gap: 10 }}>
          <li>
            <Link to="/contentful">Филиалы с помощью contentful</Link>
          </li>
          {/* <li>
            <Link to="/prismic">Филиалы с помощью prismic</Link>
          </li>
          <li>
            <Link to="/strapi">Филиалы с помощью strapi</Link>
          </li> */}
        </ul>
      </nav>
      <Outlet />
    </>
  );
};
