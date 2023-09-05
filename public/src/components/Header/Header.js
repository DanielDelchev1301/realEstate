import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import './Header.css';
import { useState } from 'react';

function Header() {
    const [showMenu, setShowMenu] = useState(false);

    const isAdmin = JSON.parse(window.localStorage.getItem('user'))?.admin;

    return (
        <div className="headerContainer">
            <button className="navBarMenuButton" onClick={() => setShowMenu(!showMenu)} onMouseEnter={() => setShowMenu(true)}>
                <MenuIcon className="menuIcon"/>
            </button>
            <div className={`menuOptions ${showMenu ? 'visible' : ''}`}  onClick={() => setShowMenu(false)} onMouseLeave={() => setShowMenu(false)}>
                <Link to="/" className="link">Home</Link>
                <Link to="/sales" className="link">Sales</Link>
                <Link to="/rentals" className="link">Rentals</Link>
                <Link to="/favourites" className="link">Favourites</Link>
                <Link to="/reachUs" className="link">Reach Us</Link>
                {isAdmin && <Link to="/admin" className="link">Admin Panel</Link>}
            </div>
            <Link to="/admin">
                <img src="images/logo1.png" alt="" className="navBarLogo" />
            </Link>
        </div>
    );
}

export default Header;