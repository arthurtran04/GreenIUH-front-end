import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Header.css';
import { AuthContext } from '../contexts/AuthContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-text">GreenIUH</span>
        </Link>
        <nav className="navbar">
          <NavLink 
            to="/" 
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            TRANG CHỦ
          </NavLink>
          <NavLink 
            to="/lien-he" 
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            LIÊN HỆ
          </NavLink>
          {user && (
            <>
              <NavLink 
                to="/thu-gom" 
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              >
                THU GOM
              </NavLink>
              <NavLink 
                to="/thong-tin" 
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              >
                THÔNG TIN NGƯỜI DÙNG
              </NavLink>
            </>
          )}
        </nav>
        {user ? (
          <button className="logout-button" onClick={handleLogout}>
            ĐĂNG XUẤT
          </button>
        ) : (
          <Link to="/dang-nhap" className="login-button">
            ĐĂNG NHẬP
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;

