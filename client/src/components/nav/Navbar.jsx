import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons/lib';

const Navbar = (props) => {
  const { currentUser, logOut } = props;
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: 'red' }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {currentUser && <li className="logo-user">@{currentUser.username}</li>}

            {currentUser ? (
              <a href="/" className="nav-link" onClick={logOut}>
                Logout
              </a>
            ) : (
              <div>
                <li>
                  {' '}
                  <Link to={'/auth/login'} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={'/auth/signup'} className="nav-link">
                    Sign up
                  </Link>
                </li>
              </div>
            )}

            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;
