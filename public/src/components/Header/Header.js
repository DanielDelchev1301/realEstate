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
                <Link to="/" className="link">Начало</Link>
                <Link to="/sales" className="link">Продажби</Link>
                <Link to="/rentals" className="link">Под Наем</Link>
                <Link to="/favourites" className="link">Любими</Link>
                <Link to="/freeEvaluation" className="link">Безплатна Оценка</Link>
                <Link to="/reachUs" className="link">Контакти</Link>
                {isAdmin && <Link to="/admin" className="link">Админ Панел</Link>}
            </div>
            <Link to="/admin">
                <img src="images/logo1.png" alt="Лого" className="navBarLogo" />
            </Link>
        </div>
    );
}

export default Header;