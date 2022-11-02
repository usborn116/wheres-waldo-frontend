
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='SiteHeader'>
      <Link to='/'>
        <h1>WHERE'S <span>WALDO?</span></h1>
      </Link>
    </header>
  );
};

export default Header;