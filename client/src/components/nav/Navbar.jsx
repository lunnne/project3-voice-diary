import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons/lib';
import { SidebarData } from './SidebarData';
import Avatar from '../Avatar';
import './Navbar.css';

const Navbar = (props) => {
  const { currentUser, logOut } = props;
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: 'red' }}>
        <div className="navbar">
          <div className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </div>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'} style={{ zIndex: '30' }}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>

            {currentUser && <Avatar name={currentUser.username} />}

            {currentUser ? (
              <a href="/" className="nav-text link" onClick={logOut}>
                Logout
              </a>
            ) : (
              <div>
                <li className="nav-link">
                  <Link to={'/auth/login'}>Login</Link>
                </li>

                <li className="nav-link">
                  <Link to={'/auth/signup'}>Sign Up</Link>
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
