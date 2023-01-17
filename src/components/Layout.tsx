import { Link, Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <nav>
        <ul style={{  }}>
          <li>
            <Link to="/">Главная</Link>
          </li>
          <li>
            <Link to="/contentful">Филиалы с помощью contentful</Link>
          </li>
          {/* <li>
            <Link to="/prismic">Филиалы с помощью prismic</Link>
          </li> */}
          <li>
            <Link to="/strapi">Филиалы с помощью strapi</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};
